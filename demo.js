/**
 * demo.js - Generates high-fidelity mock data if database is empty
 */

// Helper to draw beautiful abstract silhouettes and return a Base64 data URL
function createMockImage(theme, iconSymbol) {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // Draw vibrant gradient background
  const grad = ctx.createLinearGradient(0, 0, 400, 400);
  if (theme === 'gym') {
    grad.addColorStop(0, '#10b981'); // Emerald
    grad.addColorStop(1, '#059669');
  } else if (theme === 'skincare') {
    grad.addColorStop(0, '#f43f5e'); // Rose
    grad.addColorStop(1, '#be123c');
  } else {
    grad.addColorStop(0, '#6366f1'); // Indigo
    grad.addColorStop(1, '#4f46e5');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 400, 400);

  // Draw modern decorative neon glassmorphic rings
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(200, 200, 140, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(200, 200, 100, 0, Math.PI * 2);
  ctx.stroke();

  // Draw glowing center aura
  const radial = ctx.createRadialGradient(200, 200, 10, 200, 200, 80);
  radial.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
  radial.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = radial;
  ctx.beginPath();
  ctx.arc(200, 200, 80, 0, Math.PI * 2);
  ctx.fill();

  // Add Emoji / Icon Symbol in center
  ctx.fillStyle = '#ffffff';
  ctx.font = '72px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 12;
  ctx.fillText(iconSymbol, 200, 200);

  // Draw overlay badge
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText('DnD Progress Photo', 200, 320);

  return canvas.toDataURL('image/png');
}

export async function setupDemoDataIfEmpty(db) {
  const habits = await db.getHabits(true);
  if (habits.length > 0) {
    // Already populated, skip
    return;
  }

  // --- 1. Set Level & XP ---
  await db.setSetting('user_xp', 850);
  await db.setSetting('user_level', 4);
  await db.setSetting('theme', 'dark');
  await db.setSetting('sound_muted', false);
  await db.setSetting('language', 'en');

  // --- 2. Add Standard Habits ---
  const habitData = [
    {
      name: 'DSA Coding Practice',
      desc: 'Solve 2 problems on LeetCode and master key algorithms',
      category: 'Productivity',
      color: 'var(--color-indigo)',
      emoji: '💻',
      frequency: { type: 'daily' },
      subTasks: [
        { id: 1, text: 'LeetCode Easy / Warmup', checked: true },
        { id: 2, text: 'LeetCode Medium / Hard', checked: true },
        { id: 3, text: 'Review patterns (sliding window, DP)', checked: true }
      ],
      createdTime: Date.now() - 40 * 24 * 60 * 60 * 1000 // 40 days ago
    },
    {
      name: 'Gym Workout',
      desc: 'Push, Pull, Legs strength routine',
      category: 'Fitness',
      color: 'var(--color-emerald)',
      emoji: '🏋️‍♂️',
      frequency: { type: 'weekly', days: [1, 3, 5] }, // Mon, Wed, Fri
      subTasks: [
        { id: 1, text: 'Warm up (10 min stretch)', checked: true },
        { id: 2, text: 'Main heavy lifts (5 sets)', checked: true },
        { id: 3, text: 'Cardio / core (15 min)', checked: true }
      ],
      createdTime: Date.now() - 40 * 24 * 60 * 60 * 1000
    },
    {
      name: 'Skincare Routine',
      desc: 'Morning wash + sunscreen. Evening cleanser + retinol.',
      category: 'Self-care',
      color: 'var(--color-rose)',
      emoji: '✨',
      frequency: { type: 'daily' },
      subTasks: [
        { id: 1, text: 'Morning Cleanse & UV screen', checked: true },
        { id: 2, text: 'Hydration (Hyaluronic acid)', checked: true },
        { id: 3, text: 'Night Retinol & moisturizer', checked: true }
      ],
      createdTime: Date.now() - 40 * 24 * 60 * 60 * 1000
    },
    {
      name: 'Mindful Meditation',
      desc: 'Box breathing and awareness focus',
      category: 'Health',
      color: 'var(--color-violet)',
      emoji: '🧘‍♂️',
      frequency: { type: 'daily' },
      subTasks: [
        { id: 1, text: '10 mins focused breathing', checked: true },
        { id: 2, text: 'Write down 3 things grateful for', checked: true }
      ],
      createdTime: Date.now() - 40 * 24 * 60 * 60 * 1000
    }
  ];

  const addedHabits = [];
  for (const h of habitData) {
    const newHabit = await db.addHabit(h);
    addedHabits.push(newHabit);
  }

  // --- 3. Add Back-dated Completion History ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate Base64 photo attachments programmatically
  const codingImg = createMockImage('indigo', '💻');
  const gymImg = createMockImage('emerald', '💪');
  const skinImg = createMockImage('rose', '🧴');

  // Let's create an array of completions over the last 40 days
  // We'll leave minor gaps to make consistency charts natural & satisfying
  for (let offset = 40; offset >= 0; offset--) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - offset);
    const dateStr = checkDate.toISOString().split('T')[0];
    const dayOfWeek = checkDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

    // Habit 1: DSA Practice (Daily, Mon-Sat)
    // Completed 85% of time. Gap on some Sundays.
    if (dayOfWeek !== 0 || offset % 3 === 0) {
      const dsaSkip = offset === 14 || offset === 28; // minor gaps
      if (!dsaSkip) {
        let note = '';
        let photo = null;

        if (offset === 35) {
          note = 'Completed 5 binary tree problems! Finally understood tree traversals perfectly.';
        } else if (offset === 25) {
          note = 'Implemented a full Dijkstra algorithm from scratch. Feeling great!';
          photo = codingImg;
        } else if (offset === 10) {
          note = 'Started LeetCode dynamic programming section. Hard but rewarding.';
        } else if (offset === 2) {
          note = 'Solved two medium sliding window array problems. Streaks rising!';
        }

        await db.toggleCompletion(addedHabits[0].id, dateStr, [1, 2, 3], note, photo);
      }
    }

    // Habit 2: Gym Workout (Mon, Wed, Fri only)
    if ([1, 3, 5].includes(dayOfWeek)) {
      const gymSkip = offset === 21; // one skip to break streak historically
      if (!gymSkip) {
        let note = '';
        let photo = null;

        if (offset === 38) {
          note = 'Lifting heavy! Hit a new PR on Squats: 100kg!';
          photo = gymImg;
        } else if (offset === 24) {
          note = 'Push day! Bench press feeling super light today.';
        } else if (offset === 12) {
          note = 'Weekly physique check-in: Feeling leaner, shoulder definition coming in.';
          photo = gymImg;
        } else if (offset === 3) {
          note = 'Leg day crushed! Finished with a solid 15 min core burner.';
        }

        await db.toggleCompletion(addedHabits[1].id, dateStr, [1, 2, 3], note, photo);
      }
    }

    // Habit 3: Skincare Routine (Daily)
    // Almost 95% complete
    const skinSkip = offset === 31 || offset === 19;
    if (!skinSkip) {
      let note = '';
      let photo = null;

      if (offset === 39) {
        note = 'Day 1: Starting skincare journey. Acne is visible but skin feels hydrated.';
        photo = skinImg;
      } else if (offset === 26) {
        note = 'Day 14 Skincare update: Acne reducing noticeably. Using retinol every alternate night.';
        photo = skinImg;
      } else if (offset === 5) {
        note = 'Day 35 Glow check: Skin is much clearer and even-toned. Retinol working wonders.';
        photo = skinImg;
      }

      await db.toggleCompletion(addedHabits[2].id, dateStr, [1, 2, 3], note, photo);
    }

    // Habit 4: Meditation (Daily)
    // 70% complete (some weekend gaps)
    const medSkip = dayOfWeek === 6 || dayOfWeek === 0 ? offset % 2 === 0 : offset % 5 === 0;
    if (!medSkip) {
      let note = '';
      if (offset === 30) note = 'Box breathing felt extremely calming today. Cleared my brain fog.';
      if (offset === 15) note = 'Very busy day but took 10 mins at night. Grounded me instantly.';
      if (offset === 1) note = 'Meditation completed before work. Kept me calm during client presentations.';

      await db.toggleCompletion(addedHabits[3].id, dateStr, [1, 2], note, null);
    }
  }

  // Pre-load some unlocked achievements in active settings
  const achievements = [
    { id: 'first_habit', title: 'First Steps', desc: 'Create your first habit', unlocked: true, icon: '🚀' },
    { id: 'streak_7', title: 'Unstoppable Consistency', desc: 'Achieve a 7-day streak', unlocked: true, icon: '🔥' },
    { id: 'journal_5', title: 'Memory Collector', desc: 'Log 5 progress photos/notes', unlocked: true, icon: '📸' }
  ];
  await db.setSetting('unlocked_achievements', achievements);
}

export async function injectAdditionalRandomHabits(db) {
  const isDone = await db.getSetting('extra_habits_inserted', false);
  if (isDone) return;

  const extraHabits = [
    {
      name: 'Master Chess Openings',
      desc: 'Study and practice one new chess line or tactic',
      category: 'Study',
      color: 'var(--color-orange)',
      emoji: '👑',
      frequency: { type: 'daily' },
      subTasks: [
        { id: 1, text: 'Solve 5 tactical chess puzzles', checked: false },
        { id: 2, text: 'Review Sicilian Defense / Queen\'s Gambit lines', checked: false }
      ],
      createdTime: Date.now() - 5 * 24 * 60 * 60 * 1000
    },
    {
      name: 'Hydration Protocol',
      desc: 'Track daily water intake to stay perfectly energized',
      category: 'Health',
      color: 'var(--color-sky)',
      emoji: '💧',
      frequency: { type: 'daily' },
      subTasks: [
        { id: 1, text: 'Drink 1L before noon', checked: false },
        { id: 2, text: 'Drink 1L before 5 PM', checked: false },
        { id: 3, text: 'Drink 1L before bedtime', checked: false }
      ],
      createdTime: Date.now() - 5 * 24 * 60 * 60 * 1000
    },
    {
      name: 'Budget Tracking',
      desc: 'Log spends daily and avoid impulse buying',
      category: 'Finance',
      color: 'var(--color-amber)',
      emoji: '💰',
      frequency: { type: 'daily' },
      subTasks: [
        { id: 1, text: 'Log all shopping/dining purchases', checked: false },
        { id: 2, text: 'Check against monthly spending targets', checked: false }
      ],
      createdTime: Date.now() - 5 * 24 * 60 * 60 * 1000
    }
  ];

  for (const h of extraHabits) {
    await db.addHabit(h);
  }

  await db.setSetting('extra_habits_inserted', true);
  console.log('Successfully injected additional random habits!');
}
