/**
 * db.js - Local IndexedDB database manager for DnD
 */

const DB_NAME = 'DnDDB';
const DB_VERSION = 2;

export class TickOffDB {
  constructor() {
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store 1: habits
        // Key: id (autoIncrement or UUID)
        if (!db.objectStoreNames.contains('habits')) {
          db.createObjectStore('habits', { keyPath: 'id', autoIncrement: true });
        }

        // Store 2: completions
        // Key: habitId_dateString (e.g. "1_2026-05-28")
        if (!db.objectStoreNames.contains('completions')) {
          const completionStore = db.createObjectStore('completions', { keyPath: 'id' });
          completionStore.createIndex('habitId', 'habitId', { unique: false });
          completionStore.createIndex('date', 'date', { unique: false });
        }

        // Store 3: settings (key-value store for app state)
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }

        // Store 4: notes (Notion-style rich notes)
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this);
      };

      request.onerror = (event) => {
        reject(`Database open failed: ${event.target.error}`);
      };
    });
  }

  // --- CRUD for Settings ---
  getSetting(key, defaultValue = null) {
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['settings'], 'readonly');
      const store = transaction.objectStore('settings');
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result ? request.result.value : defaultValue);
      };
      request.onerror = () => {
        resolve(defaultValue);
      };
    });
  }

  setSetting(key, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['settings'], 'readwrite');
      const store = transaction.objectStore('settings');
      const request = store.put({ key, value });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // --- CRUD for Habits ---
  addHabit(habit) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['habits'], 'readwrite');
      const store = transaction.objectStore('habits');
      
      const newHabit = {
        name: habit.name || 'New Habit',
        desc: habit.desc || '',
        category: habit.category || 'Productivity',
        color: habit.color || 'var(--color-indigo)',
        emoji: habit.emoji || '✨',
        frequency: habit.frequency || { type: 'daily' }, // e.g. {type: 'daily'}, {type: 'weekly', days: [1,3,5]}, {type: 'monthly', count: 3}
        subTasks: habit.subTasks || [], // e.g. [{id: 1, text: "subtask", checked: false}]
        isArchived: habit.isArchived || false,
        isDeleted: habit.isDeleted || false,
        isHidden: habit.isHidden || false,
        createdTime: habit.createdTime || Date.now(),
        weight: habit.weight || 1.0
      };

      const request = store.add(newHabit);
      request.onsuccess = (event) => {
        newHabit.id = event.target.result;
        resolve(newHabit);
      };
      request.onerror = () => reject(request.error);
    });
  }

  updateHabit(habit) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['habits'], 'readwrite');
      const store = transaction.objectStore('habits');
      const request = store.put(habit);

      request.onsuccess = () => resolve(habit);
      request.onerror = () => reject(request.error);
    });
  }

  deleteHabit(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['habits', 'completions'], 'readwrite');
      const habitStore = transaction.objectStore('habits');
      const completionStore = transaction.objectStore('completions');

      // Delete habit
      const deleteRequest = habitStore.delete(id);
      
      deleteRequest.onsuccess = () => {
        // Also delete associated completions
        const index = completionStore.index('habitId');
        const range = IDBKeyRange.only(id);
        const cursorRequest = index.openCursor(range);

        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          } else {
            resolve();
          }
        };
      };

      deleteRequest.onerror = () => reject(deleteRequest.error);
    });
  }

  getHabits(includeArchived = false) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['habits'], 'readonly');
      const store = transaction.objectStore('habits');
      const request = store.getAll();

      request.onsuccess = () => {
        let list = request.result || [];
        if (!includeArchived) {
          list = list.filter(h => !h.isArchived);
        }
        resolve(list);
      };
      request.onerror = () => reject(request.error);
    });
  }

  getHabit(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['habits'], 'readonly');
      const store = transaction.objectStore('habits');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // --- CRUD for Completions & Journals ---
  toggleCompletion(habitId, dateStr, subTasksChecked = null, journalNote = null, journalPhoto = null) {
    return new Promise((resolve, reject) => {
      const key = `${habitId}_${dateStr}`;
      const transaction = this.db.transaction(['completions'], 'readwrite');
      const store = transaction.objectStore('completions');
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        let entry = getRequest.result;
        if (entry) {
          // Entry exists, update it or remove if toggled off
          if (subTasksChecked !== null) {
            entry.subTasksChecked = subTasksChecked;
          }
          if (journalNote !== null) {
            entry.journalNote = journalNote;
          }
          if (journalPhoto !== null) {
            entry.journalPhoto = journalPhoto;
          }
          
          // Toggle base completion state if no specific subtasks or notes are explicitly passed
          if (subTasksChecked === null && journalNote === null && journalPhoto === null) {
            entry.completed = !entry.completed;
          } else {
            // If checklist or journal notes are added/updated, ensure active
            entry.completed = true;
          }

          if (entry.completed && entry.completionHour === undefined) {
            entry.completionHour = new Date().getHours();
          }

          // If no longer checked and no journal remains, delete
          if (!entry.completed && (!entry.journalNote || entry.journalNote.trim() === '') && !entry.journalPhoto) {
            const delRequest = store.delete(key);
            delRequest.onsuccess = () => resolve({ completed: false, entry: null });
            delRequest.onerror = () => reject(delRequest.error);
          } else {
            const putRequest = store.put(entry);
            putRequest.onsuccess = () => resolve({ completed: entry.completed, entry });
            putRequest.onerror = () => reject(putRequest.error);
          }
        } else {
          // New entry
          const newEntry = {
            id: key,
            habitId: parseInt(habitId),
            date: dateStr,
            completed: true,
            subTasksChecked: subTasksChecked || [],
            journalNote: journalNote || '',
            journalPhoto: journalPhoto || null,
            completionHour: new Date().getHours()
          };
          const putRequest = store.put(newEntry);
          putRequest.onsuccess = () => resolve({ completed: true, entry: newEntry });
          putRequest.onerror = () => reject(putRequest.error);
        }
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  getCompletionsForHabit(habitId) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['completions'], 'readonly');
      const store = transaction.objectStore('completions');
      const index = store.index('habitId');
      const range = IDBKeyRange.only(parseInt(habitId));
      const request = index.getAll(range);

      request.onsuccess = () => {
        resolve(request.result || []);
      };
      request.onerror = () => reject(request.error);
    });
  }

  getAllCompletions() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['completions'], 'readonly');
      const store = transaction.objectStore('completions');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };
      request.onerror = () => reject(request.error);
    });
  }

  // --- Analytical Calculations ---

  /**
   * Calculate streaks (Current streak, Longest streak, and Completion dates list)
   */
  async getStreakStats(habitId, completions = null) {
    if (!completions) {
      completions = await this.getCompletionsForHabit(habitId);
    }
    
    // Filter only completed ones and sort chronologically
    const completedDates = completions
      .filter(c => c.completed)
      .map(c => c.date)
      .sort((a, b) => new Date(a) - new Date(b));
    
    if (completedDates.length === 0) {
      return { currentStreak: 0, longestStreak: 0, lastCompleted: null };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate streaks using UTC midnight differences
    for (let i = 0; i < completedDates.length; i++) {
      const curr = new Date(completedDates[i]);
      curr.setHours(0,0,0,0);

      if (lastDate === null) {
        tempStreak = 1;
      } else {
        const utc1 = Date.UTC(curr.getFullYear(), curr.getMonth(), curr.getDate());
        const utc2 = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
        const diffDays = Math.round(Math.abs(utc1 - utc2) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          tempStreak = 1; // broken, restart
        }
      }
      lastDate = curr;
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    // Check if the current streak is still active (must be completed today or yesterday)
    const lastCompletedDate = new Date(completedDates[completedDates.length - 1]);
    lastCompletedDate.setHours(0,0,0,0);
    
    const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utcLast = Date.UTC(lastCompletedDate.getFullYear(), lastCompletedDate.getMonth(), lastCompletedDate.getDate());
    const diffToToday = Math.round(Math.abs(utcToday - utcLast) / (1000 * 60 * 60 * 24));
    
    if (diffToToday <= 1) {
      currentStreak = tempStreak;
    } else {
      currentStreak = 0; // streak broken as of today
    }

    return {
      currentStreak,
      longestStreak,
      lastCompleted: completedDates[completedDates.length - 1]
    };
  }

  /**
   * Smart consistency score (weighted exponential moving average)
   * Prevents instant score drop for minor breaks, rewards consistency.
   */
  async getHabitScore(habitId, creationTime) {
    const completions = await this.getCompletionsForHabit(habitId);
    const completedSet = new Set(completions.filter(c => c.completed).map(c => c.date));
    
    const start = new Date(creationTime);
    start.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);

    let score = 0.0;
    const days = [];
    
    // Collect all days from start to today
    let curr = new Date(start);
    while (curr <= today) {
      const dateStr = curr.toISOString().split('T')[0];
      days.push(dateStr);
      curr.setDate(curr.getDate() + 1);
    }

    // Exponential moving average:
    // Completed day: score = score + (100 - score) * 0.1
    // Missed day: score = score - score * 0.12 (reduces slightly faster than builds)
    for (const d of days) {
      const completed = completedSet.has(d);
      if (completed) {
        score += (100 - score) * 0.12;
      } else {
        score -= score * 0.15;
      }
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // --- CRUD for Notes (Notion-Style) ---
  getNotes(includeDeleted = false) {
    return new Promise((resolve, reject) => {
      if (!this.db.objectStoreNames.contains('notes')) {
        resolve([]);
        return;
      }
      const transaction = this.db.transaction(['notes'], 'readonly');
      const store = transaction.objectStore('notes');
      const request = store.getAll();

      request.onsuccess = () => {
        let results = request.result || [];
        if (!includeDeleted) {
          results = results.filter(n => !n.isDeleted);
        }
        // Sort by updated time descending
        results.sort((a, b) => b.updatedTime - a.updatedTime);
        resolve(results);
      };
      request.onerror = () => resolve([]);
    });
  }

  addNote(note) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['notes'], 'readwrite');
      const store = transaction.objectStore('notes');
      const newNote = {
        title: note.title || 'Untitled Page',
        emoji: note.emoji || '📄',
        category: note.category || 'General',
        categoryId: note.categoryId || 'general',
        subcategoryId: note.subcategoryId || 'notes',
        subheading: note.subheading || '',
        desc: note.desc || '',
        content: note.content || '',
        coverGradient: note.coverGradient || '',
        createdTime: Date.now(),
        updatedTime: Date.now(),
        isDeleted: false,
        isFavorite: false,
        isArchived: false,
        isHidden: false
      };
      const request = store.add(newNote);
      request.onsuccess = (event) => {
        newNote.id = event.target.result;
        resolve(newNote);
      };
      request.onerror = () => reject(request.error);
    });
  }

  updateNote(note) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['notes'], 'readwrite');
      const store = transaction.objectStore('notes');
      note.updatedTime = Date.now();
      const request = store.put(note);
      request.onsuccess = () => resolve(note);
      request.onerror = () => reject(request.error);
    });
  }

  deleteNote(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['notes'], 'readwrite');
      const store = transaction.objectStore('notes');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // --- Export and Import functions for Backup ---
  async exportData() {
    const habits = await this.getHabits(true); // Include archived
    const completions = await this.getAllCompletions();
    const notes = await this.getNotes(true); // Include soft-deleted notes in backup
    
    const xp = await this.getSetting('user_xp', 0);
    const level = await this.getSetting('user_level', 1);
    const theme = await this.getSetting('theme', 'dark');
    const soundMuted = await this.getSetting('sound_muted', false);
    const language = await this.getSetting('language', 'en');

    return JSON.stringify({
      version: DB_VERSION,
      timestamp: Date.now(),
      habits,
      completions,
      notes,
      settings: { xp, level, theme, soundMuted, language }
    }, null, 2);
  }

  async importData(jsonString) {
    const backup = JSON.parse(jsonString);
    if (!backup.habits || !backup.completions) {
      throw new Error('Invalid backup file structure.');
    }

    const stores = ['habits', 'completions', 'settings'];
    const hasNotesStore = this.db.objectStoreNames.contains('notes');
    if (hasNotesStore) {
      stores.push('notes');
    }

    // Transaction across all stores
    const transaction = this.db.transaction(stores, 'readwrite');
    
    const habitStore = transaction.objectStore('habits');
    const completionStore = transaction.objectStore('completions');
    const settingsStore = transaction.objectStore('settings');

    // Clear existing
    habitStore.clear();
    completionStore.clear();
    settingsStore.clear();

    if (hasNotesStore) {
      const notesStore = transaction.objectStore('notes');
      notesStore.clear();
    }

    // Re-populate habits
    for (const habit of backup.habits) {
      habitStore.put(habit);
    }

    // Re-populate completions
    for (const completion of backup.completions) {
      completionStore.put(completion);
    }

    // Re-populate notes if available in backup
    if (hasNotesStore && backup.notes) {
      const notesStore = transaction.objectStore('notes');
      for (const note of backup.notes) {
        notesStore.put(note);
      }
    }

    // Re-populate settings
    if (backup.settings) {
      for (const [key, value] of Object.entries(backup.settings)) {
        settingsStore.put({ key, value });
      }
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}
