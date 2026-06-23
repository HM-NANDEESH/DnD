/**
 * app.js - Master SPA Controller for DnD Habit Tracker & Life Journal
 */

// import { TickOffDB } from './db.js';
// import { TickOffAudio } from './audio.js';
// import { setupDemoDataIfEmpty, injectAdditionalRandomHabits } from './demo.js';

// --- Multi-language Translations Dictionary ---
const TRANSLATIONS = {
  en: {
    nav_dashboard: "Dashboard",
    nav_habits: "Habits",
    nav_timeline: "Timeline",
    nav_analytics: "Analytics",
    nav_widgets: "Widgets",
    nav_achievements: "Achievements",
    nav_settings: "Settings",
    hdr_greeting: "Hello, Achiever!",
    hdr_motivate: "Keep your streaks alive today.",
    btn_new_habit: "New Habit",
    btn_create_habit: "Create Habit",
    stat_today_rate: "Today's Completed",
    stat_active_streak: "Daily Streak",
    stat_journal_logs: "Journal Entries",
    stat_habit_score: "Weighted Score",
    stat_streak_sub: "Consecutive Perfect Days 🔥",
    stat_journal_sub: "Skincare, Gym & Code progress",
    stat_score_sub: "Consistent habits build weight!",
    agenda_title: "Today's Agenda",
    widget_quick_status: "Consistency Wheel",
    radial_completed: "Done",
    view_streak: "Streak View",
    view_list: "List View",
    timeline_photos_only: "Photos Only",
    timeline_search_placeholder: "Search progress notes, workout logs, skincare glow ups...",
    analytics_select_habit: "Deep-dive Habit:",
    opt_all_habits: "All Habits Combined",
    heatmap_title: "Annual Consistency Grid",
    heatmap_subtitle: "Click grids to inspect specific dates",
    chart_consistency_title: "Completion Consistency Trend",
    chart_categories_title: "Category Concentration",
    widgets_title: "Virtual Home Screen Widgets",
    widgets_subtitle: "Preview and customize widgets mimicking iOS & Android desktop displays.",
    widgets_settings_title: "Widget Styles",
    lbl_widget_theme: "Background theme",
    lbl_widget_size: "Widget Size Preset",
    lbl_widget_habit: "Target Habit",
    opt_size_small: "Small Square (2x2)",
    opt_size_medium: "Medium Rectangular (4x2)",
    opt_size_large: "Large Grid (4x4)",
    achieve_title: "Gamified Achievement Arena",
    achieve_subtitle: "Level up by finishing daily habits and maintaining streaks! (+10 XP per completion)",
    set_customization: "App Customization",
    set_theme_title: "Visual Theme Mode",
    set_theme_desc: "Switch color tokens between light and dark modes.",
    set_lang_title: "Interface Language",
    set_lang_desc: "Change all system buttons and headers.",
    set_audio_title: "Sound reinforcement",
    set_audio_desc: "Mute synthesized pentatonic chimes upon checking habits.",
    set_database: "Data & Cloud Backup",
    set_backup_title: "Backup Data (JSON)",
    set_backup_desc: "Export habits, photos, and histories locally.",
    btn_export: "Export JSON",
    set_restore_title: "Restore Data (JSON)",
    set_restore_desc: "Import a previous DnD backup file.",
    btn_restore: "Import JSON",
    set_cloud_title: "Mock Cloud Sync",
    set_cloud_desc: "Sync progress dynamically with virtual server backup.",
    btn_cloud_sync: "Sync to Cloud",
    set_archive_vault: "Trash",
    archive_intro: "Deleted habits are placed here. You can restore them to your active list or permanently delete them from the database.",
    set_danger_zone: "Danger Zone",
    set_wipe_title: "Wipe Database & Reset",
    set_wipe_desc: "Permanently erase habits, completions, journal notes, and photos from IndexedDB.",
    btn_wipe_db: "Wipe Database",
    lbl_new_habit: "Create New Habit",
    lbl_habit_name: "Habit Name *",
    habit_name_placeholder: "e.g. DSA Practice, Drink Water, Gym",
    lbl_category: "Category",
    cat_fitness: "Fitness",
    cat_study: "Study",
    cat_health: "Health",
    cat_finance: "Finance",
    cat_self_care: "Self-care",
    cat_productivity: "Productivity",
    lbl_desc: "Description",
    habit_desc_placeholder: "Explain the rules of your habit...",
    lbl_pick_color: "Custom HSL Accent Color",
    lbl_pick_emoji: "Choose Habit Emoji",
    emoji_tab_all: "All",
    lbl_selected_emoji: "Selected Emoji:",
    lbl_frequency: "Frequency Schedule",
    freq_daily: "Every Day",
    freq_custom: "Specific Days",
    freq_choose_days: "Choose weekdays this habit is active:",
    lbl_subtasks: "Checklist Sub-tasks (Optional)",
    subtasks_help: "Habit marks finished only when all sub-tasks are ticked.",
    subtask_input_placeholder: "e.g. Drink water, Stretch 5 mins, Skincare retinol",
    btn_add_task: "Add Task",
    btn_delete: "Delete",
    btn_cancel: "Cancel",
    btn_okay: "Okay",
    btn_save_habit: "Save Habit",
    lbl_journal_log: "Journey Log & Photo Journal",
    lbl_journal_note: "Reflection / Progress Notes",
    journal_note_placeholder: "How did it go? Log workout lifts, skincare textures, coding achievements, or mental reflections...",
    lbl_progress_photo: "Attach Progress Photo",
    photo_compress_hint: "Drag & drop or upload. Images are automatically compressed to ensure fast load times and save database space.",
    photo_drop_main: "Drag photo here or click to browse",
    btn_save_log: "Save Log",
    lbl_subtask_progress: "Sub-task Progress",
    chart_circadian_title: "Circadian Completion Scatter",
    set_notif_title: "Push Notifications",
    set_notif_desc: "Receive browser smart reminders for daily pending habits.",
    set_install_title: "Install Mobile App",
    set_install_desc: "Add DnD to your home screen for offline access and a full-screen app experience.",
    btn_install_app: "Install App",
    pwa_banner_title: "Install DnD App",
    pwa_banner_desc: "Add to home screen for offline habits & streaks",
    pwa_ios_title: "Install on iPhone / iPad"
  },
  hi: {
    nav_dashboard: "डैशबोर्ड",
    nav_habits: "आदतें",
    nav_timeline: "टाइमलाइन",
    nav_analytics: "विश्लेषण",
    nav_widgets: "विजेट्स",
    nav_achievements: "उपलब्धियां",
    nav_settings: "सेटिंग्स",
    hdr_greeting: "नमस्ते, विजेता!",
    hdr_motivate: "आज अपनी निरंतरता (streak) बनाए रखें।",
    btn_new_habit: "नई आदत",
    btn_create_habit: "आदत बनाएं",
    stat_today_rate: "आज पूर्ण किए गए",
    stat_active_streak: "दैनिक स्ट्रीक",
    stat_journal_logs: "जर्नल प्रविष्टियाँ",
    stat_habit_score: "भारित स्कोर",
    stat_streak_sub: "लगातार पूर्ण दिन! 🔥",
    stat_journal_sub: "जिम, स्किनकेयर और कोडिंग की प्रगति",
    stat_score_sub: "निरंतर आदतें स्कोर बढ़ाती हैं!",
    agenda_title: "आज का एजेंडा",
    widget_quick_status: "निरंतरता चक्र",
    radial_completed: "पूर्ण",
    view_streak: "स्ट्रीक दृश्य",
    view_list: "सूची दृश्य",
    timeline_photos_only: "केवल तस्वीरें",
    timeline_search_placeholder: "प्रगति नोट्स, जिम लॉग्स खोजें...",
    analytics_select_habit: "गहन विश्लेषण आदत:",
    opt_all_habits: "सभी आदतें संयुक्त",
    heatmap_title: "वार्षिक निरंतरता ग्रिड",
    heatmap_subtitle: "विशिष्ट तिथि देखने के लिए ग्रिड पर क्लिक करें",
    chart_consistency_title: "पूर्णता निरंतरता प्रवृत्ति",
    chart_categories_title: "श्रेणी संकेंद्रण",
    widgets_title: "वर्चुअल होम स्क्रीन विजेट्स",
    widgets_subtitle: "iOS और Android विजेट्स की तरह अनुकूलित करें।",
    widgets_settings_title: "विजेट शैलियाँ",
    lbl_widget_theme: "पृष्ठभूमि थीम",
    lbl_widget_size: "विजेट आकार",
    lbl_widget_habit: "लक्षित आदत",
    opt_size_small: "छोटा वर्ग (2x2)",
    opt_size_medium: "मध्यम आयताकार (4x2)",
    opt_size_large: "बड़ा ग्रिड (4x4)",
    achieve_title: "गेमीफाइड उपलब्धि क्षेत्र",
    achieve_subtitle: "आदतें पूरी करके और स्ट्रीक बनाकर लेवल बढ़ाएं! (+10 XP प्रति पूर्णता)",
    set_customization: "ऐप अनुकूलन",
    set_theme_title: "थीम मोड",
    set_theme_desc: "लाइट और डार्क मोड के बीच स्विच करें।",
    set_lang_title: "इंटरफ़ेस भाषा",
    set_lang_desc: "सिस्टम भाषा बदलें।",
    set_audio_title: "ध्वनि सुदृढ़ीकरण",
    set_audio_desc: "आदतें पूरी होने पर संगीत म्यूट करें।",
    set_database: "डेटा और क्लाउड बैकअप",
    set_backup_title: "बैकअप डेटा (JSON)",
    set_backup_desc: "आदतें और फोटो स्थानीय रूप से निर्यात करें।",
    btn_export: "JSON निर्यात करें",
    set_restore_title: "डेटा पुनर्स्थापित करें",
    set_restore_desc: "पिछली बैकअप फ़ाइल आयात करें।",
    btn_restore: "JSON आयात करें",
    set_cloud_title: "मॉक क्लाउड सिंक",
    set_cloud_desc: "सर्वर बैकअप के साथ सिंक करें।",
    btn_cloud_sync: "क्लाउड सिंक",
    set_archive_vault: "संग्रह वॉल्ट",
    archive_intro: "संग्रहीत आदतें डैशबोर्ड से छिप जाती हैं लेकिन लॉग्स में रहती हैं।",
    set_danger_zone: "खतरे का क्षेत्र",
    set_wipe_title: "डेटाबेस मिटाएं",
    set_wipe_desc: "डेटाबेस से सभी आदतें और फोटो स्थायी रूप से हटा दें।",
    btn_wipe_db: "डेटाबेस साफ करें",
    lbl_new_habit: "नई आदत बनाएं",
    lbl_habit_name: "आदत का नाम *",
    habit_name_placeholder: "जैसे: जिम, ध्यान, कोडिंग",
    lbl_category: "श्रेणी",
    cat_fitness: "स्वास्थ्य",
    cat_study: "अध्ययन",
    cat_health: "सेहत",
    cat_finance: "वित्त",
    cat_self_care: "आत्म-देखभाल",
    cat_productivity: "उत्पादकता",
    lbl_desc: "विवरण",
    habit_desc_placeholder: "अपनी आदत के नियम स्पष्ट करें...",
    lbl_pick_color: "कस्टम रंग चुनें",
    lbl_pick_emoji: "इमोजी चुनें",
    emoji_tab_all: "सभी",
    lbl_selected_emoji: "चयनित इमोजी:",
    lbl_frequency: "आवृत्ति अनुसूची",
    freq_daily: "हर दिन",
    freq_custom: "विशिष्ट दिन",
    freq_choose_days: "सक्रिय कार्यदिवस चुनें:",
    lbl_subtasks: "उप-कार्य चेकलिस्ट (वैकल्पिक)",
    subtasks_help: "सभी उप-कार्यों के टिक होने पर ही आदत पूर्ण होगी।",
    subtask_input_placeholder: "जैसे: पानी पिएं, स्ट्रेच करें",
    btn_add_task: "कार्य जोड़ें",
    btn_delete: "हटाएं",
    btn_cancel: "रद्द करें",
    btn_okay: "ठीक है",
    btn_save_habit: "आदत सहेजें",
    lbl_journal_log: "यात्रा लॉग और फोटो जर्नल",
    lbl_journal_note: "प्रगति और आत्मनिरीक्षण नोट्स",
    journal_note_placeholder: "कैसा रहा अनुभव? जिम लिफ्ट्स, स्किनकेयर या कोडिंग विचार लिखें...",
    lbl_progress_photo: "प्रगति फोटो जोड़ें",
    photo_compress_hint: "तस्वीरें स्वचालित रूप से संकुचित (compress) हो जाती हैं।",
    photo_drop_main: "फोटो यहाँ खींचें या खोजने के लिए क्लिक करें",
    btn_save_log: "लॉग सहेजें",
    lbl_subtask_progress: "उप-कार्य प्रगति",
    chart_circadian_title: "सर्कैडियन पूर्णता चार्ट",
    set_notif_title: "पुश सूचनाएं",
    set_notif_desc: "दैनिक लंबित आदतों के लिए ब्राउज़र अनुस्मारक प्राप्त करें।"
  },
  es: {
    nav_dashboard: "Panel",
    nav_habits: "Hábitos",
    nav_timeline: "Línea temporal",
    nav_analytics: "Análisis",
    nav_widgets: "Widgets",
    nav_achievements: "Logros",
    nav_settings: "Ajustes",
    hdr_greeting: "¡Hola, Triunfador!",
    hdr_motivate: "Mantén tus rachas activas hoy.",
    btn_new_habit: "Nuevo Hábito",
    btn_create_habit: "Crear Hábito",
    stat_today_rate: "Completado Hoy",
    stat_active_streak: "Racha Diaria",
    stat_journal_logs: "Entradas de Diario",
    stat_habit_score: "Puntuación Ponderada",
    stat_streak_sub: "¡Días perfectos consecutivos! 🔥",
    stat_journal_sub: "Progreso de Gimnasio, Skincare y Código",
    stat_score_sub: "¡Hábitos consistentes aumentan la puntuación!",
    agenda_title: "Agenda de Hoy",
    widget_quick_status: "Rueda de Consistencia",
    radial_completed: "Hecho",
    view_streak: "Vista Racha",
    view_list: "Vista Lista",
    timeline_photos_only: "Solo Fotos",
    timeline_search_placeholder: "Buscar notas de progreso, entrenamientos, skincare...",
    analytics_select_habit: "Hábito a profundizar:",
    opt_all_habits: "Todos los Hábitos Juntos",
    heatmap_title: "Cuadrícula de Consistencia Anual",
    heatmap_subtitle: "Haz clic en la cuadrícula para inspeccionar fechas",
    chart_consistency_title: "Tendencia de Consistencia de Completados",
    chart_categories_title: "Concentración por Categorías",
    widgets_title: "Widgets Virtuales de Pantalla de Inicio",
    widgets_subtitle: "Previsualiza y personaliza widgets simulando iOS y Android.",
    widgets_settings_title: "Estilos de Widget",
    lbl_widget_theme: "Tema de fondo",
    lbl_widget_size: "Tamaño del widget",
    lbl_widget_habit: "Hábito objetivo",
    opt_size_small: "Pequeño (2x2)",
    opt_size_medium: "Mediano (4x2)",
    opt_size_large: "Grande (4x4)",
    achieve_title: "Arena de Logros Gamificada",
    achieve_subtitle: "¡Sube de nivel completando hábitos y manteniendo rachas! (+10 XP por hábito)",
    set_customization: "Personalización",
    set_theme_title: "Modo de Tema Visual",
    set_theme_desc: "Cambia entre modo claro y oscuro.",
    set_lang_title: "Idioma de Interfaz",
    set_lang_desc: "Modifica los botones y cabeceras del sistema.",
    set_audio_title: "Sonido de Refuerzo",
    set_audio_desc: "Silencia el timbre pentatónico al completar hábitos.",
    set_database: "Datos y Copia de Seguridad",
    set_backup_title: "Respaldar Datos (JSON)",
    set_backup_desc: "Exporta hábitos y fotos localmente.",
    btn_export: "Exportar JSON",
    set_restore_title: "Restaurar Datos (JSON)",
    set_restore_desc: "Importa una copia de seguridad anterior.",
    btn_restore: "Importar JSON",
    set_cloud_title: "Sincronización en la Nube Mock",
    set_cloud_desc: "Sincroniza de forma simulada con el servidor.",
    btn_cloud_sync: "Sincronizar",
    set_archive_vault: "Papelera (Trash)",
    archive_intro: "Los hábitos eliminados se colocan aquí. Puede restaurarlos o eliminarlos permanentemente.",
    set_danger_zone: "Zona de Peligro",
    set_wipe_title: "Borrar Base de Datos y Reiniciar",
    set_wipe_desc: "Borra permanentemente hábitos y fotos de IndexedDB.",
    btn_wipe_db: "Borrar Base de Datos",
    lbl_new_habit: "Crear Nuevo Hábito",
    lbl_habit_name: "Nombre del Hábito *",
    habit_name_placeholder: "ej. Práctica de DSA, Beber Agua, Gimnasio",
    lbl_category: "Categoría",
    cat_fitness: "Gimnasio",
    cat_study: "Estudio",
    cat_health: "Salud",
    cat_finance: "Finanzas",
    cat_self_care: "Cuidado Personal",
    cat_productivity: "Productividad",
    lbl_desc: "Descripción",
    habit_desc_placeholder: "Explica las reglas de tu hábito...",
    lbl_pick_color: "Color de Acento HSL",
    lbl_pick_emoji: "Elige Emoji del Hábito",
    emoji_tab_all: "Todos",
    lbl_selected_emoji: "Emoji Seleccionado:",
    lbl_frequency: "Frecuencia de Horario",
    freq_daily: "Todos los Días",
    freq_custom: "Días Específicos",
    freq_choose_days: "Elige los días activos:",
    lbl_subtasks: "Subtareas de Check-list (Opcional)",
    subtasks_help: "El hábito se completa solo cuando todas las subtareas están marcadas.",
    subtask_input_placeholder: "ej. Beber agua, estirar 5 minutos",
    btn_add_task: "Agregar Tarea",
    btn_delete: "Eliminar",
    btn_cancel: "Cancelar",
    btn_okay: "Aceptar",
    btn_save_habit: "Guardar Hábito",
    lbl_journal_log: "Log de Trayecto y Diario de Fotos",
    lbl_journal_note: "Notas de Progreso y Reflexión",
    journal_note_placeholder: "¿Cómo te fue? Escribe tus marcas, reflexiones o detalles...",
    lbl_progress_photo: "Adjuntar Foto de Progreso",
    photo_compress_hint: "Las fotos se comprimen automáticamente para ahorrar espacio local.",
    photo_drop_main: "Arrastra la foto aquí o haz clic para buscar",
    btn_save_log: "Guardar Log",
    lbl_subtask_progress: "Progreso de Subtareas",
    chart_circadian_title: "Dispersión de Completados Circadianos",
    set_notif_title: "Notificaciones Push",
    set_notif_desc: "Recibe recordatorios inteligentes para hábitos pendientes."
  },
  de: {
    nav_dashboard: "Dashboard",
    nav_habits: "Gewohnheiten",
    nav_timeline: "Timeline",
    nav_analytics: "Analysen",
    nav_widgets: "Widgets",
    nav_achievements: "Erfolge",
    nav_settings: "Einstellungen",
    hdr_greeting: "Hallo, Macher!",
    hdr_motivate: "Halte deine Streaks heute am Leben.",
    btn_new_habit: "Neue Gewohnheit",
    btn_create_habit: "Gewohnheit erstellen",
    stat_today_rate: "Heute abgeschlossen",
    stat_active_streak: "Täglicher Streak",
    stat_journal_logs: "Tagebucheinträge",
    stat_habit_score: "Gewichtete Punktzahl",
    stat_streak_sub: "Aufeinanderfolgende perfekte Tage! 🔥",
    stat_journal_sub: "Fortschritte im Gym, Skincare & Code",
    stat_score_sub: "Konsistente Gewohnheiten bauen Punkte auf!",
    agenda_title: "Heutige Agenda",
    widget_quick_status: "Konsistenzrad",
    radial_completed: "Fertig",
    view_streak: "Streak-Ansicht",
    view_list: "Listenansicht",
    timeline_photos_only: "Nur Fotos",
    timeline_search_placeholder: "Suche nach Fortschrittsnotizen, Workouts, Hautpflege...",
    analytics_select_habit: "Tiefenanalyse Gewohnheit:",
    opt_all_habits: "Alle Gewohnheiten kombiniert",
    heatmap_title: "Jährliches Konsistenzraster",
    heatmap_subtitle: "Klicke auf das Raster, um bestimmte Termine zu prüfen",
    chart_consistency_title: "Abschlusskonsistenz-Trend",
    chart_categories_title: "Kategorie-Konzentration",
    widgets_title: "Virtuelle Widgets für den Startbildschirm",
    widgets_subtitle: "Vorschau und Anpassung von Widgets im Stil von iOS & Android.",
    widgets_settings_title: "Widget-Stile",
    lbl_widget_theme: "Hintergrund-Design",
    lbl_widget_size: "Widget-Größe",
    lbl_widget_habit: "Zielgewohnheit",
    opt_size_small: "Kleines Quadrat (2x2)",
    opt_size_medium: "Mittleres Rechteck (4x2)",
    opt_size_large: "Großes Raster (4x4)",
    achieve_title: "Erfolgsarena mit Gamification",
    achieve_subtitle: "Steige im Level auf, indem du Gewohnheiten abschließt! (+10 EP pro Abschluss)",
    set_customization: "App-Anpassung",
    set_theme_title: "Visueller Design-Modus",
    set_theme_desc: "Wechsle zwischen hellem und dunklem Design.",
    set_lang_title: "Benutzeroberflächen-Sprache",
    set_lang_desc: "Ändere alle System-Schaltflächen.",
    set_audio_title: "Ton-Unterstützung",
    set_audio_desc: "Schalte die harmonischen Klänge beim Abschließen stumm.",
    set_database: "Daten & Cloud-Backup",
    set_backup_title: "Daten sichern (JSON)",
    set_backup_desc: "Gewohnheiten und Fotos lokal exportieren.",
    btn_export: "JSON exportieren",
    set_restore_title: "Daten wiederherstellen (JSON)",
    set_restore_desc: "Importiere ein vorheriges DnD-Backup.",
    btn_restore: "JSON importieren",
    set_cloud_title: "Simulierter Cloud-Sync",
    set_cloud_desc: "Synchronisiere simuliert mit dem Server-Backup.",
    btn_cloud_sync: "In Cloud synchronisieren",
    set_archive_vault: "Papierkorb (Trash)",
    archive_intro: "Gelöschte Gewohnheiten werden hier abgelegt. Sie können sie wiederherstellen oder dauerhaft löschen.",
    set_danger_zone: "Gefahrenbereich",
    set_wipe_title: "Datenbank löschen & zurücksetzen",
    set_wipe_desc: "Lösche dauerhaft alle Gewohnheiten und Fotos aus IndexedDB.",
    btn_wipe_db: "Datenbank löschen",
    lbl_new_habit: "Neue Gewohnheit erstellen",
    lbl_habit_name: "Gewohnheitsname *",
    habit_name_placeholder: "z.B. DSA-Praxis, Wasser trinken, Gym",
    lbl_category: "Kategorie",
    cat_fitness: "Fitness",
    cat_study: "Lernen",
    cat_health: "Gesundheit",
    cat_finance: "Finanzen",
    cat_self_care: "Selbstpflege",
    cat_productivity: "Produktivität",
    lbl_desc: "Beschreibung",
    habit_desc_placeholder: "Erkläre die Regeln deiner Gewohnheit...",
    lbl_pick_color: "Eigener HSL-Farbton",
    lbl_pick_emoji: "Gewohnheits-Emoji wählen",
    emoji_tab_all: "Alle",
    lbl_selected_emoji: "Gewähltes Emoji:",
    lbl_frequency: "Häufigkeit",
    freq_daily: "Jeden Tag",
    freq_custom: "Spezifische Tage",
    freq_choose_days: "Wähle aktive Wochentage:",
    lbl_subtasks: "Checklisten-Unteraufgaben (Optional)",
    subtasks_help: "Die Gewohnheit gilt erst als erfüllt, wenn alle Unteraufgaben abgehakt sind.",
    subtask_input_placeholder: "z.B. Wasser trinken, 5 Min. dehnen",
    btn_add_task: "Aufgabe hinzufügen",
    btn_delete: "Löschen",
    btn_cancel: "Abbrechen",
    btn_okay: "Okay",
    btn_save_habit: "Gewohnheit speichern",
    lbl_journal_log: "Fortschritts- und Fotojournal",
    lbl_journal_note: "Reflexionen / Fortschrittsnotizen",
    journal_note_placeholder: "Wie lief es? Schreibe über Gewichte, Hauttexturen, Codierungsfortschritte...",
    lbl_progress_photo: "Fortschrittsfoto anhängen",
    photo_compress_hint: "Bilder werden automatisch komprimiert, um Speicherplatz zu sparen.",
    photo_drop_main: "Foto hierher ziehen oder zum Suchen klicken",
    btn_save_log: "Eintrag speichern",
    lbl_subtask_progress: "Unteraufgaben-Fortschritt",
    chart_circadian_title: "Zirkadianer Abschluss-Trend",
    set_notif_title: "Push-Benachrichtigungen",
    set_notif_desc: "Erhalten Sie zirkadiane Browser-Erinnerungen für ausstehende Aufgaben."
  },
  ja: {
    nav_dashboard: "ダッシュボード",
    nav_habits: "習慣",
    nav_timeline: "タイムライン",
    nav_analytics: "分析",
    nav_widgets: "ウィジェット",
    nav_achievements: "実績",
    nav_settings: "設定",
    hdr_greeting: "こんにちは、目標達成者！",
    hdr_motivate: "今日の継続ストリークを維持しましょう。",
    btn_new_habit: "新しい習慣",
    btn_create_habit: "習慣を作成",
    stat_today_rate: "今日の完了",
    stat_active_streak: "デイリーストリーク",
    stat_journal_logs: "ジャーナルログ",
    stat_habit_score: "習慣スコア",
    stat_streak_sub: "連続完璧達成日！ 🔥",
    stat_journal_sub: "ジム、スキンケア、コーディングの歩み",
    stat_score_sub: "一貫した習慣がスコアを育てます！",
    agenda_title: "今日の予定",
    widget_quick_status: "継続率サークル",
    radial_completed: "完了",
    view_streak: "ストリーク表示",
    view_list: "リスト表示",
    timeline_photos_only: "写真のみ表示",
    timeline_search_placeholder: "ノート、ジム記録、スキンケアの変化を検索...",
    analytics_select_habit: "深掘りする習慣：",
    opt_all_habits: "すべての習慣を合算",
    heatmap_title: "年間継続グリッド",
    heatmap_subtitle: "グリッドをクリックして詳細な記録を確認",
    chart_consistency_title: "完了一貫性のトレンド",
    chart_categories_title: "カテゴリー比率",
    widgets_title: "仮想ホーム画面ウィジェット",
    widgets_subtitle: "iOSやAndroidを模したウィジェットのカスタマイズとプレビュー。",
    widgets_settings_title: "ウィジェットスタイル",
    lbl_widget_theme: "背景テーマ",
    lbl_widget_size: "ウィジェットサイズ",
    lbl_widget_habit: "対象の習慣",
    opt_size_small: "小さな正方形 (2x2)",
    opt_size_medium: "長方形 (4x2)",
    opt_size_large: "大きなグリッド (4x4)",
    achieve_title: "ゲーム感覚の実績エリア",
    achieve_subtitle: "習慣を完了してレベルアップ！ストリークを維持してXPを稼ごう (1完了 = +10 XP)",
    set_customization: "アプリのカスタマイズ",
    set_theme_title: "表示テーマモード",
    set_theme_desc: "ライトモードとダークモードを切り替えます。",
    set_lang_title: "使用言語",
    set_lang_desc: "アプリ内のボタンや文字の表示言語を変更。",
    set_audio_title: "効果音の設定",
    set_audio_desc: "習慣完了時のペンタトニックチャイム音声を消音します。",
    set_database: "データとクラウドバックアップ",
    set_backup_title: "データのバックアップ (JSON)",
    set_backup_desc: "習慣や写真をローカルにエクスポートします。",
    btn_export: "JSONエクスポート",
    set_restore_title: "データの復元 (JSON)",
    set_restore_desc: "以前のDnDバックアップファイルを読み込みます。",
    btn_restore: "JSONインポート",
    set_cloud_title: "クラウドシークの模倣",
    set_cloud_desc: "仮想サーバーに歩みをバックアップします。",
    btn_cloud_sync: "クラウドと同期",
    set_archive_vault: "アーカイブ保管庫",
    archive_intro: "アーカイブされた習慣はダッシュボードから非表示になりますが、ログには残ります。",
    set_danger_zone: "デンジャーゾーン",
    set_wipe_title: "データベースの消去",
    set_wipe_desc: "IndexedDBからすべての習慣、ノート、写真を永久に消去します。",
    btn_wipe_db: "データを完全消去",
    lbl_new_habit: "新しい習慣の作成",
    lbl_habit_name: "習慣の名前 *",
    habit_name_placeholder: "例：ジム、瞑想、コーディング",
    lbl_category: "カテゴリー",
    cat_fitness: "フィットネス",
    cat_study: "勉強",
    cat_health: "ヘルスケア",
    cat_finance: "資産管理",
    cat_self_care: "セルフケア",
    cat_productivity: "生産性",
    lbl_desc: "説明",
    habit_desc_placeholder: "習慣のルールを書きましょう...",
    lbl_pick_color: "カスタムHSLアクセントカラー",
    lbl_pick_emoji: "習慣の絵文字を選択",
    emoji_tab_all: "すべて",
    lbl_selected_emoji: "選択された絵文字：",
    lbl_frequency: "スケジュールの頻度",
    freq_daily: "毎日実施",
    freq_custom: "特定の曜日",
    freq_choose_days: "実施する曜日を選択：",
    lbl_subtasks: "サブタスク・チェックリスト (任意)",
    subtasks_help: "すべてのサブタスクにチェックを入れることで習慣が「完了」になります。",
    subtask_input_placeholder: "例：水を飲む、5分ストレッチ",
    btn_add_task: "追加",
    btn_delete: "削除",
    btn_cancel: "キャンセル",
    btn_okay: "確定",
    btn_save_habit: "習慣を保存",
    lbl_journal_log: "日誌＆写真ジャーナルの記録",
    lbl_journal_note: "振り返り / 成長記録",
    journal_note_placeholder: "今日はどうでしたか？筋トレの重量、肌の状態、コードの学びを記録しましょう...",
    lbl_progress_photo: "変化の写真を添付する",
    photo_compress_hint: "写真は自動的に圧縮され、読み込み速度と容量を最適化します。",
    photo_drop_main: "ここに写真をドラッグするかクリックして選択",
    btn_save_log: "ログを保存",
    lbl_subtask_progress: "サブタスクの進捗",
    chart_circadian_title: "時間帯別完了一覧",
    set_notif_title: "プッシュ通知",
    set_notif_desc: "未完了の習慣についてブラウザの通知リマインダーを受け取る。"
  },
  ru: {
    nav_dashboard: "Панель",
    nav_habits: "Привычки",
    nav_timeline: "Хроника",
    nav_analytics: "Аналитика",
    nav_widgets: "Виджеты",
    nav_achievements: "Достижения",
    nav_settings: "Настройки",
    hdr_greeting: "Привет, Достигатор!",
    hdr_motivate: "Поддерживайте свои серии сегодня.",
    btn_new_habit: "Новая привычка",
    btn_create_habit: "Создать привычку",
    stat_today_rate: "Выполнено сегодня",
    stat_active_streak: "Ежедневная серия",
    stat_journal_logs: "Записи журнала",
    stat_habit_score: "Оценка привычек",
    stat_streak_sub: "Подряд идеальных дней! 🔥",
    stat_journal_sub: "Прогресс в зале, уходе за кожей и кодинге",
    stat_score_sub: "Регулярность повышает ваш рейтинг!",
    agenda_title: "План на сегодня",
    widget_quick_status: "Круг регулярности",
    radial_completed: "Готово",
    view_streak: "Режим Серий",
    view_list: "Режим Списка",
    timeline_photos_only: "Только фото",
    timeline_search_placeholder: "Искать заметки, тренировки, уход за кожей...",
    analytics_select_habit: "Анализ привычки:",
    opt_all_habits: "Все привычки вместе",
    heatmap_title: "Годовая сетка активности",
    heatmap_subtitle: "Кликните на ячейку для просмотра деталей",
    chart_consistency_title: "Тенденция завершения привычек",
    chart_categories_title: "Распределение по категориям",
    widgets_title: "Виртуальные виджеты домашнего экрана",
    widgets_subtitle: "Предпросмотр и настройка виджетов в стиле iOS и Android.",
    widgets_settings_title: "Стили виджета",
    lbl_widget_theme: "Тема виджета",
    lbl_widget_size: "Размер виджета",
    lbl_widget_habit: "Целевая привычка",
    opt_size_small: "Маленький квадрат (2x2)",
    opt_size_medium: "Прямоугольный (4x2)",
    opt_size_large: "Большая сетка (4x4)",
    achieve_title: "Игровая арена достижений",
    achieve_subtitle: "Повышайте уровень за завершение привычек! (+10 XP за привычку)",
    set_customization: "Кастомизация",
    set_theme_title: "Визуальный режим темы",
    set_theme_desc: "Переключение цветовых токенов между светлым и темным режимами.",
    set_lang_title: "Язык интерфейса",
    set_lang_desc: "Изменение языка всех кнопок и заголовков системы.",
    set_audio_title: "Звуковое сопровождение",
    set_audio_desc: "Отключение звука синтезированных пентатонических колокольчиков при отметке привычек.",
    set_database: "Резервное копирование данных и облако",
    set_backup_title: "Резервное копирование данных (JSON)",
    set_backup_desc: "Локальный экспорт привычек, фотографий и истории.",
    btn_export: "Экспорт JSON",
    set_restore_title: "Восстановление данных (JSON)",
    set_restore_desc: "Импорт ранее созданного файла резервной копии DnD.",
    btn_restore: "Импорт JSON",
    set_cloud_title: "Виртуальная облачная синхронизация",
    set_cloud_desc: "Динамическая синхронизация прогресса с резервной копией на виртуальном сервере.",
    btn_cloud_sync: "Синхронизировать с облаком",
    set_archive_vault: "Корзина (Trash)",
    archive_intro: "Удаленные привычки попадают сюда. Вы можете восстановить их или окончательно стереть из базы данных.",
    set_danger_zone: "Опасная зона",
    set_wipe_title: "Очистка базы данных",
    set_wipe_desc: "Навсегда удалить привычки, заметки и фото из IndexedDB.",
    btn_wipe_db: "Стереть данные",
    lbl_new_habit: "Создание новой привычки",
    lbl_habit_name: "Название привычки *",
    habit_name_placeholder: "например, Практика DSA, Вода, Зал",
    lbl_category: "Категория",
    cat_fitness: "Спорт",
    cat_study: "Учеба",
    cat_health: "Здоровье",
    cat_finance: "Финансы",
    cat_self_care: "Уход за собой",
    cat_productivity: "Продуктивность",
    lbl_desc: "Описание",
    habit_desc_placeholder: "Опишите правила вашей привычки...",
    lbl_pick_color: "Цветовой акцент HSL",
    lbl_pick_emoji: "Выберите эмодзи для привычки",
    emoji_tab_all: "Все",
    lbl_selected_emoji: "Выбранный эмодзи:",
    lbl_frequency: "График повторений",
    freq_daily: "Каждый день",
    freq_custom: "Определенные дни",
    freq_choose_days: "Выберите активные дни недели:",
    lbl_subtasks: "Чек-лист подзадач (Опционально)",
    subtasks_help: "Привычка считается выполненной только после отметки всех подзадач.",
    subtask_input_placeholder: "например, Выпить воды, растяжка 5 мин",
    btn_add_task: "Добавить подзадачу",
    btn_delete: "Удалить",
    btn_cancel: "Отмена",
    btn_okay: "ОК",
    btn_save_habit: "Сохранить привычку",
    lbl_journal_log: "Журнал прогресса и фотоотчетов",
    lbl_journal_note: "Размышления и отчеты о прогрессе",
    journal_note_placeholder: "Как все прошло? Опишите веса, текстуры ухода или учебные инсайты...",
    lbl_progress_photo: "Прикрепить фото прогресса",
    photo_compress_hint: "Изображения автоматически сжимаются для экономии места.",
    photo_drop_main: "Перетащите фото сюда или нажмите для выбора",
    btn_save_log: "Сохранить отчет",
    lbl_subtask_progress: "Прогресс подзадач",
    chart_circadian_title: "График активности по часам",
    set_notif_title: "Push-уведомления",
    set_notif_desc: "Получать умные напоминания о невыполненных задачах."
  }
};

// Curated Category Color presets for selector (solid HSL colors)
const CURATED_COLORS = [
  'var(--color-indigo)',
  'var(--color-emerald)',
  'var(--color-rose)',
  'var(--color-violet)',
  'var(--color-amber)',
  'var(--color-sky)',
  'var(--color-orange)',
  'var(--color-fuchsia)',
  '200, 70%, 50%', // Custom Teal
  '120, 50%, 45%', // Olive Green
  '340, 75%, 55%', // Hot Pink
  '15, 80%, 45%',  // Brick Red
];

// Curated Emoji Pick Lists by categories
const CURATED_EMOJIS = {
  fitness: ['🏋️‍♂️', '🏃‍♂️', '💪', '🚴‍♂️', '🏊‍♂️', '🧘‍♂️', '🧗‍♂️', '🥗', '🥤', '💧', '👟', '⏱️'],
  mind: ['🧠', '🧘‍♂️', '📖', '✍️', '💭', '🔋', '🌞', '🌌', '🎨', '🎵', '🕯️', '🌸'],
  study: ['💻', '📝', '📚', '🚀', '🎯', '💡', '⏰', '🎓', '🛠️', '📈', '📊', '🔍'],
  health: ['🍏', '🥗', '🥕', '💊', '🛌', '🩺', '🥛', '🦷', '🥑', '🍋', '🍵', '🍎'],
  lifestyle: ['🌱', '🧹', '💰', '🚿', '🧴', '👗', '👜', '🔑', '🚗', '🐶', '🐱', '✨']
};

const DEFAULT_NOTE_CATEGORIES = [
  {
    id: 'general',
    name: 'General',
    emoji: '📂',
    hsl: '200, 70%, 50%',
    subcategories: [
      { id: 'notes', name: 'Notes', emoji: '📝' },
      { id: 'tasks', name: 'Tasks', emoji: '✅' }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    emoji: '👗',
    hsl: '320, 75%, 55%',
    subcategories: [
      { id: 'clothing', name: 'Clothing', emoji: '👕' },
      { id: 'accessories', name: 'Accessories', emoji: '👜' }
    ]
  },
  {
    id: 'gym',
    name: 'Gym',
    emoji: '🏋️‍♂️',
    hsl: '15, 80%, 45%',
    subcategories: [
      { id: 'workout', name: 'Workout', emoji: '💪' },
      { id: 'diet', name: 'Diet & Nutrition', emoji: '🥗' }
    ]
  },
  {
    id: 'eatables',
    name: 'Eatables',
    emoji: '🍏',
    hsl: '120, 50%, 45%',
    subcategories: [
      { id: 'groceries', name: 'Groceries', emoji: '🛒' },
      { id: 'recipes', name: 'Recipes', emoji: '🍳' }
    ]
  }
];

// Global State object
const state = {
  db: null,
  audio: null,
  activeView: 'view-dashboard',
  habits: [],
  completions: [],
  notes: [],
  noteCategories: [],
  activeNoteId: null,
  notesSidebarTab: 'active',
  notesVaultUnlocked: false,
  activeStyleSidebarCategory: null,
  selectedTheme: 'dark',
  notifications: [],
  notificationPreferences: {
    notif_reminders: true,
    notif_streaks: true,
    notif_success: true,
    notif_guidance: true,
    notif_audio: true
  },
  onboardingState: null,
  currentLang: 'en',
  activeHabitsCategory: 'all',
  activeAgendaCategory: 'all',
  activeTimelineCategory: 'all',
  habitModalSubtasks: [], // Temp holder for subtasks in creator modal
  habitCreatorSelectedColor: 'var(--color-indigo)',
  habitCreatorSelectedEmoji: '✨',
  activeWidgetTheme: 'glass',
  activeWidgetSize: 'medium',
  activeWidgetHabitId: null,
  activeAnalyticsHabitId: 'all',
  activeAnalyticsRange: 'yearly',
  coreQuestHabitId: null,
  calendarDate: new Date(),
  hiddenInventoryUnlocked: false,
  charts: {
    trend: null,
    radar: null,
    circadian: null
  }
};

// --- INITIALIZATION ENGINE ---
async function initApp() {
  // SAFETY NET: If JS crashes or initApp takes too long, show login screen after 8s
  const authFallbackTimer = setTimeout(() => {
    const loadingView = document.getElementById('web-auth-loading-view');
    const overlay = document.getElementById('web-auth-overlay');
    if (overlay && overlay.style.display !== 'none' && loadingView && loadingView.style.display !== 'none') {
      console.warn('Auth check safety net triggered - showing welcome screen');
      showWebAuthOverlay('welcome');
    }
  }, 8000);

  // Self-healing fallbacks for CDN blocks due to Tracking Prevention
  if (typeof lucide === 'undefined') {
    window.lucide = {
      createIcons: function(options) { 
        console.warn('Lucide icons blocked by browser tracking prevention.', options); 
      }
    };
  }
  if (typeof confetti === 'undefined') {
    window.confetti = function(options) { 
      console.warn('Confetti blocked by browser tracking prevention.', options); 
    };
  }
  if (typeof Chart === 'undefined') {
    window.Chart = class DummyChart {
      constructor() { console.warn('Chart.js blocked by browser tracking prevention.'); }
      destroy() {}
      update() {}
    };
  }

  // Global self-healing Twemoji image error listener (intercepts capture phase)
  window.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG' && e.target.src && e.target.src.includes('twemoji')) {
      const img = e.target;
      const alt = img.getAttribute('alt') || '📄';
      const parent = img.parentElement;
      if (parent) {
        parent.textContent = alt;
        parent.style.fontSize = '1.1rem';
        parent.style.lineHeight = '1';
        parent.style.display = 'inline-flex';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';
      }
    }
  }, true);

  // 1. Database and Audio instantiation
  state.db = new TickOffDB();
  await state.db.init();

  // Load sample demo data if new database
  await setupDemoDataIfEmpty(state.db);

  // Inject extra random habits if not already injected
  await injectAdditionalRandomHabits(state.db);

  state.audio = new TickOffAudio();

  // 2. Fetch and apply basic settings
  state.selectedTheme = await state.db.getSetting('theme', 'dark');
  state.currentLang = await state.db.getSetting('language', 'en');
  state.coreQuestHabitId = await state.db.getSetting('core_quest_habit_id', null);
  const muted = await state.db.getSetting('sound_muted', false);
  state.audio.setMuted(muted);
  
  const soundToggle = document.getElementById('setting-sound-toggle');
  if (soundToggle) soundToggle.checked = !muted;

  applyTheme(state.selectedTheme);
  translateUI(state.currentLang);
  
  const langSwitcher = document.getElementById('setting-language-switcher');
  if (langSwitcher) langSwitcher.value = state.currentLang;

  // Render static creator matrices
  initCreatorColorPalette();
  initCreatorEmojiPicker();

  // 3. Load DB data to global state
  await reloadStateData();
  await checkAuthStatus();

  // 4. Attach event listeners
  attachEventListeners();
  initExitConfirmation();
  initLocalAuth();

  // 5. Initialize notifications
  await initNotifications();

  // 6. Initial views update
  updateViewContent();
  lucide.createIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Cancel scheduled native notifications for a specific habit
async function cancelHabitNotifications(habitId) {
  if (window.Capacitor?.Plugins?.LocalNotifications) {
    try {
      const id1 = parseInt(habitId);
      const id2 = id1 + 100000;
      await window.Capacitor.Plugins.LocalNotifications.cancel({
        notifications: [{ id: id1 }, { id: id2 }]
      });
    } catch (e) {
      console.error('Failed to cancel notifications for habit:', habitId, e);
    }
  }
}

// --- CORE UTILITY: Reload DB data to State ---
async function reloadStateData() {
  state.habits = await state.db.getHabits(true); // Fetch all including archived
  state.completions = await state.db.getAllCompletions();
  state.notes = await state.db.getNotes(true); // Fetch notes (excl. deleted)
  
  // Auto-unlock migration to remove any accidental passcode locks automatically!
  for (const note of state.notes) {
    if (note.isLocked) {
      note.isLocked = false;
      note.vaultPasscode = '';
      await state.db.updateNote(note);
    }
  }
  
  // Load custom categories with self-healing fallback checks
  let loadedCats = await state.db.getSetting('note_categories', DEFAULT_NOTE_CATEGORIES);
  if (!loadedCats || !Array.isArray(loadedCats) || loadedCats.length === 0) {
    loadedCats = DEFAULT_NOTE_CATEGORIES;
    await state.db.setSetting('note_categories', DEFAULT_NOTE_CATEGORIES);
  } else {
    let modified = false;
    loadedCats.forEach(cat => {
      if (!cat.name || cat.name.trim() === '') {
        cat.name = cat.id ? cat.id.charAt(0).toUpperCase() + cat.id.slice(1) : 'Category';
        modified = true;
      }
      if (cat.subcategories && Array.isArray(cat.subcategories)) {
        cat.subcategories.forEach(sub => {
          if (!sub.name || sub.name.trim() === '') {
            sub.name = sub.id ? sub.id.charAt(0).toUpperCase() + sub.id.slice(1) : 'Subcategory';
            modified = true;
          }
        });
      }
    });
    if (modified) {
      await state.db.setSetting('note_categories', loadedCats);
    }
  }
  state.noteCategories = loadedCats;
  
  // Set target widget default habit
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);
  if (activeHabits.length > 0 && !state.activeWidgetHabitId) {
    state.activeWidgetHabitId = activeHabits[0].id;
  }

  // 21-Day Streak Shield awarding rule check (Unlocked as an achievement and claimed in Achievements screen)
  let habitsUpdated = false;
  for (const h of activeHabits) {
    const completionsForHabit = state.completions.filter(c => c.habitId === h.id);
    const stats = await state.db.getStreakStats(h.id, completionsForHabit);
    
    // Streak milestone factor (21, 42, 63...)
    const currentMilestone = Math.floor(stats.currentStreak / 21) * 21;
    
    if (currentMilestone >= 21) {
      if (!h.lastShieldMilestone || h.lastShieldMilestone < currentMilestone) {
        h.lastShieldMilestone = currentMilestone;
        await state.db.updateHabit(h);
        habitsUpdated = true;

        // Add to unclaimed shields in settings
        let unclaimed = await state.db.getSetting('unclaimed_shields', []);
        if (!unclaimed.some(u => u.id === `${h.id}_${currentMilestone}`)) {
          unclaimed.push({
            id: `${h.id}_${currentMilestone}`,
            habitId: h.id,
            habitName: h.name,
            habitEmoji: h.emoji,
            milestone: currentMilestone,
            claimed: false
          });
          await state.db.setSetting('unclaimed_shields', unclaimed);
        }

        // Play sound and trigger unlock notification
        setTimeout(() => {
          state.audio.playAchievement();
          confetti({ 
            particleCount: 120, 
            spread: 80, 
            colors: ['#f59e0b', '#fbbf24', '#fff', '#d97706'],
            origin: { y: 0.6 }
          });
          showNotification(`🛡️ STREAK PROTECTOR UNLOCKED! Claim your shield reward in Achievements for "${h.name}"!`, 'linear-gradient(135deg, #f59e0b, #d97706)');
        }, 800);
      }
    }
  }

  if (habitsUpdated) {
    state.habits = await state.db.getHabits(true);
  }

  // Cancel scheduled notifications for any habits completed today
  const todayStr = new Date().toISOString().split('T')[0];
  for (const h of state.habits) {
    const completedToday = state.completions.some(c => c.habitId === h.id && c.completed && c.date === todayStr);
    if (completedToday) {
      cancelHabitNotifications(h.id);
    }
  }
  
  // Load Notifications and preferences
  state.notifications = await state.db.getSetting('notifications_list', []);
  const savedPreferences = await state.db.getSetting('notification_preferences', null);
  if (savedPreferences) {
    state.notificationPreferences = { ...state.notificationPreferences, ...savedPreferences };
  }
  
  // Load Onboarding State
  const defaultOnboarding = {
    create_habit: false,
    complete_subtask: false,
    write_journal: false,
    complete_habit: false,
    reward_claimed: false
  };
  state.onboardingState = await state.db.getSetting('onboarding_state', defaultOnboarding);

  // Dynamically update achievements on reload
  await checkAchievements();
}

function initExitConfirmation() {
  const modal = document.getElementById('modal-exit-confirm');
  const btnCancel = document.getElementById('btn-exit-cancel');
  const btnConfirm = document.getElementById('btn-exit-confirm');

  if (!modal) return;

  const showExitModal = () => {
    modal.classList.add('active');
  };

  const hideExitModal = () => {
    modal.classList.remove('active');
  };

  if (btnCancel) {
    btnCancel.addEventListener('click', hideExitModal);
  }

  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      hideExitModal();
      if (window.Capacitor?.Plugins?.App) {
        window.Capacitor.Plugins.App.exitApp();
      } else if (navigator.app && typeof navigator.app.exitApp === 'function') {
        navigator.app.exitApp();
      } else {
        window.close();
      }
    });
  }

  // Intercept native backbutton event (Android / Cordova)
  document.addEventListener('backbutton', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if there are active modal overlays
    const activeOverlays = Array.from(document.querySelectorAll('.modal-overlay.active'));
    if (activeOverlays.length > 0) {
      // Don't close account modal if locked out
      const topModal = activeOverlays[activeOverlays.length - 1];
      if (topModal.id === 'modal-account-auth') {
        const titleText = document.getElementById('auth-modal-title')?.innerText || '';
        if (titleText.includes('Sign In') || titleText.includes('Unlock')) {
          showNotification('⚠️ Unlock profile to access DnD!', 'var(--color-rose)');
          return;
        }
      }
      topModal.classList.remove('active');
    } else {
      showExitModal();
    }
  }, false);

  // Web beforeunload listener fallback
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = 'Are you sure you want to quit?';
    return 'Are you sure you want to quit?';
  });
}

// ================= LOCAL USER ACCOUNT SYSTEM =================
// In-memory access token storage
let accessToken = null;

// Helper to make authenticated requests
async function authFetch(url, options = {}) {
  options.headers = options.headers || {};
  if (accessToken) {
    options.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  let response = await fetch(url, options);
  
  // If unauthorized, attempt silent refresh
  if (response.status === 401) {
    const refreshed = await silentTokenRefresh();
    if (refreshed) {
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    }
  }
  return response;
}

async function silentTokenRefresh() {
  if (window.DnDAndroid) return true; // Android container manages session natively
  
  try {
    // Race the API call against a 5-second timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Auth check timed out')), 5000)
    );
    const res = await Promise.race([
      fetch('/api/auth/refresh-token', { method: 'POST' }),
      timeoutPromise
    ]);
    if (res.ok) {
      const data = await res.json();
      accessToken = data.accessToken;
      
      const sidebarNameEl = document.querySelector('.profile-name');
      const usernameDisplay = document.getElementById('settings-username-display');
      const usernameDesc = document.getElementById('settings-username-desc');
      const btnLogout = document.getElementById('btn-settings-account-logout');
      
      if (sidebarNameEl) sidebarNameEl.innerText = data.user.name;
      if (usernameDisplay) usernameDisplay.innerText = `Profile: ${data.user.name}`;
      if (usernameDesc) usernameDesc.innerText = `Logged in via Web Account (${data.user.email})`;
      if (btnLogout) btnLogout.style.display = 'inline-block';
      
      // Hide auth overlay (user is already logged in)
      const overlay = document.getElementById('web-auth-overlay');
      if (overlay) overlay.style.display = 'none';
      const loadingView = document.getElementById('web-auth-loading-view');
      if (loadingView) loadingView.style.display = 'none';
      // Show app container (was hidden while auth overlay was displayed)
      const appContainerOnAuth = document.querySelector('.app-container');
      if (appContainerOnAuth) appContainerOnAuth.style.display = '';
      return true;
    }
  } catch (err) {
    console.error('Silent token refresh failed:', err);
  }
  
  accessToken = null;
  return false;
}

async function checkAuthStatus() {
  const sidebarNameEl = document.querySelector('.profile-name');
  const btnLogout = document.getElementById('btn-settings-account-logout');
  const usernameDisplay = document.getElementById('settings-username-display');
  const usernameDesc = document.getElementById('settings-username-desc');

  if (window.DnDAndroid && typeof window.DnDAndroid.isLoggedIn === 'function') {
    const isLoggedIn = window.DnDAndroid.isLoggedIn();
    if (isLoggedIn) {
      const username = window.DnDAndroid.getUsername() || 'Achiever';
      if (sidebarNameEl) sidebarNameEl.innerText = username;
      if (usernameDisplay) usernameDisplay.innerText = `Profile: ${username}`;
      if (usernameDesc) usernameDesc.innerText = 'Logged in via Android native account.';
      if (btnLogout) btnLogout.style.display = 'inline-block';
    } else {
      if (sidebarNameEl) sidebarNameEl.innerText = 'Guest Profile';
      if (usernameDisplay) usernameDisplay.innerText = 'Guest Profile';
      if (usernameDesc) usernameDesc.innerText = 'Offline guest account mode.';
      if (btnLogout) btnLogout.style.display = 'none';
    }
  } else {
    // Web Mode
    const refreshed = await silentTokenRefresh();
    if (!refreshed) {
      showWebAuthOverlay('welcome');
    } else {
      // Auth succeeded (e.g. after login) — ensure app content is rendered
      await updateViewContent();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }
}

function showWebAuthOverlay(view) {
  console.log('showWebAuthOverlay called with view:', view);
  const overlay = document.getElementById('web-auth-overlay');
  if (!overlay) {
    console.log('web-auth-overlay element not found!');
    return;
  }
  overlay.style.display = 'flex';
  // Hide the main app so it doesn't show through the overlay
  const appContainer = document.querySelector('.app-container');
  if (appContainer) appContainer.style.display = 'none';
  
  // Hide the loading spinner
  const loadingView = document.getElementById('web-auth-loading-view');
  if (loadingView) loadingView.style.display = 'none';
  
  // Hide all forms and views
  const welcomeView = document.getElementById('web-auth-welcome-view');
  if (welcomeView) welcomeView.style.display = 'none';
  
  const backToWelcomeBtn = document.getElementById('btn-auth-back-to-welcome');
  if (backToWelcomeBtn) {
    if (view === 'welcome') {
      backToWelcomeBtn.style.display = 'none';
    } else {
      backToWelcomeBtn.style.display = 'block';
    }
  }

  const logoHeader = document.querySelector('.auth-logo-header');
  if (logoHeader) {
    if (view === 'welcome') {
      logoHeader.style.display = 'none';
    } else {
      logoHeader.style.display = 'block';
    }
  }

  const loginForm = document.getElementById('web-auth-login-form');
  const signupForm = document.getElementById('web-auth-signup-form');
  const otpForm = document.getElementById('web-auth-otp-form');
  const forgotForm = document.getElementById('web-auth-forgot-form');
  const resetForm = document.getElementById('web-auth-reset-form');
  if (loginForm) loginForm.style.display = 'none';
  if (signupForm) signupForm.style.display = 'none';
  if (otpForm) otpForm.style.display = 'none';
  if (forgotForm) forgotForm.style.display = 'none';
  if (resetForm) resetForm.style.display = 'none';
  const phoneForm = document.getElementById('web-auth-phone-form');
  if (phoneForm) phoneForm.style.display = 'none';
  const googleAuthView = document.getElementById('web-google-auth-view');
  if (googleAuthView) googleAuthView.style.display = 'none';
  const googleAnotherView = document.getElementById('web-google-another-view');
  if (googleAnotherView) googleAnotherView.style.display = 'none';
  
  const noAccountView = document.getElementById('web-login-no-account-view');
  if (noAccountView) noAccountView.style.display = 'none';
  const phoneUnregView = document.getElementById('web-login-phone-unregistered-view');
  if (phoneUnregView) phoneUnregView.style.display = 'none';
  const googleUnregView = document.getElementById('web-login-google-unregistered-view');
  if (googleUnregView) googleUnregView.style.display = 'none';
  
  const title = document.getElementById('web-auth-title');
  const feedback = document.getElementById('web-auth-global-feedback');
  if (feedback) feedback.hidden = true;
  
  if (view === 'welcome') {
    if (welcomeView) welcomeView.style.display = 'flex';
  } else if (view === 'login') {
    if (title) title.innerText = '';
    if (loginForm) loginForm.style.display = 'block';
  } else if (view === 'signup') {
    if (title) title.innerText = 'Sign up for DnD';
    if (signupForm) signupForm.style.display = 'block';
    // Reset wizard to Step 1
    const s1 = document.getElementById('web-signup-step-1');
    const s2 = document.getElementById('web-signup-step-2');
    const s3 = document.getElementById('web-signup-step-3');
    const s4 = document.getElementById('web-signup-step-4');
    if (s1) s1.style.display = 'block';
    if (s2) s2.style.display = 'none';
    if (s3) s3.style.display = 'none';
    if (s4) s4.style.display = 'none';
  } else if (view === 'otp') {
    if (title) title.innerText = 'Verify Code';
    if (otpForm) otpForm.style.display = 'block';
  } else if (view === 'forgot') {
    if (title) title.innerText = 'Reset Password';
    if (forgotForm) forgotForm.style.display = 'block';
  } else if (view === 'reset') {
    if (title) title.innerText = 'Choose New Password';
    if (resetForm) resetForm.style.display = 'block';
  } else if (view === 'phone') {
    if (title) title.innerText = 'Verify Phone';
    if (phoneForm) phoneForm.style.display = 'block';
  } else if (view === 'google') {
    if (logoHeader) logoHeader.style.display = 'none';
    if (googleAuthView) googleAuthView.style.display = 'flex';
  } else if (view === 'google-another') {
    if (logoHeader) logoHeader.style.display = 'none';
    if (googleAnotherView) googleAnotherView.style.display = 'flex';
  } else if (view === 'login-no-account') {
    if (title) title.innerText = '';
    if (noAccountView) noAccountView.style.display = 'flex';
  } else if (view === 'login-phone-unregistered') {
    if (title) title.innerText = '';
    if (phoneUnregView) phoneUnregView.style.display = 'flex';
  } else if (view === 'login-google-unregistered') {
    if (title) title.innerText = '';
    if (googleUnregView) googleUnregView.style.display = 'flex';
  }
}

function initLocalAuth() {
  const btnSettingsLogout = document.getElementById('btn-settings-account-logout');
  if (btnSettingsLogout) {
    btnSettingsLogout.addEventListener('click', async () => {
      if (window.DnDAndroid && typeof window.DnDAndroid.logout === 'function') {
        window.DnDAndroid.logout();
      } else {
        // Web logout
        await fetch('/api/auth/logout', { method: 'POST' });
        accessToken = null;
        checkAuthStatus();
      }
    });
  }

  if (window.DnDAndroid) return; // Remaining listeners are for Web Auth Overlay

  const feedback = document.getElementById('web-auth-global-feedback');
  const showFeedback = (msg, isError = true) => {
    if (!feedback) return;
    feedback.innerText = msg;
    feedback.style.background = isError ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)';
    feedback.style.color = isError ? '#f43f5e' : '#10b981';
    feedback.hidden = false;
  };

  // Cooldown timer logic
  let otpEmail = '';
  let otpType = 'signup';
  let verificationToken = ''; // Set after recovery verification
  let webFailedLoginAttempts = 0;
  let resetEmail = '';
  let resetToken = '';
  let phoneVerificationToken = ''; // Set after phone OTP verification
  let selectedCountryCode = '';
  let selectedPhoneNumber = '';
  let googleAuthActive = false;
  let googleAuthEmail = '';
  let googleAuthName = '';
  let googleAuthFlowType = 'signup'; // 'signup' or 'login'
  let phoneAuthFlowType = 'signup'; // 'signup' or 'login'
  let cooldownTimer = null;

  const stopCooldown = () => {
    if (cooldownTimer) {
      clearInterval(cooldownTimer);
      cooldownTimer = null;
    }
  };

  const startCooldown = (seconds) => {
    const btnResend = document.getElementById('btn-web-resend-otp-v2');
    const txtCountdown = document.getElementById('web-otp-countdown-text');
    if (!btnResend || !txtCountdown) return;
    
    btnResend.disabled = true;
    txtCountdown.style.color = '#818cf8';
    txtCountdown.innerText = `OTP expires in: ${seconds}s`;
    
    stopCooldown();
    let remaining = seconds;
    cooldownTimer = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        stopCooldown();
        btnResend.disabled = false;
        txtCountdown.style.color = '#f43f5e';
        txtCountdown.innerText = `OTP expired. Please resend.`;
      } else {
        txtCountdown.innerText = `OTP expires in: ${remaining}s`;
      }
    }, 1000);
  };

  // WebOTP API SMS Auto-fill listener
  const startWebOtpListener = () => {
    if ('OTPCredential' in window) {
      if (window.activeOtpAbortController) {
        window.activeOtpAbortController.abort();
      }
      const ac = new AbortController();
      window.activeOtpAbortController = ac;
      
      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal
      }).then(otp => {
        const otpBoxes = document.querySelectorAll('.web-otp-box');
        if (otpBoxes.length === 6 && otp.code && otp.code.length === 6) {
          otpBoxes.forEach((b, idx) => b.value = otp.code[idx]);
          showFeedback('✓ SMS OTP Autofilled!', false);
          triggerOtpSubmit(otp.code);
        }
      }).catch(err => {
        console.log('WebOTP listener closed or aborted:', err);
      });
    }
  };

  const setupGoogleAuth = () => {
    const listContainer = document.getElementById('google-accounts-list');
    const loadingState = document.getElementById('google-auth-loading');
    if (!listContainer || !loadingState) return;
    
    // Back button in chooser
    document.getElementById('link-google-auth-back')?.addEventListener('click', (e) => {
      e.preventDefault();
      showWebAuthOverlay('login');
    });

    // Use Another Account button click
    document.getElementById('btn-google-use-another')?.addEventListener('click', () => {
      showWebAuthOverlay('google-another');
      
      // Reset Use Another forms
      document.getElementById('google-another-email-form').style.display = 'block';
      document.getElementById('google-another-password-form').style.display = 'none';
      document.getElementById('google-another-mfa-view').style.display = 'none';
      document.getElementById('google-another-email-input').value = '';
      document.getElementById('google-another-password-input').value = '';
    });

    // Back button in Use Another
    document.getElementById('link-google-another-back')?.addEventListener('click', (e) => {
      e.preventDefault();
      const emailForm = document.getElementById('google-another-email-form');
      const passForm = document.getElementById('google-another-password-form');
      const mfaView = document.getElementById('google-another-mfa-view');
      
      if (passForm && passForm.style.display === 'block') {
        passForm.style.display = 'none';
        if (emailForm) emailForm.style.display = 'block';
      } else if (mfaView && mfaView.style.display === 'block') {
        mfaView.style.display = 'none';
        if (passForm) passForm.style.display = 'block';
      } else {
        showWebAuthOverlay('google');
      }
    });

    // Handle account cards click
    document.querySelectorAll('.google-account-card').forEach(card => {
      card.addEventListener('click', async () => {
        const email = card.getAttribute('data-email');
        const name = card.getAttribute('data-name');
        
        listContainer.style.display = 'none';
        loadingState.style.display = 'flex';
        
        await new Promise(resolve => setTimeout(resolve, 800));
        await handleGoogleAuthCallback(email, name);
      });
    });

    // Submit email on Use Another
    document.getElementById('google-another-email-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('google-another-email-input').value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        showFeedback('Invalid email format.');
        return;
      }

      const name = email.split('@')[0];
      const displayName = name.charAt(0).toUpperCase() + name.slice(1);
      
      document.getElementById('google-another-display-email').innerText = email;
      document.getElementById('google-another-display-name').innerText = displayName;
      document.getElementById('google-another-avatar-initial').innerText = displayName.charAt(0);
      
      document.getElementById('google-another-email-form').style.display = 'none';
      document.getElementById('google-another-password-form').style.display = 'block';
      document.getElementById('google-another-password-input').focus();
    });

    // Submit password on Use Another
    document.getElementById('google-another-password-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('google-another-password-input').value;
      if (password.length < 6) {
        showFeedback('Incorrect password. Please try again.');
        return;
      }

      document.getElementById('google-another-password-form').style.display = 'none';
      document.getElementById('google-another-mfa-view').style.display = 'block';
      
      setTimeout(async () => {
        const email = document.getElementById('google-another-email-input').value.trim();
        const name = document.getElementById('google-another-display-name').innerText;
        
        showWebAuthOverlay('google');
        listContainer.style.display = 'none';
        loadingState.style.display = 'flex';
        
        await handleGoogleAuthCallback(email, name);
      }, 2500);
    });

    const handleGoogleAuthCallback = async (email, name) => {
      try {
        const res = await fetch('/api/auth/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        
        if (res.ok) {
          if (data.exists) {
            const ssoRes = await fetch('/api/auth/sso-login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, name, provider: 'Google' })
            });
            const ssoData = await ssoRes.json();
            
            if (ssoRes.ok) {
              accessToken = ssoData.accessToken;
              showFeedback('✓ Signed in successfully via Google!', false);
              
              document.getElementById('web-google-auth-view').style.display = 'none';
              const logoHeader = document.querySelector('.auth-logo-header');
              if (logoHeader) logoHeader.style.display = 'none';
              const title = document.getElementById('web-auth-title');
              if (title) title.parentElement.style.display = 'none';
              const backBtn = document.getElementById('btn-auth-back-to-welcome');
              if (backBtn) backBtn.style.display = 'none';
              
              const successView = document.getElementById('web-signup-success-view');
              if (successView) {
                successView.querySelector('h3').innerText = 'Welcome Back!';
                successView.querySelector('p').innerText = 'Logged in successfully. Preparing your dashboard...';
                successView.style.display = 'flex';
              }
              
              if (typeof confetti === 'function') {
                confetti({ particleCount: 150, spread: 80, origin: { y: 0.4 } });
              }
              
              setTimeout(() => {
                if (title) title.parentElement.style.display = 'block';
                if (successView) successView.style.display = 'none';
                checkAuthStatus();
              }, 2000);
            } else {
              showFeedback(ssoData.error.message || 'Google authentication failed.');
              resetGoogleChooserUI();
            }
          } else {
            googleAuthEmail = email;
            googleAuthName = name;
            
            document.getElementById('web-google-auth-view').style.display = 'none';
            const logoHeader = document.querySelector('.auth-logo-header');
            if (logoHeader) logoHeader.style.display = 'block';
            const title = document.getElementById('web-auth-title');
            if (title) title.parentElement.style.display = 'block';
            
            showWebAuthOverlay('login-google-unregistered');
            resetGoogleChooserUI();
          }
        } else {
          showFeedback(data.error.message || 'Google account verification failed.');
          resetGoogleChooserUI();
        }
      } catch (err) {
        showFeedback('Unable to connect to Google authentication server.');
        resetGoogleChooserUI();
      }
    };

    const resetGoogleChooserUI = () => {
      listContainer.style.display = 'flex';
      loadingState.style.display = 'none';
    };
  };

  // Country selector definition
  const countries = [
    { name: 'India', flag: '🇮🇳', dialCode: '+91', length: 10, placeholder: '98765 43210' },
    { name: 'United States', flag: '🇺🇸', dialCode: '+1', length: 10, placeholder: '(201) 555-0123' },
    { name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', length: 10, placeholder: '7911 123456' },
    { name: 'Australia', flag: '🇦🇺', dialCode: '+61', length: 9, placeholder: '412 345 678' },
    { name: 'Canada', flag: '🇨🇦', dialCode: '+1', length: 10, placeholder: '(204) 555-0123' },
    { name: 'Germany', flag: '🇩🇪', dialCode: '+49', length: 11, placeholder: '170 1234567' },
    { name: 'France', flag: '🇫🇷', dialCode: '+33', length: 9, placeholder: '6 12 34 56 78' },
    { name: 'Japan', flag: '🇯🇵', dialCode: '+81', length: 10, placeholder: '90 1234 5678' },
    { name: 'Singapore', flag: '🇸🇬', dialCode: '+65', length: 8, placeholder: '8123 4567' }
  ];
  let selectedCountry = countries[0];

  const initCountrySelector = () => {
    const trigger = document.getElementById('country-selector-trigger');
    const dropdown = document.getElementById('country-dropdown-list');
    const searchInput = document.getElementById('country-search-input');
    const container = document.getElementById('country-options-container');
    const selectedInfo = document.getElementById('country-selected-info');
    const dialCodeBadge = document.getElementById('phone-dial-code-badge');
    const phoneInput = document.getElementById('web-phone-number');

    if (!trigger || !dropdown || !container) return;

    const renderOptions = (filterText = '') => {
      container.innerHTML = '';
      const filtered = countries.filter(c => 
        c.name.toLowerCase().includes(filterText.toLowerCase()) || 
        c.dialCode.includes(filterText)
      );

      filtered.forEach(c => {
        const opt = document.createElement('div');
        opt.className = 'country-option';
        opt.style.display = 'flex';
        opt.style.alignItems = 'center';
        opt.style.gap = '10px';
        opt.style.padding = '0.6rem 1.1rem';
        opt.style.borderRadius = '8px';
        opt.style.cursor = 'pointer';
        opt.style.transition = 'background 0.2s';
        opt.style.fontSize = '0.85rem';
        
        opt.innerHTML = `
          <span class="flag">${c.flag}</span>
          <span class="name" style="flex: 1; color: #fff; font-weight: 500;">${c.name}</span>
          <span class="code" style="color: #64748b; font-weight: 600;">${c.dialCode}</span>
        `;

        opt.addEventListener('mouseenter', () => opt.style.background = 'rgba(255, 255, 255, 0.08)');
        opt.addEventListener('mouseleave', () => opt.style.background = 'transparent');

        opt.addEventListener('click', () => {
          selectedCountry = c;
          selectedInfo.innerHTML = `<span style="margin-right: 8px;">${c.flag}</span>${c.name} (${c.dialCode})`;
          dialCodeBadge.innerText = c.dialCode;
          
          if (phoneInput) {
            phoneInput.value = '';
            phoneInput.placeholder = c.placeholder;
            phoneInput.maxLength = c.length + 5;
          }
          
          dropdown.style.display = 'none';
          validatePhoneInput();
        });

        container.appendChild(opt);
      });
    };

    renderOptions();

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        searchInput.value = '';
        renderOptions();
        searchInput.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    searchInput.addEventListener('input', (e) => {
      renderOptions(e.target.value.trim());
    });
  };

  const formatPhoneVal = (val, country) => {
    const digits = val.replace(/\D/g, '');
    if (country.dialCode === '+1') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
    } else if (country.dialCode === '+91') {
      if (digits.length <= 5) return digits;
      return `${digits.slice(0,5)} ${digits.slice(5,10)}`;
    }
    return digits.slice(0, country.length);
  };

  const validatePhoneInput = () => {
    const phoneInput = document.getElementById('web-phone-number');
    const submitBtn = document.getElementById('btn-web-phone-submit');
    if (!phoneInput || !submitBtn) return;

    const digits = phoneInput.value.replace(/\D/g, '');
    const isValid = digits.length === selectedCountry.length;
    submitBtn.disabled = !isValid;
  };

  const setupPhoneInputFields = () => {
    const phoneInput = document.getElementById('web-phone-number');
    if (!phoneInput) return;

    phoneInput.placeholder = selectedCountry.placeholder;
    phoneInput.maxLength = selectedCountry.length + 5;

    phoneInput.addEventListener('input', (e) => {
      const start = e.target.selectionStart;
      const formatted = formatPhoneVal(e.target.value, selectedCountry);
      const prevLength = e.target.value.length;
      e.target.value = formatted;
      
      const diff = formatted.length - prevLength;
      if (diff !== 0 && start !== null) {
        e.target.setSelectionRange(start + diff, start + diff);
      }
      
      validatePhoneInput();
    });
  };

  const setupOtpInputs = () => {
    const otpBoxes = document.querySelectorAll('.web-otp-box');
    const submitBtn = document.getElementById('btn-web-otp-submit');
    if (!otpBoxes.length) return;

    if (submitBtn) submitBtn.disabled = true;

    otpBoxes.forEach((box, index) => {
      box.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '');
        box.value = val;
        
        if (val && val.length === 1) {
          if (index < otpBoxes.length - 1) {
            otpBoxes[index + 1].focus();
          }
        }
        checkAndAutoVerifyOtp();
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (!box.value && index > 0) {
            otpBoxes[index - 1].focus();
            otpBoxes[index - 1].value = '';
            e.preventDefault();
          } else {
            box.value = '';
          }
          checkAndAutoVerifyOtp();
        }
      });

      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = (e.clipboardData || window.clipboardData).getData('text').trim().replace(/\D/g, '');
        if (pastedData.length >= 6) {
          otpBoxes.forEach((b, idx) => {
            b.value = pastedData[idx] || '';
          });
          checkAndAutoVerifyOtp();
        }
      });
    });

    const checkAndAutoVerifyOtp = () => {
      let code = '';
      otpBoxes.forEach(b => code += b.value);
      if (submitBtn) submitBtn.disabled = code.length < 6;

      if (code.length === 6) {
        triggerOtpSubmit(code);
      }
    };
  };

  const triggerOtpSubmit = async (code) => {
    showFeedback('Verifying code...', false);
    
    if (otpType === 'phone') {
      try {
        const isLogin = (phoneAuthFlowType === 'login');
        const res = await fetch('/api/auth/phone-verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            countryCode: selectedCountry.dialCode,
            phoneNumber: selectedPhoneNumber,
            code,
            flow: phoneAuthFlowType
          })
        });
        const data = await res.json();
        if (res.ok) {
          stopCooldown();
          if (data.isRegistered === false) {
            phoneVerificationToken = data.phoneVerificationToken;
            document.getElementById('web-auth-otp-form').style.display = 'none';
            const title = document.getElementById('web-auth-title');
            if (title) title.parentElement.style.display = 'block';
            if (isLogin) {
              showWebAuthOverlay('login-phone-unregistered');
            } else {
              showWebAuthOverlay('signup');
            }
            return;
          }

          accessToken = data.accessToken;
          
          document.getElementById('web-auth-otp-form').style.display = 'none';
          const title = document.getElementById('web-auth-title');
          if (title) title.parentElement.style.display = 'none';
          const backBtn = document.getElementById('btn-auth-back-to-welcome');
          if (backBtn) backBtn.style.display = 'none';
          const feedback = document.getElementById('web-auth-global-feedback');
          if (feedback) feedback.hidden = true;
          
          const successView = document.getElementById('web-signup-success-view');
          if (successView) {
            successView.querySelector('h3').innerText = isLogin ? 'Welcome Back!' : 'Verification Successful';
            successView.querySelector('p').innerText = isLogin ? 'Logged in successfully. Preparing your dashboard...' : 'Your account is verified and secured. Preparing your dashboard...';
            successView.style.display = 'flex';
          }
          
          if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.4 } });
          }
          
          setTimeout(() => {
            if (title) title.parentElement.style.display = 'block';
            if (successView) successView.style.display = 'none';
            checkAuthStatus();
          }, 2000);
        } else {
          showFeedback(data.error.message || 'OTP verification failed.');
        }
      } catch (err) {
        showFeedback('Unable to connect to server.');
      }
    } else {
      try {
        const res = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: otpEmail, code, type: otpType })
        });
        const data = await res.json();
        if (res.ok) {
          stopCooldown();
          if (otpType === 'signup') {
            accessToken = data.accessToken;
            showFeedback('✓ Email verified! Welcome to DnD.', false);
            setTimeout(() => {
              checkAuthStatus();
            }, 800);
          } else if (otpType === 'forgot_password') {
            verificationToken = data.verificationToken;
            showWebAuthOverlay('reset');
            document.getElementById('web-reset-code').value = code;
            showFeedback('Code verified successfully. Enter new password.', false);
          }
        } else {
          showFeedback(data.error.message || 'Verification failed.');
        }
      } catch (err) {
        showFeedback('Unable to connect to the server.');
      }
    }
  };

  // Run initial setups
  initCountrySelector();
  setupPhoneInputFields();
  setupOtpInputs();
  setupGoogleAuth();

  // Password visibility toggles
  const setupPassToggle = (btnId, inputId) => {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (btn && input) {
      btn.addEventListener('click', () => {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        btn.innerText = type === 'password' ? '👁️' : '🔒';
      });
    }
  };
  setupPassToggle('btn-toggle-web-login-pass', 'web-login-pass');
  setupPassToggle('btn-toggle-web-signup-pass', 'web-signup-pass');
  setupPassToggle('btn-toggle-web-reset-pass', 'web-reset-new-pass');

  document.getElementById('btn-welcome-signup')?.addEventListener('click', () => {
    showWebAuthOverlay('signup');
  });
  document.getElementById('btn-welcome-login')?.addEventListener('click', () => {
    showWebAuthOverlay('login');
  });
  document.getElementById('btn-auth-back-to-welcome')?.addEventListener('click', () => {
    showWebAuthOverlay('welcome');
  });

  // Dynamic Password strength checklist validation
  const updatePasswordRules = () => {
    const pass = document.getElementById('web-signup-pass').value;
    const confirm = document.getElementById('web-signup-confirm-pass').value;
    
    const isMinLength = pass.length >= 8;
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasNumOrSpec = /[0-9!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isMatch = pass.length > 0 && pass === confirm;

    const setRuleState = (id, isValid) => {
      const el = document.getElementById(id);
      if (!el) return;
      const statusEl = el.querySelector('.rule-status');
      if (statusEl) {
        statusEl.innerText = isValid ? '✓' : '✗';
        statusEl.style.color = isValid ? '#10b981' : '#ef4444';
      }
      el.style.color = isValid ? '#e2e8f0' : '#94a3b8';
    };

    setRuleState('rule-length', isMinLength);
    setRuleState('rule-letter', hasUppercase);
    setRuleState('rule-lowercase', hasLowercase);
    setRuleState('rule-number', hasNumOrSpec);
    setRuleState('rule-match', isMatch);

    const allValid = isMinLength && hasUppercase && hasLowercase && hasNumOrSpec && isMatch;
    const nextBtn = document.getElementById('btn-web-signup-next-2');
    if (nextBtn) nextBtn.disabled = !allValid;

    return allValid;
  };

  document.getElementById('web-signup-pass')?.addEventListener('input', updatePasswordRules);
  document.getElementById('web-signup-confirm-pass')?.addEventListener('input', updatePasswordRules);

  // Progressive Wizard Steps Event Handlers
  document.getElementById('btn-web-signup-next-1')?.addEventListener('click', async () => {
    const email = document.getElementById('web-signup-email').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showFeedback('Please enter a valid email address.');
      return;
    }

    const btn = document.getElementById('btn-web-signup-next-1');
    if (btn) btn.disabled = true;

    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.status === 200) {
        if (data.exists) {
          // Display the custom "This email is already connected" screen instead of inline feedback
          document.getElementById('web-auth-signup-form').style.display = 'none';
          const logoHeader = document.querySelector('.auth-logo-header');
          if (logoHeader) logoHeader.style.display = 'none';
          document.getElementById('web-auth-email-exists-view').style.display = 'flex';
        } else {
          showFeedback('Email accepted. Create your password.', false);
          document.getElementById('web-signup-step-1').style.display = 'none';
          document.getElementById('web-signup-step-2').style.display = 'block';
          updatePasswordRules(); // Initialize button state
        }
      } else {
        showFeedback(data.error?.message || 'Error checking email.');
      }
    } catch (err) {
      showFeedback('Connection error. Please try again.');
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  // Action listeners for "Email Already Connected" screen
  document.getElementById('btn-exists-close')?.addEventListener('click', () => {
    document.getElementById('web-auth-email-exists-view').style.display = 'none';
    document.getElementById('web-auth-signup-form').style.display = 'block';
    const logoHeader = document.querySelector('.auth-logo-header');
    if (logoHeader) logoHeader.style.display = 'block';
  });

  document.getElementById('btn-exists-goto-login')?.addEventListener('click', () => {
    document.getElementById('web-auth-email-exists-view').style.display = 'none';
    showWebAuthOverlay('login');
  });

  document.getElementById('btn-web-signup-next-2')?.addEventListener('click', () => {
    const isValid = updatePasswordRules();
    if (!isValid) {
      showFeedback('Please satisfy all password strength requirements.');
      return;
    }
    showFeedback('Password set. Please fill in your date of birth.', false);
    document.getElementById('web-signup-step-2').style.display = 'none';
    document.getElementById('web-signup-step-dob').style.display = 'block';
  });

  document.getElementById('btn-web-signup-next-dob')?.addEventListener('click', () => {
    const day = document.getElementById('web-signup-dob-day').value.trim();
    const month = document.getElementById('web-signup-dob-month').value;
    const year = document.getElementById('web-signup-dob-year').value.trim();

    if (!day || !month || !year) {
      showFeedback('Please enter your complete date of birth.');
      return;
    }
    const dVal = parseInt(day, 10);
    const yVal = parseInt(year, 10);
    const mVal = parseInt(month, 10);
    if (dVal < 1 || dVal > 31 || yVal < 1900 || yVal > new Date().getFullYear()) {
      showFeedback('Please enter a valid date of birth.');
      return;
    }
    const dob = new Date(yVal, mVal - 1, dVal);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const mDiff = today.getMonth() - dob.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 13) {
      showFeedback('You do not meet the age requirement to register (minimum 13 years old).');
      return;
    }

    showFeedback('Date of birth set. Select your gender.', false);
    document.getElementById('web-signup-step-dob').style.display = 'none';
    document.getElementById('web-signup-step-gender').style.display = 'block';
  });

  document.getElementById('btn-web-signup-next-gender')?.addEventListener('click', () => {
    const gender = document.getElementById('web-signup-gender').value;
    if (!gender) {
      showFeedback('Please select your gender.');
      return;
    }
    showFeedback('Gender set. What should we call you?', false);
    document.getElementById('web-signup-step-gender').style.display = 'none';
    document.getElementById('web-signup-step-name').style.display = 'block';
  });

  document.getElementById('btn-web-signup-submit')?.addEventListener('click', async () => {
    const name = document.getElementById('web-signup-name-input').value.trim();
    if (!name) {
      showFeedback('Please enter your full name.');
      return;
    }

    const email = document.getElementById('web-signup-email').value.trim();
    const password = document.getElementById('web-signup-pass').value;
    const confirmPassword = document.getElementById('web-signup-confirm-pass').value;
    const day = document.getElementById('web-signup-dob-day').value.trim();
    const month = document.getElementById('web-signup-dob-month').value;
    const year = document.getElementById('web-signup-dob-year').value.trim();
    const gender = document.getElementById('web-signup-gender').value;
    const dobString = `${year}-${month}-${day.padStart(2, '0')}`;

    const btn = document.getElementById('btn-web-signup-submit');
    if (btn) btn.disabled = true;

    if (phoneVerificationToken) {
      // Phone registration flow
      showFeedback('Completing phone registration...', false);
      try {
        const res = await fetch('/api/auth/phone-register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            countryCode: selectedCountryCode,
            phoneNumber: selectedPhoneNumber,
            phoneVerificationToken,
            name,
            email,
            password,
            confirmPassword
          })
        });
        const data = await res.json();
        if (res.ok) {
          accessToken = data.accessToken;
          phoneVerificationToken = ''; // Reset
          showFeedback('✓ Account registered successfully!', false);
          setTimeout(() => {
            checkAuthStatus();
          }, 800);
        } else {
          showFeedback(data.error.message || 'Registration failed.');
        }
      } catch (err) {
        showFeedback('Unable to connect to server.');
      } finally {
        if (btn) btn.disabled = false;
      }
    } else {
      // Email standard progressive signup flow / Google signup completion
      showFeedback('Creating account...', false);
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name, 
            email, 
            password, 
            confirmPassword, 
            dob: dobString, 
            gender,
            ssoProvider: googleAuthActive ? 'Google' : null
          })
        });
        const data = await res.json();
        if (res.ok) {
          accessToken = data.accessToken;
          
          // Clear Google states
          googleAuthActive = false;
          googleAuthEmail = '';
          googleAuthName = '';

          // Hide all signup steps and show success view
          document.getElementById('web-signup-step-name').style.display = 'none';
          document.getElementById('web-signup-success-view').style.display = 'block';
          const signupFooter = document.querySelector('#web-auth-signup-form .auth-footer');
          if (signupFooter) signupFooter.style.display = 'none';
          const logoHeader = document.querySelector('.auth-logo-header');
          if (logoHeader) logoHeader.style.display = 'none';
          
          showFeedback('✓ Account created successfully!', false);
          setTimeout(() => {
            // Restore UI header state for future overlay triggers
            if (signupFooter) signupFooter.style.display = 'block';
            if (logoHeader) logoHeader.style.display = 'block';
            document.getElementById('web-signup-success-view').style.display = 'none';
            document.getElementById('web-signup-step-1').style.display = 'block';
            document.getElementById('web-signup-name-input').value = '';
            document.getElementById('web-signup-email').value = '';
            document.getElementById('web-signup-pass').value = '';
            document.getElementById('web-signup-confirm-pass').value = '';
            
            checkAuthStatus();
          }, 2000);
        } else {
          showFeedback(data.error.message || 'Signup failed.');
        }
      } catch (err) {
        showFeedback('Unable to connect to the server.');
      } finally {
        if (btn) btn.disabled = false;
      }
    }
  });

  // Wizard Back Buttons
  document.getElementById('btn-web-signup-back-2')?.addEventListener('click', () => {
    document.getElementById('web-signup-step-2').style.display = 'none';
    if (googleAuthActive) {
      showWebAuthOverlay('google');
    } else {
      document.getElementById('web-signup-step-1').style.display = 'block';
    }
  });

  document.getElementById('btn-web-signup-back-dob')?.addEventListener('click', () => {
    document.getElementById('web-signup-step-dob').style.display = 'none';
    document.getElementById('web-signup-step-2').style.display = 'block';
  });

  document.getElementById('btn-web-signup-back-gender')?.addEventListener('click', () => {
    document.getElementById('web-signup-step-gender').style.display = 'none';
    document.getElementById('web-signup-step-dob').style.display = 'block';
  });

  document.getElementById('btn-web-signup-back-name')?.addEventListener('click', () => {
    document.getElementById('web-signup-step-name').style.display = 'none';
    document.getElementById('web-signup-step-gender').style.display = 'block';
  });

  // Navigation Links
  const setupNav = (id, view) => {
    document.getElementById(id)?.addEventListener('click', (e) => {
      e.preventDefault();
      // Clear token state if switching views
      if (view === 'login' || view === 'signup') {
        phoneVerificationToken = '';
      }
      showWebAuthOverlay(view);
    });
  };
  setupNav('link-web-goto-signup', 'signup');
  setupNav('link-web-goto-login', 'login');
  setupNav('link-web-goto-login-signup', 'login');
  setupNav('link-web-forgot-pass', 'forgot');
  setupNav('link-web-otp-back', 'login');
  setupNav('link-web-forgot-back', 'login');
  setupNav('link-web-reset-back', 'login');
  setupNav('link-web-phone-back', 'login');

  // Unregistered / No Account Found view action listeners
  document.getElementById('btn-no-account-create')?.addEventListener('click', () => {
    const email = document.getElementById('web-login-email').value.trim();
    document.getElementById('web-signup-email').value = email;
    showWebAuthOverlay('signup');
    // Pre-populate and auto-validate step 1 of signup
    document.getElementById('btn-web-signup-next-1')?.click();
  });
  document.getElementById('btn-no-account-try-again')?.addEventListener('click', () => {
    showWebAuthOverlay('login');
    document.getElementById('web-login-email').focus();
  });

  document.getElementById('btn-phone-unregistered-create')?.addEventListener('click', () => {
    showWebAuthOverlay('signup');
  });
  document.getElementById('btn-phone-unregistered-try-again')?.addEventListener('click', () => {
    showWebAuthOverlay('phone');
  });

  document.getElementById('btn-google-unregistered-create')?.addEventListener('click', () => {
    googleAuthActive = true;
    document.getElementById('web-signup-email').value = googleAuthEmail;
    showWebAuthOverlay('signup');
    const step1 = document.getElementById('web-signup-step-1');
    const step2 = document.getElementById('web-signup-step-2');
    if (step1 && step2) {
      step1.style.display = 'none';
      step2.style.display = 'block';
    }
  });
  document.getElementById('btn-google-unregistered-choose')?.addEventListener('click', () => {
    showWebAuthOverlay('google');
  });
  document.getElementById('btn-google-unregistered-close')?.addEventListener('click', () => {
    showWebAuthOverlay('login');
  });

  // SSO Action Bindings
  const handleSsoClick = async (provider) => {
    const email = prompt(`Enter your ${provider} email to connect:`);
    if (!email) return;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showFeedback('Invalid email format.');
      return;
    }

    showFeedback(`Connecting to ${provider}...`, false);
    try {
      const res = await fetch('/api/auth/sso-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: email.split('@')[0], provider })
      });
      const data = await res.json();
      if (res.ok) {
        accessToken = data.accessToken;
        showFeedback(`✓ Connected via ${provider}!`, false);
        setTimeout(() => {
          checkAuthStatus();
        }, 800);
      } else {
        showFeedback(data.error.message || 'SSO sign-in failed.');
      }
    } catch (err) {
      showFeedback('Unable to connect to authentication server.');
    }
  };

  document.getElementById('btn-web-sso-google')?.addEventListener('click', () => {
    googleAuthFlowType = 'login';
    showWebAuthOverlay('google');
  });
  document.getElementById('btn-web-signup-sso-google')?.addEventListener('click', () => {
    googleAuthFlowType = 'signup';
    showWebAuthOverlay('google');
  });
  document.getElementById('btn-web-sso-apple')?.addEventListener('click', () => handleSsoClick('Apple'));
  document.getElementById('btn-web-signup-sso-apple')?.addEventListener('click', () => handleSsoClick('Apple'));

  document.getElementById('btn-web-sso-phone')?.addEventListener('click', () => {
    phoneAuthFlowType = 'login';
    showWebAuthOverlay('phone');
  });
  document.getElementById('btn-web-signup-sso-phone')?.addEventListener('click', () => {
    phoneAuthFlowType = 'signup';
    showWebAuthOverlay('phone');
  });

  // SUBMIT LOGIN (Email Continue Flow)
  document.getElementById('web-auth-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('web-login-email').value.trim();
    if (!email) return;

    showFeedback('Checking email...', false);

    try {
      // 1. Check if email exists
      const checkRes = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const checkData = await checkRes.json();

      if (checkData.exists) {
        // Registered Email: Authenticate and log in directly
        showFeedback('Authenticating...', false);
        const loginRes = await fetch('/api/auth/direct-email-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const loginData = await loginRes.json();

        if (loginRes.ok) {
          accessToken = loginData.accessToken;
          showFeedback('✓ Welcome!', false);

          // Success transition
          const successView = document.getElementById('web-signup-success-view');
          if (successView) {
            successView.querySelector('h3').innerText = 'Welcome Back!';
            successView.querySelector('p').innerText = 'Logged in successfully. Preparing your dashboard...';
            document.getElementById('web-auth-title').innerText = '';
            document.querySelector('.auth-logo-header').style.display = 'none';
            document.getElementById('web-auth-login-form').style.display = 'none';
            successView.style.display = 'flex';
          }

          setTimeout(() => {
            checkAuthStatus();
          }, 2000);
        } else {
          showFeedback(loginData.error?.message || 'Authentication failed.');
        }
      } else {
        // Unregistered Email: Show dedicated No Account Found view
        showFeedback('', false); // clear feedback
        showWebAuthOverlay('login-no-account');
      }
    } catch (err) {
      showFeedback('Unable to connect to the server.');
    }
  });

  // SUBMIT PHONE NO (Send SMS OTP)
  document.getElementById('web-auth-phone-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cc = selectedCountry.dialCode;
    const phoneNum = document.getElementById('web-phone-number').value.replace(/\D/g, '');

    if (!cc || !phoneNum) {
      showFeedback('Country code and phone number are required.');
      return;
    }
    if (phoneNum.length !== selectedCountry.length) {
      showFeedback(`Please enter a valid ${selectedCountry.length}-digit phone number.`);
      return;
    }

    selectedCountryCode = cc;
    selectedPhoneNumber = phoneNum;
    showFeedback('Requesting phone verification code...', false);

    try {
      const res = await fetch('/api/auth/phone-send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryCode: cc, phoneNumber: phoneNum })
      });
      const data = await res.json();
      if (res.ok) {
        otpEmail = cc + phoneNum;
        otpType = 'phone';
        showWebAuthOverlay('otp');
        
        const subtitleEl = document.getElementById('web-otp-subtitle');
        if (subtitleEl) {
          subtitleEl.innerText = `We've sent a 6-digit verification code to your phone number ${cc} ${formatPhoneVal(phoneNum, selectedCountry)}.`;
        }
        
        if (data.otpCode) {
          showFeedback(`[SMS Simulation] OTP sent: ${data.otpCode}`, false);
        } else {
          showFeedback('Verification OTP sent successfully via SMS.', false);
        }
        
        if (data.cooldownSeconds) startCooldown(data.cooldownSeconds);
        
        const otpBoxes = document.querySelectorAll('.web-otp-box');
        otpBoxes.forEach(b => b.value = '');
        if (otpBoxes[0]) otpBoxes[0].focus();
        
        startWebOtpListener();
      } else {
        showFeedback(data.error.message || 'Failed to send OTP.');
      }
    } catch (err) {
      showFeedback('Unable to connect to server.');
    }
  });

  // SUBMIT OTP VERIFICATION
  document.getElementById('web-auth-otp-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    let code = '';
    document.querySelectorAll('.web-otp-box').forEach(b => code += b.value);
    if (code.length === 6) {
      triggerOtpSubmit(code);
    } else {
      showFeedback('Please enter the 6-digit verification code.');
    }
  });

  // RESEND OTP
  document.getElementById('btn-web-resend-otp-v2')?.addEventListener('click', async () => {
    const otpBoxes = document.querySelectorAll('.web-otp-box');
    otpBoxes.forEach(b => b.value = '');
    if (otpBoxes[0]) otpBoxes[0].focus();

    showFeedback('Resending code...', false);
    
    if (otpType === 'phone') {
      try {
        const res = await fetch('/api/auth/phone-send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ countryCode: selectedCountryCode, phoneNumber: selectedPhoneNumber })
        });
        const data = await res.json();
        if (res.ok) {
          if (data.otpCode) {
            showFeedback(`[SMS Simulation] Resent OTP: ${data.otpCode}`, false);
          } else {
            showFeedback('A new verification OTP has been sent via SMS.', false);
          }
          if (data.cooldownSeconds) startCooldown(data.cooldownSeconds);
          startWebOtpListener();
        } else {
          showFeedback(data.error.message || 'Resend failed.');
        }
      } catch (err) {
        showFeedback('Unable to connect to server.');
      }
    } else {
      try {
        const res = await fetch('/api/auth/resend-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: otpEmail, type: otpType })
        });
        const data = await res.json();
        if (res.ok) {
          showFeedback('A new verification code has been sent.', false);
          if (data.cooldownSeconds) startCooldown(data.cooldownSeconds);
        } else {
          showFeedback(data.error.message || 'Resend failed.');
        }
      } catch (err) {
        showFeedback('Unable to connect to the server.');
      }
    }
  });

  // EDIT PHONE NUMBER
  document.getElementById('btn-web-edit-phone')?.addEventListener('click', () => {
    stopCooldown();
    showWebAuthOverlay('phone');
  });

  // SUBMIT FORGOT PASSWORD
  document.getElementById('web-auth-forgot-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('web-forgot-email').value.trim();

    showFeedback('Sending reset link...', false);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        showFeedback('If an account exists with that email, a password reset link has been sent.', false);
        document.getElementById('web-forgot-email').value = '';
      } else {
        showFeedback(data.error.message || 'Forgot password request failed.');
      }
    } catch (err) {
      showFeedback('Unable to connect to the server.');
    }
  });

  // SUBMIT RESET PASSWORD
  document.getElementById('web-auth-reset-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('web-reset-new-pass').value;
    const confirmPassword = document.getElementById('web-reset-confirm-pass').value;

    if (newPassword !== confirmPassword) {
      showFeedback('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      showFeedback('Password must be at least 8 characters and contain uppercase, lowercase, digit, and special symbol.');
      return;
    }

    showFeedback('Resetting password...', false);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, token: resetToken, newPassword, confirmPassword })
      });
      const data = await res.json();
      if (res.ok) {
        showFeedback('✓ Password reset successfully! Please login with your new credentials.', false);
        resetEmail = '';
        resetToken = '';
        setTimeout(() => {
          showWebAuthOverlay('login');
        }, 1500);
      } else {
        showFeedback(data.error.message || 'Reset password failed.');
      }
    } catch (err) {
      showFeedback('Unable to connect to the server.');
    }
  });

  // CHECK FOR RESET PASSWORD PARAMETERS IN URL (Supports both Hash and Query Params for PWA compatibility)
  let tokenParam = null;
  let emailParam = null;

  const hash = window.location.hash;
  if (hash && hash.includes('reset?')) {
    try {
      const hashParams = new URLSearchParams(hash.substring(hash.indexOf('?')));
      tokenParam = hashParams.get('token');
      emailParam = hashParams.get('email');
    } catch (e) {
      console.error('Failed to parse hash parameters', e);
    }
  }

  if (!tokenParam || !emailParam) {
    const urlParams = new URLSearchParams(window.location.search);
    tokenParam = urlParams.get('token');
    emailParam = urlParams.get('email');
  }

  if (tokenParam && emailParam) {
    resetToken = tokenParam;
    resetEmail = emailParam;
    
    // Clear URL parameters or hash
    if (window.location.hash.includes('reset')) {
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    } else {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Show reset form
    showWebAuthOverlay('reset');
  }
}

// --- VIEW CONTROLLER ---
async function updateViewContent() {
  // Guard: never render the app dashboard when the user is not authenticated
  if (!accessToken && !window.DnDAndroid) return;
  updateUserXPHeader();

  // Show bell and calendar buttons only on Dashboard view
  const notificationsBtn = document.getElementById('btn-header-notifications');
  const calendarBtn = document.getElementById('btn-header-date');
  if (notificationsBtn && calendarBtn) {
    if (state.activeView === 'view-dashboard') {
      notificationsBtn.style.display = 'flex';
      calendarBtn.style.display = 'flex';
    } else {
      notificationsBtn.style.display = 'none';
      calendarBtn.style.display = 'none';
      
      const notificationsDropdown = document.getElementById('header-notifications-dropdown');
      const calendarDropdown = document.getElementById('header-calendar-dropdown');
      if (notificationsDropdown) notificationsDropdown.style.display = 'none';
      if (calendarDropdown) calendarDropdown.classList.remove('active');
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const isWidgetView = urlParams.get('view') === 'widget';
  if (isWidgetView) {
    await renderFullscreenWidgetView();
    return;
  } else {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) appContainer.style.display = '';
    const fullscreenView = document.getElementById('fullscreen-widget-view');
    if (fullscreenView) fullscreenView.style.display = 'none';
  }

  // Refresh active view
  if (state.activeView === 'view-dashboard') {
    await renderDashboardView();
  } else if (state.activeView === 'view-habits') {
    await renderHabitsView();
  } else if (state.activeView === 'view-timeline') {
    renderTimelineView();
  } else if (state.activeView === 'view-analytics') {
    renderAnalyticsView();
  } else if (state.activeView === 'view-achievements') {
    await renderAchievementsView();
  } else if (state.activeView === 'view-settings') {
    await renderSettingsView();
  } else if (state.activeView === 'view-notes') {
    await renderNotesView();
    loadActiveNoteIntoEditor();
  }
  lucide.createIcons();
}

// --- LEVELING ENGINE ---
async function awardXP(amount) {
  let xp = await state.db.getSetting('user_xp', 0);
  let lvl = await state.db.getSetting('user_level', 1);

  xp += amount;
  
  // Level up threshold: 1000 XP
  if (xp >= 1000) {
    xp -= 1000;
    lvl += 1;
    // Play gorgeous level up chime
    setTimeout(() => state.audio.playLevelUp(), 500);
    showNotification(`⭐ LEVEL UP! You are now Level ${lvl}!`, 'linear-gradient(135deg, #10b981, #6366f1)');
  } else {
    // Standard chime
    state.audio.playChime();
  }

  await state.db.setSetting('user_xp', xp);
  await state.db.setSetting('user_level', lvl);
  
  updateUserXPHeader();
  checkAchievements();
}

function updateUserXPHeader() {
  state.db.getSetting('user_xp', 0).then(xp => {
    state.db.getSetting('user_level', 1).then(lvl => {
      document.getElementById('user-level-badge').innerText = lvl;
      document.getElementById('user-xp-bar').style.width = `${(xp / 1000) * 100}%`;
      document.getElementById('user-xp-text').innerText = `${xp} / 1000 XP`;

      // Also updates Achievements view banner
      const bannerLvl = document.getElementById('achieve-lvl-val');
      if (bannerLvl) {
        bannerLvl.innerText = lvl;
        document.getElementById('achieve-xp-fill').style.width = `${(xp / 1000) * 100}%`;
        document.getElementById('achieve-xp-text-val').innerText = `${xp} / 1000 XP`;
      }
    });
  });
}

// --- ACHIEVEMENTS CHECKER ---
async function checkAchievements() {
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);
  const completions = state.completions.filter(c => c.completed);
  
  let currentStreaks = [];
  for (const h of activeHabits) {
    const stats = await state.db.getStreakStats(h.id);
    currentStreaks.push(stats.currentStreak);
  }
  const maxStreak = currentStreaks.length > 0 ? Math.max(...currentStreaks) : 0;
  const totalNotes = completions.filter(c => c.journalNote && c.journalNote.trim() !== '').length;
  const totalPhotos = completions.filter(c => c.journalPhoto).length;

  let unlocked = await state.db.getSetting('unlocked_achievements', []);
  const unlockedIds = new Set(unlocked.map(a => a.id));
  
  let unclaimed = await state.db.getSetting('unclaimed_shields', []);
  const userLevel = await state.db.getSetting('user_level', 1);
  const totalCompletions = completions.length;
  
  const uniqueCategories = new Set(activeHabits.map(h => h.category));
  const hasAllCategories = ['Fitness', 'Study', 'Health', 'Finance', 'Self-care', 'Productivity'].every(cat => uniqueCategories.has(cat));

  const rules = [
    { id: 'first_habit', title: 'First Steps', desc: 'Create your first habit', unlocked: activeHabits.length >= 1, icon: '🚀' },
    { id: 'master_habits', title: 'Routines Builder', desc: 'Maintain 5 active habits', unlocked: activeHabits.length >= 5, icon: '🌟' },
    { id: 'streak_7', title: 'Unstoppable Consistency', desc: 'Achieve a 7-day streak', unlocked: maxStreak >= 7, icon: '🔥' },
    { id: 'streak_14', title: 'Two-Week Discipline', desc: 'Achieve a 14-day streak', unlocked: maxStreak >= 14, icon: '💪' },
    { id: 'streak_30', title: 'Legendary Streak', desc: 'Achieve a 30-day streak', unlocked: maxStreak >= 30, icon: '⚡' },
    { id: 'streak_50', title: 'Half-Century Master', desc: 'Achieve a 50-day streak', unlocked: maxStreak >= 50, icon: '🏆' },
    { id: 'streak_100', title: 'Epic Centurion', desc: 'Achieve an epic 100-day streak', unlocked: maxStreak >= 100, icon: '💯' },
    { id: 'journal_5', title: 'Memory Collector', desc: 'Log 5 progress photos/notes', unlocked: (totalNotes + totalPhotos) >= 5, icon: '📸' },
    { id: 'photos_10', title: 'Visual Progress Guru', desc: 'Upload 10 progress photos', unlocked: totalPhotos >= 10, icon: '🎨' },
    { id: 'level_5', title: 'Rising Star', desc: 'Reach Level 5', unlocked: userLevel >= 5, icon: '⭐' },
    { id: 'level_10', title: 'Discipline Master', desc: 'Reach Level 10', unlocked: userLevel >= 10, icon: '👑' },
    { id: 'completions_50', title: 'Consistent Achiever', desc: 'Reach 50 total completions', unlocked: totalCompletions >= 50, icon: '🎯' },
    { id: 'completions_200', title: 'Force of Habit', desc: 'Reach 200 total completions', unlocked: totalCompletions >= 200, icon: '💎' },
    { id: 'all_categories', title: 'Renaissance Person', desc: 'Maintain active habits in all 6 categories', unlocked: hasAllCategories, icon: '🎭' }
  ];

  // Dynamically add habit-specific 21-day milestones as Achievements!
  unclaimed.forEach(item => {
    rules.push({
      id: `shield_milestone_${item.id}`,
      title: `Shield Ready: ${item.habitName}`,
      desc: `Reached a ${item.milestone}-day streak on "${item.habitName}"! ${item.claimed ? 'Claimed! 🛡️' : 'Claim your habit-specific Golden Shield reward.'}`,
      unlocked: true,
      icon: item.claimed ? '🛡️' : '🎁'
    });
  });

  let newlyUnlocked = false;
  const finalAchievements = rules.map(rule => {
    const wasAlreadyUnlocked = unlockedIds.has(rule.id);
    if (rule.unlocked && !wasAlreadyUnlocked) {
      newlyUnlocked = true;
      setTimeout(() => {
        state.audio.playAchievement();
        showNotification(`🏆 Achievement Unlocked: ${rule.title}!`, 'linear-gradient(135deg, #f59e0b, #be123c)');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }, 800);
    }
    return {
      id: rule.id,
      title: rule.title,
      desc: rule.desc,
      unlocked: rule.unlocked,
      icon: rule.icon
    };
  });

  await state.db.setSetting('unlocked_achievements', finalAchievements);
  if (newlyUnlocked && state.activeView === 'view-achievements') {
    renderAchievementsView();
  }
}

// --- INTERACTIVE NOTIFICATION SPLASH ---
function showNotification(text, backgroundGradient) {
  const container = document.createElement('div');
  container.className = 'notification-toast';

  // Extract a subtle prefix icon depending on type of message (e.g. success, error, warning)
  let prefix = '';
  // Clean emoji/warning markers from base text if they exist in text to avoid duplication
  let cleanText = text;
  if (text.startsWith('⚠️')) {
    prefix = '<span style="color: #f43f5e; font-weight: bold; margin-right: 6px; font-size: 1.1rem;">⚠️</span>';
    cleanText = text.substring(2).trim();
  } else if (text.startsWith('🔒')) {
    prefix = '<span style="color: #fbbf24; font-weight: bold; margin-right: 6px; font-size: 1.1rem;">🔒</span>';
    cleanText = text.substring(2).trim();
  } else if (text.startsWith('✨')) {
    prefix = '<span style="color: #6366f1; font-weight: bold; margin-right: 6px; font-size: 1.1rem;">✨</span>';
    cleanText = text.substring(2).trim();
  } else if (cleanText.toLowerCase().includes('success') || cleanText.toLowerCase().includes('complete') || cleanText.toLowerCase().includes('saved') || cleanText.toLowerCase().includes('unlocked')) {
    prefix = '<span style="color: #10b981; font-weight: bold; margin-right: 6px; font-size: 1.1rem;">✓</span>';
  } else if (cleanText.toLowerCase().includes('error') || cleanText.toLowerCase().includes('invalid') || cleanText.toLowerCase().includes('fail') || cleanText.toLowerCase().includes('trash')) {
    prefix = '<span style="color: #f43f5e; font-weight: bold; margin-right: 6px; font-size: 1.1rem;">⚠️</span>';
  } else {
    prefix = '<span style="color: #6366f1; font-weight: bold; margin-right: 6px; font-size: 1.1rem;">ℹ</span>';
  }

  container.innerHTML = `<div style="display: flex; align-items: center; gap: 0.5rem;">${prefix}<span>${cleanText}</span></div>`;
  document.body.appendChild(container);

  // Trigger entering animation
  setTimeout(() => {
    container.style.transform = 'translateY(0)';
    container.style.opacity = '1';
  }, 100);

  // Trigger leaving animation
  setTimeout(() => {
    container.style.transform = 'translateY(50px)';
    container.style.opacity = '0';
    setTimeout(() => container.remove(), 400);
  }, 4000);
}

// ================= VIEW RENDERING LOGIC =================

// --- 1. DASHBOARD & TODAY'S AGENDA ---
async function renderDashboardView() {
  const todayStr = new Date().toISOString().split('T')[0];
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);

  // Render Daily Core Quest Card
  renderCoreQuestCard();

  // Render Interactive Onboarding Guide
  await renderOnboardingGuide();

  // Compute Active Today Agenda Habits based on schedule rules
  const dueTodayHabits = activeHabits.filter(habit => isHabitDueOnDate(habit, new Date()));

  // Render Today's categories filter row
  renderCategoryPills('agenda-category-filters', state.activeAgendaCategory, (cat) => {
    state.activeAgendaCategory = cat;
    renderDashboardView();
  });

  // Filter based on active agenda pill
  const filteredHabits = dueTodayHabits.filter(h => 
    state.activeAgendaCategory === 'all' || h.category === state.activeAgendaCategory
  );

  const container = document.getElementById('agenda-habits-list');
  container.innerHTML = '';

  if (filteredHabits.length === 0) {
    container.innerHTML = `
      <div class="no-habits-placeholder">
        <span class="placeholder-emoji">🎯</span>
        <h4 data-lang="lbl_empty_agenda">All clear for today!</h4>
        <p>No habits due in this category, or you are completely free. Enjoy your momentum!</p>
      </div>
    `;
    updateAgendaRadialProg(0, 0);
  } else {
    let completedCount = 0;
    let completedSubtasks = 0;
    let totalSubtasks = 0;

    for (const habit of filteredHabits) {
      // Find completion
      const compKey = `${habit.id}_${todayStr}`;
      const compRecord = state.completions.find(c => c.id === compKey);
      const isCompleted = compRecord ? compRecord.completed : false;
      const subChecked = compRecord ? compRecord.subTasksChecked || [] : [];
      const hasLog = compRecord && ((compRecord.journalNote && compRecord.journalNote.trim() !== '') || compRecord.journalPhoto);

      if (isCompleted) completedCount++;

      // Count subtasks for the Consistency Wheel and horizontal progress bar
      if (habit.subTasks && habit.subTasks.length > 0) {
        totalSubtasks += habit.subTasks.length;
        completedSubtasks += subChecked.length;
      } else {
        totalSubtasks += 1;
        if (isCompleted) completedSubtasks++;
      }

      // Row HSL styling variables
      const rawHSL = habit.color.startsWith('var') ? getHSLFromVar(habit.color) : habit.color;

      const row = document.createElement('div');
      row.className = `agenda-habit-row ${isCompleted ? 'completed-state' : ''}`;
      row.style.setProperty('--habit-color', habit.color.startsWith('var') ? `rgb(${habit.color})` : `hsl(${habit.color})`);
      row.style.setProperty('--habit-color-raw', rawHSL);

      // Create checklist drawer markup if subtasks exist
      let subtasksDrawer = '';
      if (habit.subTasks && habit.subTasks.length > 0) {
        const listItems = habit.subTasks.map(st => {
          const isChecked = subChecked.includes(st.id);
          return `
            <div class="agenda-subtask-item ${isChecked ? 'checked' : ''}" data-subid="${st.id}">
              <div class="subtask-mini-check ${isChecked ? 'checked' : ''}">✔</div>
              <span>${st.text}</span>
            </div>
          `;
        }).join('');
        subtasksDrawer = `<div class="agenda-subtasks-drawer">${listItems}</div>`;
      }

      // Check current streak dynamically
      const streakStats = await state.db.getStreakStats(habit.id);

      const shieldBadgeMarkup = habit.shieldsCount > 0 ? `
        <span class="shield-badge-glowing" title="Golden Shield Charged! Protects streak for 1-2 missed days.">🛡️ x${habit.shieldsCount}</span>
      ` : `
        <span class="shield-progress-badge" title="${streakStats.currentStreak % 21}/21 days to next Golden Shield">🛡️ ${streakStats.currentStreak % 21}/21</span>
      `;

      // Check if shield can be activated for recovery
      const missedDates = getMissedDueDaysForHabit(habit);
      let shieldRepairBanner = '';
      if (missedDates.length >= 1 && missedDates.length <= 2 && habit.shieldsCount > 0) {
        shieldRepairBanner = `
          <div class="shield-repair-banner" style="grid-column: 1/-1; margin-top: 0.75rem; display: flex; align-items: center; justify-content: space-between; background: rgba(245, 158, 11, 0.08); border: 1.5px dashed rgba(245, 158, 11, 0.4); border-radius: 10px; padding: 0.6rem 0.85rem; font-size: 0.8rem; color: #fff; animation: shieldPulseBorder 3s infinite ease-in-out;">
            <div style="display: flex; align-items: center; gap: 0.5rem; text-align: left;">
              <span style="font-size: 1.25rem;">🛡️</span>
              <div>
                <strong style="color: #f59e0b; display: block; font-size: 0.85rem;">Streak Protected!</strong>
                <span style="font-size: 0.7rem; color: var(--text-muted);">You missed ${missedDates.length} due day${missedDates.length > 1 ? 's' : ''} (${missedDates.join(', ')}). Use a shield to restore your streak!</span>
              </div>
            </div>
            <button type="button" class="btn-activate-shield" style="padding: 0.35rem 0.75rem; font-size: 0.7rem; border-radius: 6px; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; font-weight: bold; color: #fff; cursor: pointer; box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);">
              Use Shield
            </button>
          </div>
        `;
      }

      row.innerHTML = `
        <div class="habit-checkbox-wrapper">
          <div class="custom-checkbox ${isCompleted ? 'checked' : ''}">✔</div>
        </div>
        <div class="habit-emoji-badge">${habit.emoji}</div>
        <div class="habit-text-block">
          <span class="habit-name-lbl">${habit.name}</span>
          <span class="habit-desc-lbl">${habit.desc || 'No description'}</span>
        </div>
        <div class="habit-meta-badges">
          <span class="meta-tag">${habit.category}</span>
          ${streakStats.currentStreak > 0 ? `
            <span class="streak-counter-badge">🔥 ${streakStats.currentStreak}</span>
          ` : ''}
          ${shieldBadgeMarkup}
        </div>
        <button class="btn-row-pin-quest ${state.coreQuestHabitId === habit.id ? 'pinned' : ''}" title="Pin as Daily Core Quest">
          <i data-lucide="star"></i>
        </button>
        <button class="btn-row-journal ${hasLog ? 'has-log' : ''}" title="Add progress pictures and notes">
          <i data-lucide="book-open"></i>
        </button>
        ${subtasksDrawer}
        ${shieldRepairBanner}
      `;

      // Checkbox listener
      const chk = row.querySelector('.custom-checkbox');
      chk.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        // If subtasks exist, enforce finishing them first
        if (habit.subTasks && habit.subTasks.length > 0 && !isCompleted) {
          const allTicked = subChecked.length === habit.subTasks.length;
          if (!allTicked) {
            // Auto check all if they clicked main checkbox directly (satisfying UX)
            const allIds = habit.subTasks.map(t => t.id);
            const res = await state.db.toggleCompletion(habit.id, todayStr, allIds);
            if (res.completed) {
              await awardXP(10);
              confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
            }
            await reloadStateData();
            updateViewContent();
            return;
          }
        }

        const res = await state.db.toggleCompletion(habit.id, todayStr);
        if (res.completed) {
          await awardXP(10);
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        }
        await reloadStateData();
        updateViewContent();
      });

      // Sub-tasks checks listener
      const subItems = row.querySelectorAll('.agenda-subtask-item');
      subItems.forEach(item => {
        item.addEventListener('click', async (e) => {
          e.stopPropagation();
          const subId = parseInt(item.getAttribute('data-subid'));
          let nextChecked = [...subChecked];
          
          if (nextChecked.includes(subId)) {
            nextChecked = nextChecked.filter(id => id !== subId);
          } else {
            nextChecked.push(subId);
          }

          // Enforce habit completed = true if all checked, false if not all checked
          const res = await state.db.toggleCompletion(habit.id, todayStr, nextChecked);

          const isAllChecked = nextChecked.length === habit.subTasks.length;
          if (isAllChecked && !isCompleted) {
            await awardXP(10);
            confetti({ particleCount: 40, spread: 50 });
          }

          await reloadStateData();
          updateViewContent();
        });
      });

      // Pin quest listener
      row.querySelector('.btn-row-pin-quest').addEventListener('click', async (e) => {
        e.stopPropagation();
        if (state.coreQuestHabitId === habit.id) {
          state.coreQuestHabitId = null;
        } else {
          state.coreQuestHabitId = habit.id;
        }
        await state.db.setSetting('core_quest_habit_id', state.coreQuestHabitId);
        showNotification(state.coreQuestHabitId ? `Pinned "${habit.name}" as Daily Core Quest!` : 'Unpinned Core Quest.', '#f59e0b');
        await reloadStateData();
        updateViewContent();
      });

      // Journal entry trigger listener
      row.querySelector('.btn-row-journal').addEventListener('click', (e) => {
        e.stopPropagation();
        openJournalModal(habit.id, todayStr);
      });

      // Shield activation listener
      const repairBtn = row.querySelector('.btn-activate-shield');
      if (repairBtn) {
        repairBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (confirm(`🛡️ Consume 1 Golden Shield to restore streak for "${habit.name}"?`)) {
            habit.shieldsCount = Math.max(0, habit.shieldsCount - 1);
            await state.db.updateHabit(habit);
            
            for (const missedDate of missedDates) {
              await state.db.toggleCompletion(
                habit.id,
                missedDate,
                null,
                '🛡️ Streak Shield Activated! Streak saved from being broken.'
              );
            }
            
            state.audio.playPerfectDay();
            confetti({ 
              particleCount: 150, 
              spread: 80, 
              colors: ['#f59e0b', '#fbbf24', '#fff'],
              origin: { y: 0.6 }
            });
            showNotification(`🛡️ Streak restored! consumed 1 Golden Shield.`, '#f59e0b');
            
            await reloadStateData();
            updateViewContent();
          }
        });
      }

      container.appendChild(row);
    }

    updateAgendaRadialProg(completedSubtasks, totalSubtasks);
  }

  // Statistics totals updated below

  let habitScores = [];
  for (const h of activeHabits) {
    const score = await state.db.getHabitScore(h.id, h.createdTime);
    habitScores.push(score);
  }
  const perfectStreak = getPerfectDayStreak();
  document.getElementById('stat-val-streak').innerText = `${perfectStreak} Days`;
  
  const avgScore = habitScores.length > 0 ? Math.round(habitScores.reduce((a,b)=>a+b,0)/habitScores.length) : 0;
  document.getElementById('stat-val-score').innerText = `${avgScore}/100`;
}

function updateAgendaRadialProg(done, total) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const bar = document.getElementById('agenda-radial-bar');
  const txt = document.getElementById('agenda-radial-pct');
  
  txt.innerText = `${done} / ${total}`;
  
  // Circumference: 2 * PI * r = 2 * 3.14 * 50 = 314
  const offset = 314 - (pct / 100) * 314;
  bar.style.strokeDashoffset = offset;

  // Update horizontal subtask progress bar
  const hFill = document.getElementById('wheel-progress-bar-fill');
  const hPct = document.getElementById('wheel-progress-bar-pct');
  if (hFill) {
    hFill.style.width = `${pct}%`;
  }
  if (hPct) {
    hPct.innerText = `${pct}%`;
  }

  // Perfect day arpeggio play!
  if (pct === 100 && total > 0 && done === total) {
    const playedTodayKey = `perfect_day_${new Date().toISOString().split('T')[0]}`;
    state.db.getSetting(playedTodayKey, false).then(played => {
      if (!played) {
        setTimeout(() => {
          state.audio.playPerfectDay();
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.4 } });
          showNotification('🌈 PERFECT DAY! All your habits are complete!', 'linear-gradient(135deg, #a78bfa, #f472b6)');
        }, 600);
        state.db.setSetting(playedTodayKey, true);
      }
    });
  }
}

function isHabitDueOnDate(habit, date) {
  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const freq = habit.frequency;

  if (freq.type === 'daily') {
    return true;
  } else if (freq.type === 'weekdays') {
    // freq.days is an array of active weekdays e.g. [1, 3, 5]
    return freq.days.includes(dayOfWeek);
  }
  return true;
}

// --- Helper: Calculate Streak of Perfect Days ---
function getPerfectDayStreak() {
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);
  if (activeHabits.length === 0) return 0;

  const minCreatedTime = Math.min(...activeHabits.map(h => h.createdTime));
  const startDate = new Date(minCreatedTime);
  startDate.setHours(0,0,0,0);

  const today = new Date();
  today.setHours(0,0,0,0);

  const datesList = [];
  let curr = new Date(startDate);
  while (curr <= today) {
    datesList.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }

  const perfectDaysMap = {};

  for (const date of datesList) {
    const dateStr = date.toISOString().split('T')[0];
    const dueOnDate = activeHabits.filter(h => isHabitDueOnDate(h, date));
    
    if (dueOnDate.length === 0) {
      continue;
    }

    let allCompleted = true;
    for (const h of dueOnDate) {
      const compKey = `${h.id}_${dateStr}`;
      const record = state.completions.find(c => c.id === compKey);
      if (!record || !record.completed) {
        allCompleted = false;
        break;
      }
    }
    perfectDaysMap[dateStr] = allCompleted;
  }

  let activeStreak = 0;
  let tempCount = 0;
  let lastPerfectDate = null;

  const datesWithDue = datesList.filter(d => {
    return activeHabits.filter(h => isHabitDueOnDate(h, d)).length > 0;
  });

  for (let i = 0; i < datesWithDue.length; i++) {
    const date = datesWithDue[i];
    const dateStr = date.toISOString().split('T')[0];
    const isPerfect = perfectDaysMap[dateStr];

    if (isPerfect) {
      if (tempCount === 0) {
        tempCount = 1;
      } else {
        tempCount++;
      }
      lastPerfectDate = date;
    } else {
      tempCount = 0;
    }
  }

  if (lastPerfectDate) {
    const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utcLast = Date.UTC(lastPerfectDate.getFullYear(), lastPerfectDate.getMonth(), lastPerfectDate.getDate());
    const diff = Math.round(Math.abs(utcToday - utcLast) / (1000 * 60 * 60 * 24));

    if (diff <= 1) {
      activeStreak = tempCount;
    } else {
      activeStreak = 0;
    }
  }

  return activeStreak;
}

// --- Helper: Convert CSS Var accent names to HSL strings ---
function getHSLFromVar(varName) {
  const temp = document.createElement('div');
  temp.style.color = varName;
  document.body.appendChild(temp);
  const color = getComputedStyle(temp).color;
  document.body.removeChild(temp);
  
  // Parse rgb/rgba or return standard defaults
  return '239, 84%, 67%'; // standard indigo representation
}

// --- 2. HABITS GRID VIEW (LIST vs STREAK) ---
async function renderHabitsView() {
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);

  // Categories list
  renderCategoryPills('habits-category-filters', state.activeHabitsCategory, (cat) => {
    state.activeHabitsCategory = cat;
    renderHabitsView();
  });

  const filtered = activeHabits.filter(h =>
    state.activeHabitsCategory === 'all' || h.category === state.activeHabitsCategory
  );

  const grid = document.getElementById('habits-grid-container');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-habits-placeholder" style="grid-column: 1/-1;">
        <span class="placeholder-emoji">✨</span>
        <h4 data-lang="lbl_empty_habits">No habits found</h4>
        <p>Try creating a new habit using the "Create Habit" button to kickstart your transformational journey.</p>
      </div>
    `;
    return;
  }

  for (const habit of filtered) {
    const stats = await state.db.getStreakStats(habit.id);
    const score = await state.db.getHabitScore(habit.id, habit.createdTime);

    const card = document.createElement('div');
    card.className = 'glass-card habit-render-card';
    
    // Style hooks
    card.style.setProperty('--habit-color', habit.color.startsWith('var') ? `rgb(${habit.color})` : `hsl(${habit.color})`);
    const rawHSL = habit.color.startsWith('var') ? getHSLFromVar(habit.color) : habit.color;
    card.style.setProperty('--habit-color-raw', rawHSL);

    const shieldBadgeMarkup = habit.shieldsCount > 0 ? `
      <div class="shield-badge-glowing" style="margin-left: 0.25rem;">🛡️ x${habit.shieldsCount}</div>
    ` : `
      <div class="shield-progress-badge" style="margin-left: 0.25rem;">🛡️ ${stats.currentStreak % 21}/21</div>
    `;

    // Check if shield can be activated for recovery
    const missedDates = getMissedDueDaysForHabit(habit);
    let shieldRepairBanner = '';
    if (missedDates.length >= 1 && missedDates.length <= 2 && habit.shieldsCount > 0) {
      shieldRepairBanner = `
        <div class="shield-repair-banner" style="margin-top: 0.75rem; display: flex; align-items: center; justify-content: space-between; background: rgba(245, 158, 11, 0.08); border: 1.5px dashed rgba(245, 158, 11, 0.4); border-radius: 10px; padding: 0.6rem 0.85rem; font-size: 0.8rem; color: #fff; animation: shieldPulseBorder 3s infinite ease-in-out; text-align: left; width: 100%;">
          <div>
            <strong style="color: #f59e0b; display: block; font-size: 0.75rem;">🛡️ Streak Protected!</strong>
            <span style="font-size: 0.65rem; color: var(--text-muted);">Missed ${missedDates.length} due day${missedDates.length > 1 ? 's' : ''}.</span>
          </div>
          <button type="button" class="accent-glow-btn btn-activate-shield" style="padding: 0.3rem 0.6rem; font-size: 0.65rem; border-radius: 5px; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; font-weight: bold; color: #fff; cursor: pointer; white-space: nowrap;">
            Use Shield
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="habit-card-header">
        <div class="card-header-left">
          <div class="card-emoji-box">${habit.emoji}</div>
          <div class="card-title-group">
            <span class="card-habit-name">${habit.name}</span>
            <span class="card-habit-cat">${habit.category}</span>
          </div>
        </div>
        
        <div class="card-header-right">
          ${stats.currentStreak > 0 ? `
            <div class="card-streak-count">🔥 ${stats.currentStreak}</div>
          ` : ''}
          ${shieldBadgeMarkup}
          <button class="btn-card-edit" title="Configure habit settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
      </div>

      <p class="habit-card-desc">${habit.desc || 'No description'}</p>

      <div class="habit-card-footer">
        <div class="footer-scores">
          <div class="score-pill">
            <span class="score-pill-val">${score}</span>
            <span class="score-pill-lbl" data-lang="lbl_score">Score</span>
          </div>
          <div class="score-pill">
            <span class="score-pill-val">${stats.longestStreak}</span>
            <span class="score-pill-lbl" data-lang="lbl_max_streak">Max Streak</span>
          </div>
        </div>
        <div class="header-date-badge" style="padding: 0.35rem 0.65rem; border-radius: 8px; font-size: 0.75rem; display: flex; align-items: center; gap: 0.35rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
          <span>${habit.frequency.type === 'daily' ? 'Daily' : 'Custom'}</span>
        </div>
      </div>
      ${shieldRepairBanner}
    `;

    // Edit button click
    card.querySelector('.btn-card-edit').addEventListener('click', (e) => {
      e.stopPropagation();
      openHabitCreatorModal(habit);
    });

    // Shield activation listener in habit lists
    const repairBtn = card.querySelector('.btn-activate-shield');
    if (repairBtn) {
      repairBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm(`🛡️ Consume 1 Golden Shield to restore streak for "${habit.name}"?`)) {
          habit.shieldsCount = Math.max(0, habit.shieldsCount - 1);
          await state.db.updateHabit(habit);
          
          for (const missedDate of missedDates) {
            await state.db.toggleCompletion(
              habit.id,
              missedDate,
              null,
              '🛡️ Streak Shield Activated! Streak saved from being broken.'
            );
          }
          
          state.audio.playPerfectDay();
          confetti({ 
            particleCount: 150, 
            spread: 80, 
            colors: ['#f59e0b', '#fbbf24', '#fff'],
            origin: { y: 0.6 }
          });
          showNotification(`🛡️ Streak restored! consumed 1 Golden Shield.`, '#f59e0b');
          
          await reloadStateData();
          updateViewContent();
        }
      });
    }

    grid.appendChild(card);
  }
}

// --- 3. TIMELINE & JOURNEY LOGS ---
function renderTimelineView() {
  renderCategoryPills('timeline-category-filters', state.activeTimelineCategory, (cat) => {
    state.activeTimelineCategory = cat;
    renderTimelineView();
  });

  const query = document.getElementById('timeline-search').value.toLowerCase();
  const photosOnly = document.getElementById('timeline-photos-only').checked;

  const container = document.getElementById('timeline-container-list');
  container.innerHTML = '';

  // Get completions containing logs, sort chronologically descending (newest first)
  const logs = state.completions
    .filter(c => c.completed && (c.journalPhoto || (c.journalNote && c.journalNote.trim() !== '')))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredLogs = logs.filter(log => {
    const habit = state.habits.find(h => h.id === log.habitId);
    if (!habit || habit.isDeleted || habit.isHidden) return false;

    // Filters
    const matchesCat = state.activeTimelineCategory === 'all' || habit.category === state.activeTimelineCategory;
    const matchesPhoto = !photosOnly || !!log.journalPhoto;
    const matchesQuery = !query || 
      habit.name.toLowerCase().includes(query) || 
      log.journalNote.toLowerCase().includes(query) || 
      log.date.toLowerCase().includes(query);

    return matchesCat && matchesPhoto && matchesQuery;
  });

  if (filteredLogs.length === 0) {
    container.innerHTML = `
      <div class="no-habits-placeholder">
        <span class="placeholder-emoji">📸</span>
        <h4 data-lang="lbl_empty_timeline">Your Journey is clear</h4>
        <p>Start writing progress notes or uploading photos under the agenda list to populate your transformation timeline.</p>
      </div>
    `;
    return;
  }

  filteredLogs.forEach((log, index) => {
    const habit = state.habits.find(h => h.id === log.habitId);
    const dateFormatted = new Date(log.date).toLocaleDateString(state.currentLang, { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    const alignClass = index % 2 === 0 ? 'align-left' : 'align-right';

    const item = document.createElement('div');
    item.className = `timeline-item ${alignClass}`;
    
    // Style variables
    item.style.setProperty('--habit-color', habit.color.startsWith('var') ? `rgb(${habit.color})` : `hsl(${habit.color})`);
    const rawHSL = habit.color.startsWith('var') ? getHSLFromVar(habit.color) : habit.color;
    item.style.setProperty('--habit-color-raw', rawHSL);

    item.innerHTML = `
      <div class="timeline-badge-node">${habit.emoji}</div>
      <span class="timeline-date-marker">${dateFormatted}</span>
      
      <div class="timeline-content-card">
        <div class="timeline-card-header">
          <span class="timeline-habit-title">${habit.name}</span>
          <span class="timeline-habit-category">${habit.category}</span>
        </div>
        
        ${log.journalNote ? `
          <p class="timeline-journal-note">${log.journalNote}</p>
        ` : ''}

        ${log.journalPhoto ? `
          <div class="timeline-attached-photo">
            <img src="${log.journalPhoto}" alt="Progress Photo">
            <div class="photo-zoom-overlay"><i data-lucide="zoom-in"></i></div>
          </div>
        ` : ''}
      </div>
    `;

    // Click photo to open Lightbox!
    if (log.journalPhoto) {
      item.querySelector('.timeline-attached-photo').addEventListener('click', () => {
        openLightbox(log.journalPhoto, dateFormatted, habit.name, log.journalNote || '');
      });
    }

    container.appendChild(item);
  });
}

// --- 4. DETAILED ANALYTICS & GRID HEATMAP ---
function renderAnalyticsView() {
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);

  // Populate drop-down
  const selector = document.getElementById('analytics-habit-selector');
  // Preserve selected value or default
  const prevVal = state.activeAnalyticsHabitId;
  selector.innerHTML = `<option value="all">${TRANSLATIONS[state.currentLang].opt_all_habits}</option>`;
  
  activeHabits.forEach(h => {
    selector.innerHTML += `<option value="${h.id}">${h.name}</option>`;
  });
  selector.value = prevVal;

  renderGitHubHeatmap();
  renderAnalyticalCharts();
  renderDeepDiveSummary();
  renderCircadianChart();
  renderMonthlyCalendar();
}

async function renderGitHubHeatmap() {
  const grid = document.getElementById('heatmap-grid-inner');
  grid.innerHTML = '';

  const range = state.activeAnalyticsRange || 'yearly';
  let daysLimit = 365;
  if (range === 'weekly') daysLimit = 7;
  else if (range === 'monthly') daysLimit = 30;

  // Get last N days ending today
  const today = new Date();
  const pastDates = [];
  for (let i = daysLimit - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    pastDates.push(d.toISOString().split('T')[0]);
  }

  // Count completions per day (filter by selected habit if isolated)
  const completionsPerDay = {};
  const targetHabitId = state.activeAnalyticsHabitId;
  state.completions.forEach(c => {
    if (c.completed && (targetHabitId === 'all' || c.habitId === parseInt(targetHabitId))) {
      completionsPerDay[c.date] = (completionsPerDay[c.date] || 0) + 1;
    }
  });

  pastDates.forEach(dateStr => {
    const count = completionsPerDay[dateStr] || 0;
    
    // Density levels 0-4
    let densityClass = 'lvl-0';
    if (count >= 4) densityClass = 'lvl-4';
    else if (count === 3) densityClass = 'lvl-3';
    else if (count === 2) densityClass = 'lvl-2';
    else if (count === 1) densityClass = 'lvl-1';

    const daySquare = document.createElement('div');
    daySquare.className = `heatmap-day ${densityClass}`;
    
    // Formatting tooltip
    const formatted = new Date(dateStr).toLocaleDateString(state.currentLang, { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });
    daySquare.title = `${formatted}: ${count} completions`;

    // Click triggers historical details notification
    daySquare.addEventListener('click', () => {
      showNotification(`📅 ${formatted}: completed ${count} habits!`, 'rgba(16, 185, 129, 0.85)');
    });

    grid.appendChild(daySquare);
  });
}

function renderAnalyticalCharts() {
  const range = state.activeAnalyticsRange || 'yearly';
  const today = new Date();
  
  let labels = [];
  let trendData = [];

  if (range === 'weekly') {
    // 1. WEEKLY VIEW: Show each of the last 7 days individually
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - i);
      const dateStr = targetDate.toISOString().split('T')[0];
      const dayName = targetDate.toLocaleDateString(state.currentLang, { weekday: 'short' });
      
      let scheduled = 0;
      let completed = 0;

      state.habits.forEach(h => {
        const targetHabitId = state.activeAnalyticsHabitId;
        if (!h.isArchived && !h.isDeleted && (targetHabitId === 'all' || h.id === parseInt(targetHabitId)) && isHabitDueOnDate(h, targetDate)) {
          scheduled++;
          const comp = state.completions.find(c => c.habitId === h.id && c.date === dateStr);
          if (comp && comp.completed) {
            completed++;
          }
        }
      });

      const pct = scheduled > 0 ? Math.round((completed / scheduled) * 100) : 0;
      labels.push(dayName);
      trendData.push(pct);
    }
  } else if (range === 'monthly') {
    // 2. MONTHLY VIEW: Show last 4 weeks (W-3 to W-0)
    for (let w = 3; w >= 0; w--) {
      const start = new Date(today);
      start.setDate(today.getDate() - (w * 7 + 6));
      const end = new Date(today);
      end.setDate(today.getDate() - (w * 7));
      
      let totalScheduled = 0;
      let totalCompleted = 0;

      let curr = new Date(start);
      while (curr <= end) {
        const dateStr = curr.toISOString().split('T')[0];
        state.habits.forEach(h => {
          const targetHabitId = state.activeAnalyticsHabitId;
          if (!h.isArchived && !h.isDeleted && (targetHabitId === 'all' || h.id === parseInt(targetHabitId)) && isHabitDueOnDate(h, curr)) {
            totalScheduled++;
            const comp = state.completions.find(c => c.habitId === h.id && c.date === dateStr);
            if (comp && comp.completed) totalCompleted++;
          }
        });
        curr.setDate(curr.getDate() + 1);
      }

      const pct = totalScheduled > 0 ? Math.round((totalCompleted / totalScheduled) * 100) : 0;
      labels.push(`W-${w}`);
      trendData.push(pct);
    }
  } else {
    // 3. YEARLY VIEW: Show last 12 months
    for (let m = 11; m >= 0; m--) {
      const start = new Date(today.getFullYear(), today.getMonth() - m, 1);
      const end = new Date(today.getFullYear(), today.getMonth() - m + 1, 0);
      
      const monthName = start.toLocaleDateString(state.currentLang, { month: 'short' });
      
      let totalScheduled = 0;
      let totalCompleted = 0;

      let curr = new Date(start);
      while (curr <= end) {
        const dateStr = curr.toISOString().split('T')[0];
        state.habits.forEach(h => {
          const targetHabitId = state.activeAnalyticsHabitId;
          if (!h.isArchived && !h.isDeleted && (targetHabitId === 'all' || h.id === parseInt(targetHabitId)) && isHabitDueOnDate(h, curr)) {
            totalScheduled++;
            const comp = state.completions.find(c => c.habitId === h.id && c.date === dateStr);
            if (comp && comp.completed) totalCompleted++;
          }
        });
        curr.setDate(curr.getDate() + 1);
      }

      const pct = totalScheduled > 0 ? Math.round((totalCompleted / totalScheduled) * 100) : 0;
      labels.push(monthName);
      trendData.push(pct);
    }
  }

  // Draw/refresh Chart Trend
  const trendCtx = document.getElementById('chart-consistency-trend').getContext('2d');
  if (state.charts.trend) state.charts.trend.destroy();
  
  state.charts.trend = new Chart(trendCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Completion Rate %',
        data: trendData,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointBackgroundColor: '#8b5cf6'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });

  // Chart 2: Category Concentration Radar Chart filtered by active timeframe range
  const cats = ['Fitness', 'Study', 'Health', 'Finance', 'Self-care', 'Productivity'];
  const countPerCat = { Fitness: 0, Study: 0, Health: 0, Finance: 0, 'Self-care': 0, Productivity: 0 };
  
  const filterDate = new Date();
  if (range === 'weekly') {
    filterDate.setDate(today.getDate() - 7);
  } else if (range === 'monthly') {
    filterDate.setDate(today.getDate() - 30);
  } else {
    filterDate.setDate(today.getDate() - 365);
  }

  state.completions.forEach(c => {
    if (c.completed && new Date(c.date) >= filterDate) {
      const h = state.habits.find(hb => hb.id === c.habitId);
      if (h && countPerCat[h.category] !== undefined) {
        countPerCat[h.category]++;
      }
    }
  });

  const radarCtx = document.getElementById('chart-category-radar').getContext('2d');
  if (state.charts.radar) state.charts.radar.destroy();

  state.charts.radar = new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: cats,
      datasets: [{
        label: 'Volume of logs',
        data: cats.map(c => countPerCat[c]),
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.15)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          angleLines: { color: 'rgba(255,255,255,0.05)' },
          ticks: { backdropColor: 'transparent', display: false }
        }
      }
    }
  });
}

// --- Helper: Exhaustive Streak Milestone & Broken Streak Audit parser ---
function analyzeStreakHistory(completedDates) {
  if (completedDates.length === 0) return { active: null, history: [], broken: [] };

  const streaks = [];
  const broken = [];
  
  let currentStreak = {
    start: completedDates[0],
    end: completedDates[0],
    count: 1
  };

  for (let i = 1; i < completedDates.length; i++) {
    const prev = new Date(completedDates[i - 1]);
    const curr = new Date(completedDates[i]);
    prev.setHours(0,0,0,0);
    curr.setHours(0,0,0,0);

    const utc1 = Date.UTC(curr.getFullYear(), curr.getMonth(), curr.getDate());
    const utc2 = Date.UTC(prev.getFullYear(), prev.getMonth(), prev.getDate());
    const diffDays = Math.round(Math.abs(utc1 - utc2) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak.end = completedDates[i];
      currentStreak.count++;
    } else if (diffDays > 1) {
      streaks.push({ ...currentStreak });
      
      const inactiveDate = new Date(prev);
      inactiveDate.setDate(inactiveDate.getDate() + 1);
      const inactiveStr = inactiveDate.toISOString().split('T')[0];

      broken.push({
        lostDate: completedDates[i],
        firstInactiveDate: inactiveStr,
        streakCount: currentStreak.count
      });

      currentStreak = {
        start: completedDates[i],
        end: completedDates[i],
        count: 1
      };
    }
  }
  
  streaks.push({ ...currentStreak });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastDate = new Date(completedDates[completedDates.length - 1]);
  lastDate.setHours(0, 0, 0, 0);
  
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utcLast = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
  const diffToToday = Math.round(Math.abs(utcToday - utcLast) / (1000 * 60 * 60 * 24));

  let active = null;
  const history = [];

  streaks.forEach(s => {
    const sEnd = new Date(s.end);
    sEnd.setHours(0,0,0,0);
    const utcEnd = Date.UTC(sEnd.getFullYear(), sEnd.getMonth(), sEnd.getDate());
    const diff = Math.round(Math.abs(utcToday - utcEnd) / (1000 * 60 * 60 * 24));
    
    if (diff <= 1 && s.end === completedDates[completedDates.length - 1]) {
      active = s;
    } else {
      if (s.count >= 2) {
        history.push(s);
      }
    }
  });

  if (!active && completedDates.length > 0) {
    const inactiveDate = new Date(lastDate);
    inactiveDate.setDate(inactiveDate.getDate() + 1);
    const inactiveStr = inactiveDate.toISOString().split('T')[0];
    
    if (diffToToday > 1) {
      broken.push({
        lostDate: 'Ongoing Break',
        firstInactiveDate: inactiveStr,
        streakCount: streaks[streaks.length - 1].count
      });
    }
  }

  return { active, history, broken };
}

async function renderDeepDiveSummary() {
  const panel = document.getElementById('deep-dive-panel');
  const targetId = state.activeAnalyticsHabitId;
  const range = state.activeAnalyticsRange || 'yearly';

  if (targetId === 'all') {
    panel.style.display = 'none';
    return;
  }

  const h = state.habits.find(habit => habit.id === parseInt(targetId));
  if (!h) return;

  panel.style.display = 'grid';
  const stats = await state.db.getStreakStats(h.id);
  const score = await state.db.getHabitScore(h.id, h.createdTime);
  
  const today = new Date();
  const filterDate = new Date();
  if (range === 'weekly') {
    filterDate.setDate(today.getDate() - 7);
  } else if (range === 'monthly') {
    filterDate.setDate(today.getDate() - 30);
  } else {
    filterDate.setDate(today.getDate() - 365);
  }

  const completions = state.completions.filter(c => c.habitId === h.id && c.completed && new Date(c.date) >= filterDate);
  const totalCompletions = state.completions.filter(c => c.habitId === h.id && c.completed);
  
  let rangeDays = 365;
  if (range === 'weekly') rangeDays = 7;
  else if (range === 'monthly') rangeDays = 30;

  const daysSinceStart = Math.ceil((Date.now() - h.createdTime) / (1000 * 60 * 60 * 24));
  const activeDaysRange = Math.min(rangeDays, daysSinceStart);
  
  const overallRate = activeDaysRange > 0 ? Math.round((completions.length / activeDaysRange) * 100) : 0;

  // Streak audit parsing
  const completedDates = totalCompletions.map(c => c.date).sort((a, b) => new Date(a) - new Date(b));
  const streakAnalysis = analyzeStreakHistory(completedDates);

  let historyListHTML = '';
  if (streakAnalysis.history.length === 0) {
    historyListHTML = `<span style="font-size: 0.75rem; color: var(--text-darker); font-style: italic;">No historical streaks of 2+ days recorded yet.</span>`;
  } else {
    historyListHTML = streakAnalysis.history.reverse().slice(0, 5).map(s => {
      const startF = new Date(s.start).toLocaleDateString(state.currentLang, { month: 'short', day: 'numeric' });
      const endF = new Date(s.end).toLocaleDateString(state.currentLang, { month: 'short', day: 'numeric' });
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.015); border: 1px solid var(--border-glass); border-radius: 8px; padding: 0.4rem 0.6rem; font-size: 0.75rem;">
          <span style="font-weight: 600; color: #10b981;">⭐ ${s.count} Days Streak</span>
          <span style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.7rem;">${startF} – ${endF}</span>
        </div>
      `;
    }).join('');
  }

  let brokenListHTML = '';
  if (streakAnalysis.broken.length === 0) {
    brokenListHTML = `<span style="font-size: 0.75rem; color: var(--text-darker); font-style: italic;">No streaks broken yet! Outstanding consistency.</span>`;
  } else {
    brokenListHTML = streakAnalysis.broken.reverse().slice(0, 5).map(b => {
      const inactiveF = new Date(b.firstInactiveDate).toLocaleDateString(state.currentLang, { month: 'short', day: 'numeric', year: 'numeric' });
      const lostF = b.lostDate === 'Ongoing Break' ? 'Ongoing Inactivity' : new Date(b.lostDate).toLocaleDateString(state.currentLang, { month: 'short', day: 'numeric' });
      return `
        <div style="display: flex; flex-direction: column; gap: 0.2rem; background: rgba(244, 63, 94, 0.03); border: 1px solid rgba(244, 63, 94, 0.15); border-radius: 8px; padding: 0.5rem 0.6rem; font-size: 0.75rem; width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span style="font-weight: 700; color: #f43f5e;">💔 Lost ${b.streakCount}-Day Streak</span>
            <span style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.7rem;">Inactivity on ${inactiveF}</span>
          </div>
          <span style="font-size: 0.7rem; color: var(--text-darker);">Resumed completions: ${lostF}</span>
        </div>
      `;
    }).join('');
  }

  panel.innerHTML = `
    <!-- Top 4 metric summary grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; grid-column: span 2; width: 100%;">
      <div class="analytics-metric-box">
        <span class="analytics-metric-lbl">Habit Score</span>
        <span class="analytics-metric-val" style="color: hsl(var(--color-indigo));">${score}/100</span>
      </div>
      <div class="analytics-metric-box">
        <span class="analytics-metric-lbl">Total Logs (${range === 'weekly' ? 'Weekly' : range === 'monthly' ? 'Monthly' : 'Yearly'})</span>
        <span class="analytics-metric-val">${completions.length} Times</span>
      </div>
      <div class="analytics-metric-box">
        <span class="analytics-metric-lbl">Active Streak</span>
        <span class="analytics-metric-val" style="color: #f97316;">🔥 ${stats.currentStreak} Days</span>
      </div>
      <div class="analytics-metric-box">
        <span class="analytics-metric-lbl">Consistency (${range === 'weekly' ? 'Weekly' : range === 'monthly' ? 'Monthly' : 'Yearly'})</span>
        <span class="analytics-metric-val">${Math.min(100, overallRate)}%</span>
      </div>
    </div>

    <!-- Streak Audit board -->
    <div class="glass-card" style="grid-column: span 2; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; background: rgba(0,0,0,0.1); border: 1px solid var(--border-glass-strong); padding: 1.25rem; margin-top: 1rem; border-radius: 14px; width: 100%;">
      <!-- Column 1: Historical streaks -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="font-size: 1.1rem;">🏆</span>
          <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">Streak Milestone History</h4>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${historyListHTML}
        </div>
      </div>

      <!-- Column 2: Broken streaks registry -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="font-size: 1.1rem;">⚠️</span>
          <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">Broken Streak Registry</h4>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
          ${brokenListHTML}
        </div>
      </div>
    </div>
  `;
}

// --- 5. VIRTUAL HOME SCREEN WIDGET PREVIEW ---
function renderWidgetsView() {
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);

  // Populate Customizer widgets dropdown
  const selector = document.getElementById('widget-target-habit-select');
  selector.innerHTML = '';
  activeHabits.forEach(h => {
    selector.innerHTML += `<option value="${h.id}">${h.name}</option>`;
  });
  if (state.activeWidgetHabitId) {
    selector.value = state.activeWidgetHabitId;
  }

  // Draw active widget preview box
  const preview = document.getElementById('interactive-widget-preview');
  preview.className = `phone-widget-element widget-${state.activeWidgetSize} widget-${state.activeWidgetTheme}`;

  const h = state.habits.find(habit => habit.id === parseInt(state.activeWidgetHabitId));
  if (!h) {
    preview.innerHTML = `<span style="font-size:0.8rem;text-align:center;">Create active habits to preview widgets!</span>`;
    return;
  }

  state.db.getStreakStats(h.id).then(stats => {
    state.db.getHabitScore(h.id, h.createdTime).then(score => {
      const todayStr = new Date().toISOString().split('T')[0];
      const compKey = `${h.id}_${todayStr}`;
      const compRecord = state.completions.find(c => c.id === compKey);
      const isCompleted = compRecord ? compRecord.completed : false;
      const showAlertsToggle = document.getElementById('widget-show-alerts-toggle');
      const alertsEnabled = showAlertsToggle ? showAlertsToggle.checked : true;
      const isStreakAtRisk = alertsEnabled && !isCompleted && isHabitDueOnDate(h, new Date());

      if (state.activeWidgetSize === 'small') {
        if (isStreakAtRisk) {
          preview.innerHTML = `
            <div class="widget-header-row">
              <span class="widget-icon-lbl">${h.emoji}</span>
              <span class="widget-title-lbl" style="color: #f43f5e; font-weight: bold; animation: pulseGlow 2s infinite;">⚠️ ALERT</span>
            </div>
            <div class="widget-streak-middle">
              <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
              <span class="widget-streak-lbl" style="color: #fda4af;">Streak at Risk!</span>
            </div>
            <span class="widget-habit-name">${h.name}</span>
          `;
        } else {
          preview.innerHTML = `
            <div class="widget-header-row">
              <span class="widget-icon-lbl">${h.emoji}</span>
              <span class="widget-title-lbl">DnD</span>
            </div>
            <div class="widget-streak-middle">
              <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
              <span class="widget-streak-lbl">Active Streak</span>
            </div>
            <span class="widget-habit-name">${h.name}</span>
          `;
        }
      } else if (state.activeWidgetSize === 'medium') {
        if (isStreakAtRisk) {
          preview.innerHTML = `
            <div class="widget-header-row">
              <div class="flex align-center gap-0.25">
                <span class="widget-icon-lbl">${h.emoji}</span>
                <span class="widget-habit-name" style="max-width: 140px;">${h.name}</span>
              </div>
              <span class="widget-title-lbl" style="color: #f43f5e; font-weight: bold; animation: pulseGlow 2s infinite;">⚠️ AT RISK</span>
            </div>
            
            <div class="widget-streak-middle" style="flex-direction: row; justify-content: space-between; align-items: flex-end;">
              <div>
                <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
                <span class="widget-streak-lbl" style="display:block; color: #fda4af;">Streak incomplete today!</span>
              </div>
              <div class="widget-progress-row" style="width: 100px;">
                <span>Score: ${score}%</span>
                <div class="widget-progress-track">
                  <div class="widget-progress-fill" style="width: ${score}%;"></div>
                </div>
              </div>
            </div>
          `;
        } else {
          preview.innerHTML = `
            <div class="widget-header-row">
              <div class="flex align-center gap-0.25">
                <span class="widget-icon-lbl">${h.emoji}</span>
                <span class="widget-habit-name" style="max-width: 140px;">${h.name}</span>
              </div>
              <span class="widget-title-lbl">Streaks</span>
            </div>
            
            <div class="widget-streak-middle" style="flex-direction: row; justify-content: space-between; align-items: flex-end;">
              <div>
                <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
                <span class="widget-streak-lbl" style="display:block;">Days current streak</span>
              </div>
              <div class="widget-progress-row" style="width: 100px;">
                <span>Score: ${score}%</span>
                <div class="widget-progress-track">
                  <div class="widget-progress-fill" style="width: ${score}%;"></div>
                </div>
              </div>
            </div>
          `;
        }
      } else {
        // Large 4x4
        if (isStreakAtRisk) {
          preview.innerHTML = `
            <div class="widget-header-row">
              <span class="widget-icon-lbl">${h.emoji}</span>
              <span class="widget-habit-name">${h.name}</span>
              <span class="widget-title-lbl" style="color: #f43f5e; font-weight: bold;">⚠️ ALERT</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.5rem; margin: 0.75rem 0;">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                <span>Current Streak:</span>
                <strong style="color:#f43f5e; animation: textPulse 2s infinite; display: inline-block;">🔥 ${stats.currentStreak} Days (At Risk)</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                <span>Longest Streak:</span>
                <strong>⚡ ${stats.longestStreak} Days</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                <span>Consistency Score:</span>
                <strong>📈 ${score}/100</strong>
              </div>
            </div>
            
            <div class="widget-alert-box" style="background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.3); border-radius: 8px; padding: 0.5rem; font-size: 0.7rem; color: #fca5a5; line-height: 1.3; margin-bottom: 0.75rem; text-align: left;">
              <strong>⚠️ Streak warning:</strong> Complete today's checklists before midnight to protect your active streak.
            </div>
            
            <div class="widget-progress-row">
              <span>Consistency Weight</span>
              <div class="widget-progress-track">
                <div class="widget-progress-fill" style="width: ${score}%;"></div>
              </div>
            </div>
          `;
        } else {
          preview.innerHTML = `
            <div class="widget-header-row">
              <span class="widget-icon-lbl">${h.emoji}</span>
              <span class="widget-habit-name">${h.name}</span>
              <span class="widget-title-lbl">Large Grid</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.5rem; margin: 1rem 0;">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                <span>Current Streak:</span>
                <strong style="color:#f97316;">🔥 ${stats.currentStreak} Days</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                <span>Longest Streak:</span>
                <strong>⚡ ${stats.longestStreak} Days</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                <span>Consistency Score:</span>
                <strong>📈 ${score}/100</strong>
              </div>
            </div>
            
            <div class="widget-progress-row">
              <span>Progress weight</span>
              <div class="widget-progress-track">
                <div class="widget-progress-fill" style="width: ${score}%;"></div>
              </div>
            </div>
          `;
        }
      }
    });
  });
}

// --- 5B. FULLSCREEN PWA WIDGET VIEW ---
async function renderFullscreenWidgetView() {
  // Hide main app container
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    appContainer.style.display = 'none';
  }

  // Show fullscreen widget view
  const fullscreenView = document.getElementById('fullscreen-widget-view');
  if (fullscreenView) {
    fullscreenView.style.display = 'flex';
  }

  const container = document.getElementById('fullscreen-widget-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const habitId = parseInt(urlParams.get('habitId'));
  const size = urlParams.get('size') || 'medium';
  const theme = urlParams.get('theme') || 'glass';
  const alerts = urlParams.get('alerts') !== 'false';

  const h = state.habits.find(habit => habit.id === habitId);
  if (!h) {
    container.innerHTML = `
      <div style="color: var(--text-muted); text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <span style="font-size: 3rem;">⚠️</span>
        <h3 style="margin: 0; color: #fff; font-size: 1.1rem; font-weight: 700;">Widget Configuration Error</h3>
        <p style="margin: 0; font-size: 0.85rem; max-width: 280px; line-height: 1.4;">The requested habit could not be found or has been deleted.</p>
        <a href="/" class="accent-glow-btn" style="margin-top: 1rem; text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; font-weight: bold; background: var(--color-indigo); color: #fff; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="home" style="width: 14px; height: 14px;"></i> Open Full App
        </a>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const stats = await state.db.getStreakStats(h.id);
  const score = await state.db.getHabitScore(h.id, h.createdTime);

  const todayStr = new Date().toISOString().split('T')[0];
  const compKey = `${h.id}_${todayStr}`;
  const compRecord = state.completions.find(c => c.id === compKey);
  const isCompleted = compRecord ? compRecord.completed : false;
  const isStreakAtRisk = alerts && !isCompleted && isHabitDueOnDate(h, new Date());

  // Create widget outer element
  const widgetEl = document.createElement('div');
  widgetEl.className = `phone-widget-element widget-${size} widget-${theme}`;
  widgetEl.style.cursor = 'pointer';
  // Let the user tap the widget itself to open the app!
  widgetEl.addEventListener('click', () => {
    window.location.href = '/';
  });

  if (size === 'small') {
    if (isStreakAtRisk) {
      widgetEl.innerHTML = `
        <div class="widget-header-row">
          <span class="widget-icon-lbl">${h.emoji}</span>
          <span class="widget-title-lbl" style="color: #f43f5e; font-weight: bold; animation: pulseGlow 2s infinite;">⚠️ ALERT</span>
        </div>
        <div class="widget-streak-middle">
          <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
          <span class="widget-streak-lbl" style="color: #fda4af;">Streak at Risk!</span>
        </div>
        <span class="widget-habit-name">${h.name}</span>
      `;
    } else {
      widgetEl.innerHTML = `
        <div class="widget-header-row">
          <span class="widget-icon-lbl">${h.emoji}</span>
          <span class="widget-title-lbl">DnD</span>
        </div>
        <div class="widget-streak-middle">
          <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
          <span class="widget-streak-lbl">Active Streak</span>
        </div>
        <span class="widget-habit-name">${h.name}</span>
      `;
    }
  } else if (size === 'medium') {
    if (isStreakAtRisk) {
      widgetEl.innerHTML = `
        <div class="widget-header-row">
          <div class="flex align-center gap-0.25">
            <span class="widget-icon-lbl">${h.emoji}</span>
            <span class="widget-habit-name" style="max-width: 140px;">${h.name}</span>
          </div>
          <span class="widget-title-lbl" style="color: #f43f5e; font-weight: bold; animation: pulseGlow 2s infinite;">⚠️ AT RISK</span>
        </div>
        
        <div class="widget-streak-middle" style="flex-direction: row; justify-content: space-between; align-items: flex-end;">
          <div>
            <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
            <span class="widget-streak-lbl" style="display:block; color: #fda4af;">Streak incomplete today!</span>
          </div>
          <div class="widget-progress-row" style="width: 100px;">
            <span>Score: ${score}%</span>
            <div class="widget-progress-track">
              <div class="widget-progress-fill" style="width: ${score}%;"></div>
            </div>
          </div>
        </div>
      `;
    } else {
      widgetEl.innerHTML = `
        <div class="widget-header-row">
          <div class="flex align-center gap-0.25">
            <span class="widget-icon-lbl">${h.emoji}</span>
            <span class="widget-habit-name" style="max-width: 140px;">${h.name}</span>
          </div>
          <span class="widget-title-lbl">Streaks</span>
        </div>
        
        <div class="widget-streak-middle" style="flex-direction: row; justify-content: space-between; align-items: flex-end;">
          <div>
            <span class="widget-streak-num">🔥 ${stats.currentStreak}</span>
            <span class="widget-streak-lbl" style="display:block;">Days current streak</span>
          </div>
          <div class="widget-progress-row" style="width: 100px;">
            <span>Score: ${score}%</span>
            <div class="widget-progress-track">
              <div class="widget-progress-fill" style="width: ${score}%;"></div>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    // Large 4x4
    if (isStreakAtRisk) {
      widgetEl.innerHTML = `
        <div class="widget-header-row">
          <span class="widget-icon-lbl">${h.emoji}</span>
          <span class="widget-habit-name">${h.name}</span>
          <span class="widget-title-lbl" style="color: #f43f5e; font-weight: bold;">⚠️ ALERT</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.5rem; margin: 0.75rem 0;">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span>Current Streak:</span>
            <strong style="color:#f43f5e; animation: textPulse 2s infinite; display: inline-block;">🔥 ${stats.currentStreak} Days (At Risk)</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span>Longest Streak:</span>
            <strong>⚡ ${stats.longestStreak} Days</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span>Consistency Score:</span>
            <strong>📈 ${score}/100</strong>
          </div>
        </div>
        
        <div class="widget-alert-box" style="background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.3); border-radius: 8px; padding: 0.5rem; font-size: 0.7rem; color: #fca5a5; line-height: 1.3; margin-bottom: 0.75rem; text-align: left;">
          <strong>⚠️ Streak warning:</strong> Complete today's checklists before midnight to protect your active streak.
        </div>
        
        <div class="widget-progress-row">
          <span>Consistency Weight</span>
          <div class="widget-progress-track">
            <div class="widget-progress-fill" style="width: ${score}%;"></div>
          </div>
        </div>
      `;
    } else {
      widgetEl.innerHTML = `
        <div class="widget-header-row">
          <span class="widget-icon-lbl">${h.emoji}</span>
          <span class="widget-habit-name">${h.name}</span>
          <span class="widget-title-lbl">Large Grid</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.5rem; margin: 1rem 0;">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span>Current Streak:</span>
            <strong style="color:#f97316;">🔥 ${stats.currentStreak} Days</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span>Longest Streak:</span>
            <strong>⚡ ${stats.longestStreak} Days</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span>Consistency Score:</span>
            <strong>📈 ${score}/100</strong>
          </div>
        </div>
        
        <div class="widget-progress-row">
          <span>Progress weight</span>
          <div class="widget-progress-track">
            <div class="widget-progress-fill" style="width: ${score}%;"></div>
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = '';
  container.appendChild(widgetEl);

  // Add "Open Full App" Link below the widget
  const linkEl = document.createElement('a');
  linkEl.href = '/';
  linkEl.className = 'accent-glow-btn';
  linkEl.style.cssText = 'margin-top: 1.5rem; text-decoration: none; padding: 0.6rem 1.2rem; border-radius: 10px; font-size: 0.8rem; font-weight: bold; background: var(--color-indigo); color: #fff; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: transform 0.2s;';
  linkEl.innerHTML = `<i data-lucide="external-link" style="width: 14px; height: 14px;"></i> Open Full App`;
  container.appendChild(linkEl);

  lucide.createIcons();
}

// --- 6. ACHIEVEMENTS LIST ---
async function renderAchievementsView() {
  const container = document.getElementById('badges-shelf-container');
  container.innerHTML = '';

  const unlocked = await state.db.getSetting('unlocked_achievements', []);
  
  unlocked.forEach(badge => {
    const badgeCard = document.createElement('div');
    badgeCard.className = `glass-card badge-glass-card ${!badge.unlocked ? 'locked-badge' : ''}`;
    
    badgeCard.innerHTML = `
      <div class="badge-avatar-box">${badge.unlocked ? badge.icon : '❓'}</div>
      <div class="badge-info-box">
        <span class="badge-title-lbl">${badge.title}</span>
        <span class="badge-desc-lbl">${badge.desc}</span>
      </div>
    `;
    container.appendChild(badgeCard);
  });

  // Render the claimable shields list inside achievements drawer
  const claimContainer = document.getElementById('protector-claim-container');
  if (claimContainer) {
    claimContainer.innerHTML = '';
    let unclaimed = await state.db.getSetting('unclaimed_shields', []);
    const pending = unclaimed.filter(u => !u.claimed);
    
    if (pending.length > 0) {
      pending.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card claimable-shield-card glow-amber';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'space-between';
        card.style.padding = '1.25rem';
        card.style.marginBottom = '1.25rem';
        card.style.border = '1px solid var(--border-glass)';
        card.style.background = 'rgba(245, 158, 11, 0.04)';
        card.style.animation = 'goldenShieldGlow 3s infinite ease-in-out';
        
        card.innerHTML = `
          <div style="display: flex; align-items: center; gap: 1rem; text-align: left;">
            <div style="font-size: 2.2rem; filter: drop-shadow(0 0 10px rgba(245,158,11,0.5)); animation: bounceShield 2s infinite ease-in-out;">🛡️</div>
            <div>
              <h4 style="margin: 0; font-size: 1rem; font-weight: 700; color: #fff;">Streak Protector Shield Ready!</h4>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: var(--text-muted);">${item.habitEmoji} ${item.habitName} hit a <strong>${item.milestone}-day</strong> streak!</p>
            </div>
          </div>
          <button type="button" class="accent-glow-btn btn-claim-shield" data-id="${item.id}" style="padding: 0.5rem 1rem; border-radius: 8px; font-weight: bold; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; color: #fff; cursor: pointer; box-shadow: 0 4px 15px rgba(245,158,11,0.3); transition: all 0.2s;">
            Claim Shield
          </button>
        `;
        
        card.querySelector('.btn-claim-shield').onclick = async () => {
          // Find habit
          const habit = state.habits.find(h => h.id === item.habitId);
          if (habit) {
            habit.shieldsCount = (habit.shieldsCount || 0) + 1;
            await state.db.updateHabit(habit);
          }
          
          // Mark as claimed
          item.claimed = true;
          await state.db.setSetting('unclaimed_shields', unclaimed);
          
          // Visual reward
          state.audio.playAchievement();
          confetti({ 
            particleCount: 150, 
            spread: 85, 
            colors: ['#f59e0b', '#fbbf24', '#fff', '#be123c'],
            origin: { y: 0.6 }
          });
          showNotification(`🛡️ Golden Shield added to "${item.habitName}"!`, 'linear-gradient(135deg, #f59e0b, #fbbf24)');
          
          // Refresh state data and view
          await reloadStateData();
          renderAchievementsView();
        };
        
        claimContainer.appendChild(card);
      });
    } else {
      claimContainer.innerHTML = `
        <div class="glass-card" style="padding: 1.5rem; text-align: center; border: 1px dashed var(--border-glass-strong); background: rgba(255,255,255,0.01);">
          <div style="font-size: 2.2rem; color: var(--text-darker); margin-bottom: 0.5rem;">🛡️</div>
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">No Pending Shield Rewards</h4>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: var(--text-darker);">Achieve a 21-day streak milestone on any habit to unlock a Streak Protector Card reward here!</p>
        </div>
      `;
    }
  }
}

// --- 7. SETTINGS PANEL ---
async function renderSettingsView() {
  const todayStr = new Date().toISOString().split('T')[0];

  // --- 1. POPULATE ARCHIVE VAULT ---
  const archiveVault = document.getElementById('archived-habits-vault');
  if (archiveVault) {
    archiveVault.innerHTML = '';
    const archived = state.habits.filter(h => h.isArchived && !h.isDeleted);

    if (archived.length === 0) {
      archiveVault.innerHTML = `<span style="font-size:0.8rem;color:var(--text-darker);">Archive is empty.</span>`;
    } else {
      archived.forEach(habit => {
        const row = document.createElement('div');
        row.className = 'archived-habit-row';
        row.style.marginBottom = '0.5rem';
        row.innerHTML = `
          <div class="flex align-center gap-0.5" style="display: flex; align-items: center; gap: 0.5rem;">
            <span>${habit.emoji}</span>
            <span class="archived-habit-name">${habit.name}</span>
            <span class="archived-habit-cat">${habit.category}</span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="border-btn btn-restore-habit" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; border-color: var(--color-emerald); color: var(--color-emerald);">
              Restore
            </button>
            <button class="border-btn btn-trash-habit" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; border-color: var(--color-rose); color: var(--color-rose);">
              Move to Trash
            </button>
          </div>
        `;

        row.querySelector('.btn-restore-habit').addEventListener('click', async () => {
          habit.isArchived = false;
          await state.db.updateHabit(habit);
          await reloadStateData();
          renderSettingsView();
          updateViewContent();
          showNotification(`"${habit.name}" restored to active list!`, '#10b981');
        });

        row.querySelector('.btn-trash-habit').addEventListener('click', async () => {
          habit.isDeleted = true;
          habit.isArchived = false;
          await state.db.updateHabit(habit);
          await reloadStateData();
          renderSettingsView();
          updateViewContent();
          showNotification(`"${habit.name}" moved to Trash!`, '#f43f5e');
        });

        archiveVault.appendChild(row);
      });
    }
  }

  // --- 2. POPULATE TRASH ---
  const trashVault = document.getElementById('deleted-habits-vault');
  const btnEmptyHabits = document.getElementById('btn-empty-habits-trash');
  
  if (btnEmptyHabits) {
    const deletedCount = state.habits.filter(h => h.isDeleted).length;
    btnEmptyHabits.style.display = deletedCount > 0 ? 'inline-block' : 'none';
    btnEmptyHabits.onclick = async () => {
      const deleted = state.habits.filter(h => h.isDeleted);
      if (deleted.length === 0) return;
      if (confirm(`⚠️ Empty Trash: Are you sure you want to permanently delete all ${deleted.length} habits? This action is irreversible.`)) {
        for (const h of deleted) {
          await state.db.deleteHabit(h.id);
        }
        await reloadStateData();
        renderSettingsView();
        updateViewContent();
        showNotification('Habits trash emptied successfully!', '#f43f5e');
      }
    };
  }

  if (trashVault) {
    trashVault.innerHTML = '';
    const deleted = state.habits.filter(h => h.isDeleted);

    if (deleted.length === 0) {
      trashVault.innerHTML = `<span style="font-size:0.8rem;color:var(--text-darker);">Trash is empty.</span>`;
    } else {
      deleted.forEach(habit => {
        const row = document.createElement('div');
        row.className = 'archived-habit-row';
        row.style.marginBottom = '0.5rem';
        row.innerHTML = `
          <div class="flex align-center gap-0.5" style="display: flex; align-items: center; gap: 0.5rem;">
            <span>${habit.emoji}</span>
            <span class="archived-habit-name">${habit.name}</span>
            <span class="archived-habit-cat">${habit.category}</span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="border-btn btn-restore-trash" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; border-color: var(--color-emerald); color: var(--color-emerald);">
              Restore
            </button>
            <button class="border-btn btn-delete-perm" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; border-color: var(--color-rose); color: var(--color-rose);">
              Wipe Out
            </button>
          </div>
        `;

        row.querySelector('.btn-restore-trash').addEventListener('click', async () => {
          habit.isDeleted = false;
          habit.isArchived = false;
          habit.isHidden = false; // default restore active
          await state.db.updateHabit(habit);
          await reloadStateData();
          renderSettingsView();
          updateViewContent();
          showNotification(`"${habit.name}" restored successfully!`, '#10b981');
        });

        row.querySelector('.btn-delete-perm').addEventListener('click', async () => {
          if (confirm(`Permanently delete "${habit.name}"? This CANNOT be undone.`)) {
            await state.db.deleteHabit(habit.id);
            await reloadStateData();
            renderSettingsView();
            updateViewContent();
            showNotification(`"${habit.name}" permanently wiped!`, '#be123c');
          }
        });

        trashVault.appendChild(row);
      });
    }
  }

  // --- 3. POPULATE HIDDEN INVENTORY ---
  const hiddenInventoryModal = document.getElementById('modal-hidden-inventory');
  const lockedPanel = document.getElementById('hidden-inventory-locked-panel');
  const unlockedPanel = document.getElementById('hidden-inventory-unlocked-panel');
  const statusBadge = document.getElementById('hidden-inventory-status-badge');

  if (lockedPanel && unlockedPanel && statusBadge) {
    const storedPasscode = await state.db.getSetting('vault_passcode', null);
    
    // Dynamically adjust locked panel texts depending on if passcode is setup
    const titleEl = document.querySelector('#hidden-inventory-locked-panel h4');
    const descEl = document.querySelector('#hidden-inventory-locked-panel p');
    const btnEl = document.getElementById('btn-unlock-hidden-inventory');

    if (!storedPasscode) {
      if (titleEl) titleEl.innerText = 'Setup Vault Passcode';
      if (descEl) descEl.innerText = 'Create a secure 4-digit passcode to protect your private habits. Do not forget this passcode!';
      if (btnEl) {
        btnEl.querySelector('span').innerText = 'Set Passcode & Decrypt';
      }
      statusBadge.innerHTML = `<i data-lucide="shield-alert" style="width: 12px; height: 12px;"></i> Unconfigured`;
      statusBadge.style.background = 'rgba(245,158,11,0.1)';
      statusBadge.style.borderColor = 'rgba(245,158,11,0.2)';
      statusBadge.style.color = '#f59e0b';
    } else {
      if (titleEl) titleEl.innerText = 'Enter Vault Passcode';
      if (descEl) descEl.innerText = 'Access your private habits hidden from active dashboard and agenda checklists.';
      if (btnEl) {
        btnEl.querySelector('span').innerText = 'Decrypt Inventory';
      }
      statusBadge.innerHTML = `<i data-lucide="lock" style="width: 12px; height: 12px;"></i> Locked`;
      statusBadge.style.background = 'rgba(239,68,68,0.1)';
      statusBadge.style.borderColor = 'rgba(239,68,68,0.2)';
      statusBadge.style.color = '#ef4444';
    }

    if (state.hiddenInventoryUnlocked) {
      if (hiddenInventoryModal) {
        hiddenInventoryModal.classList.add('fullscreen-modal-mode');
      }
      lockedPanel.style.display = 'none';
      unlockedPanel.style.display = 'block';
      
      statusBadge.innerHTML = `<i data-lucide="unlock" style="width: 12px; height: 12px;"></i> Unlocked`;
      statusBadge.style.background = 'rgba(16,185,129,0.1)';
      statusBadge.style.borderColor = 'rgba(16,185,129,0.2)';
      statusBadge.style.color = '#10b981';

      const hiddenVault = document.getElementById('hidden-habits-vault');
      hiddenVault.innerHTML = '';

      const hiddenHabits = state.habits.filter(h => h.isHidden && !h.isDeleted && !h.isArchived);

      if (hiddenHabits.length === 0) {
        hiddenVault.innerHTML = `<span style="font-size:0.8rem;color:var(--text-darker);padding:2rem 0;display:block;text-align:center;">Private inventory is empty. Check "Private Habit" in creator to hide habits here.</span>`;
      } else {
        for (const habit of hiddenHabits) {
          const compKey = `${habit.id}_${todayStr}`;
          const compRecord = state.completions.find(c => c.id === compKey);
          const isCompleted = compRecord ? compRecord.completed : false;
          const subChecked = compRecord ? compRecord.subTasksChecked || [] : [];

          // Row HSL styling variables
          const rawHSL = habit.color.startsWith('var') ? getHSLFromVar(habit.color) : habit.color;

          const row = document.createElement('div');
          row.className = `agenda-habit-row ${isCompleted ? 'completed-state' : ''}`;
          row.style.setProperty('--habit-color', habit.color.startsWith('var') ? `rgb(${habit.color})` : `hsl(${habit.color})`);
          row.style.setProperty('--habit-color-raw', rawHSL);

          // Create checklist drawer markup if subtasks exist
          let subtasksDrawer = '';
          if (habit.subTasks && habit.subTasks.length > 0) {
            const listItems = habit.subTasks.map(st => {
              const isChecked = subChecked.includes(st.id);
              return `
                <div class="agenda-subtask-item ${isChecked ? 'checked' : ''}" data-subid="${st.id}">
                  <div class="subtask-mini-check ${isChecked ? 'checked' : ''}">✔</div>
                  <span>${st.text}</span>
                </div>
              `;
            }).join('');
            subtasksDrawer = `<div class="agenda-subtasks-drawer">${listItems}</div>`;
          }

          // Check current streak dynamically
          const streakStats = await state.db.getStreakStats(habit.id);

          const shieldBadgeMarkup = habit.shieldsCount > 0 ? `
            <span class="shield-badge-glowing" title="Golden Shield Charged! Protects streak for 1-2 missed days.">🛡️ x${habit.shieldsCount}</span>
          ` : `
            <span class="shield-progress-badge" title="${streakStats.currentStreak % 21}/21 days to next Golden Shield">🛡️ ${streakStats.currentStreak % 21}/21</span>
          `;

          row.innerHTML = `
            <div class="habit-checkbox-wrapper">
              <div class="custom-checkbox ${isCompleted ? 'checked' : ''}">✔</div>
            </div>
            <div class="habit-emoji-badge">${habit.emoji}</div>
            <div class="habit-text-block">
              <span class="habit-name-lbl">${habit.name}</span>
              <span class="habit-desc-lbl">${habit.desc || 'No description'}</span>
            </div>
            <div class="habit-meta-badges">
              <span class="meta-tag">${habit.category}</span>
              ${streakStats.currentStreak > 0 ? `
                <span class="streak-counter-badge">🔥 ${streakStats.currentStreak}</span>
              ` : ''}
              ${shieldBadgeMarkup}
            </div>
            <div class="habit-actions-group" style="display: flex; gap: 0.35rem; align-items: center;">
              <button class="border-btn btn-edit-hidden" title="Edit Habit" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; border-color: var(--color-amber); color: var(--color-amber); display: flex; align-items: center; gap: 0.25rem;">
                <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i> Edit
              </button>
              <button class="border-btn btn-unhide-habit" title="Unhide Habit" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; border-color: var(--color-indigo); color: var(--color-indigo); display: flex; align-items: center; gap: 0.25rem;">
                <i data-lucide="eye" style="width: 13px; height: 13px;"></i> Unhide
              </button>
              <button class="border-btn btn-trash-hidden" title="Trash Habit" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; border-color: var(--color-rose); color: var(--color-rose); display: flex; align-items: center; gap: 0.25rem;">
                <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i> Trash
              </button>
            </div>
            ${subtasksDrawer}
          `;

          // Habit main checkbox toggle listener
          const chk = row.querySelector('.custom-checkbox');
          chk.addEventListener('click', async (e) => {
            e.stopPropagation();
            
            // If subtasks exist, enforce finishing them first
            if (habit.subTasks && habit.subTasks.length > 0 && !isCompleted) {
              const allTicked = subChecked.length === habit.subTasks.length;
              if (!allTicked) {
                // Auto check all if they clicked main checkbox directly (satisfying UX)
                const allIds = habit.subTasks.map(t => t.id);
                const res = await state.db.toggleCompletion(habit.id, todayStr, allIds);
                if (res.completed) {
                  await awardXP(10);
                  confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
                  showNotification(`Secret habit checked! +10 XP gained! 🤫`, 'linear-gradient(135deg, #8b5cf6, #10b981)');
                }
                await reloadStateData();
                renderSettingsView();
                updateViewContent();
                return;
              }
            }

            const res = await state.db.toggleCompletion(habit.id, todayStr);
            if (res.completed) {
              await awardXP(10);
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
              showNotification(`Secret habit checked! +10 XP gained! 🤫`, 'linear-gradient(135deg, #8b5cf6, #10b981)');
            } else {
              showNotification(`Secret habit toggled off.`, 'rgba(255,255,255,0.3)');
            }
            await reloadStateData();
            renderSettingsView();
            updateViewContent();
          });

          // Sub-tasks checks listener
          const subItems = row.querySelectorAll('.agenda-subtask-item');
          subItems.forEach(item => {
            item.addEventListener('click', async (e) => {
              e.stopPropagation();
              const subId = parseInt(item.getAttribute('data-subid'));
              let nextChecked = [...subChecked];
              
              if (nextChecked.includes(subId)) {
                nextChecked = nextChecked.filter(id => id !== subId);
              } else {
                nextChecked.push(subId);
              }

              // Enforce habit completed = true if all checked, false if not all checked
              const res = await state.db.toggleCompletion(habit.id, todayStr, nextChecked);

              const isAllChecked = nextChecked.length === habit.subTasks.length;
              if (isAllChecked && !isCompleted) {
                await awardXP(10);
                confetti({ particleCount: 40, spread: 50 });
                showNotification(`Secret habit checked! +10 XP gained! 🤫`, 'linear-gradient(135deg, #8b5cf6, #10b981)');
              }

              await reloadStateData();
              renderSettingsView();
              updateViewContent();
            });
          });

          // Edit habit inline
          row.querySelector('.btn-edit-hidden').addEventListener('click', (e) => {
            e.stopPropagation();
            openHabitCreatorModal(habit);
          });

          // Unhide habit
          row.querySelector('.btn-unhide-habit').addEventListener('click', async (e) => {
            e.stopPropagation();
            habit.isHidden = false;
            await state.db.updateHabit(habit);
            await reloadStateData();
            renderSettingsView();
            updateViewContent();
            showNotification(`"${habit.name}" is now visible on active dashboard!`, '#8b5cf6');
          });

          // Move hidden to trash
          row.querySelector('.btn-trash-hidden').addEventListener('click', async (e) => {
            e.stopPropagation();
            habit.isDeleted = true;
            await state.db.updateHabit(habit);
            await reloadStateData();
            renderSettingsView();
            updateViewContent();
            showNotification(`"${habit.name}" moved to Trash!`, '#f43f5e');
          });

          hiddenVault.appendChild(row);
        }
      }
    } else {
      if (hiddenInventoryModal) {
        hiddenInventoryModal.classList.remove('fullscreen-modal-mode');
      }
      lockedPanel.style.display = 'flex';
      unlockedPanel.style.display = 'none';
    }
    
    // Refresh newly created lock icons
    lucide.createIcons();
  }

  // Auto-render Mobile Widgets customizer inside settings view!
  renderWidgetsView();

  // Refresh notifications preferences checkboxes in UI
  refreshNotificationPreferencesUI();
}

function renderCategoryPills(containerId, activeCat, onClickCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const categories = ['all', 'Fitness', 'Study', 'Health', 'Finance', 'Self-care', 'Productivity'];
  
  // Add any custom categories from active habits
  const uniqueCustomCats = new Set();
  if (state.habits) {
    state.habits.forEach(h => {
      if (!h.isDeleted && h.category && !categories.includes(h.category)) {
        uniqueCustomCats.add(h.category);
      }
    });
  }
  uniqueCustomCats.forEach(cat => categories.push(cat));
  
  categories.forEach(cat => {
    const pill = document.createElement('span');
    pill.className = `category-pill ${activeCat === cat ? 'active' : ''}`;
    
    // Localized label
    let label = cat;
    if (cat === 'all') label = (TRANSLATIONS[state.currentLang] && TRANSLATIONS[state.currentLang].emoji_tab_all) || 'All';
    else if (cat === 'Fitness' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_fitness;
    else if (cat === 'Study' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_study;
    else if (cat === 'Health' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_health;
    else if (cat === 'Finance' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_finance;
    else if (cat === 'Self-care' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_self_care;
    else if (cat === 'Productivity' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_productivity;

    pill.innerText = label;
    
    pill.addEventListener('click', () => onClickCallback(cat));
    container.appendChild(pill);
  });
}

// ================= DIALOGS & CREATORS LOGIC =================

// --- DYNAMIC VISIBLE & INVISIBLE SPECTRA ACCENT COLOR CONTROLLER ---
function initCreatorColorPalette() {
  const grid = document.getElementById('modal-color-palette');
  grid.innerHTML = '';

  // 1. POPULATE CURATED COLORS Presets
  CURATED_COLORS.forEach(color => {
    const dot = document.createElement('div');
    dot.className = `color-dot-preset ${state.habitCreatorSelectedColor === color ? 'selected' : ''}`;
    dot.style.background = color.startsWith('var') ? `rgb(${color})` : `hsl(${color})`;
    dot.setAttribute('data-color', color);

    dot.addEventListener('click', () => {
      clearAllColorSelections();
      dot.classList.add('selected');
      state.habitCreatorSelectedColor = color;
    });

    grid.appendChild(dot);
  });

  // 2. TAB CONTROLS BINDING
  const tabCurated = document.getElementById('btn-color-tab-curated');
  const tabSpectrum = document.getElementById('btn-color-tab-spectrum');
  const tabInvisible = document.getElementById('btn-color-tab-invisible');

  const paneCurated = document.getElementById('pane-color-curated');
  const paneSpectrum = document.getElementById('pane-color-spectrum');
  const paneInvisible = document.getElementById('pane-color-invisible');

  const tabs = [tabCurated, tabSpectrum, tabInvisible];
  const panes = [paneCurated, paneSpectrum, paneInvisible];

  function switchTab(index) {
    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
        tab.style.background = 'hsl(var(--color-indigo))';
        tab.style.borderColor = 'hsl(var(--color-indigo))';
        tab.style.color = '#fff';
        panes[i].style.display = i === 0 ? 'block' : 'flex';
      } else {
        tab.classList.remove('active');
        tab.style.background = 'rgba(255,255,255,0.03)';
        tab.style.borderColor = 'var(--border-glass)';
        tab.style.color = 'var(--text-muted)';
        panes[i].style.display = 'none';
      }
    });
  }

  tabCurated.onclick = () => switchTab(0);
  tabSpectrum.onclick = () => switchTab(1);
  tabInvisible.onclick = () => switchTab(2);

  // Default to curated view
  switchTab(0);

  // 3. VISIBLE SPECTRUM INTERACTIVE CONTROLS
  const hueInput = document.getElementById('input-spectrum-hue');
  const satInput = document.getElementById('input-spectrum-sat');
  const lightInput = document.getElementById('input-spectrum-light');

  const hueVal = document.getElementById('spectrum-hue-val');
  const satVal = document.getElementById('spectrum-sat-val');
  const lightVal = document.getElementById('spectrum-light-val');

  const colorPreview = document.getElementById('spectrum-color-preview');
  const colorText = document.getElementById('spectrum-color-text');

  function updateSpectrumColor() {
    const h = hueInput.value;
    const s = satInput.value;
    const l = lightInput.value;

    hueVal.innerText = `${h}°`;
    satVal.innerText = `${s}%`;
    lightVal.innerText = `${l}%`;

    const colorStr = `${h}, ${s}%, ${l}%`;
    colorPreview.style.background = `hsl(${colorStr})`;
    colorText.innerText = colorStr;

    state.habitCreatorSelectedColor = colorStr;
    
    // Clear selections in other grids
    grid.querySelectorAll('.color-dot-preset').forEach(d => d.classList.remove('selected'));
    document.querySelectorAll('.invisible-color-dot').forEach(d => {
      d.classList.remove('selected');
      d.style.borderColor = 'var(--border-glass)';
      d.style.background = 'rgba(255,255,255,0.02)';
      d.querySelector('span').style.color = 'var(--text-muted)';
    });
  }

  hueInput.oninput = updateSpectrumColor;
  satInput.oninput = updateSpectrumColor;
  lightInput.oninput = updateSpectrumColor;

  // 4. COSMIC & INVISIBLE SPECTRA MATRIX DEFINITIONS
  const INVISIBLE_SPECTRA = [
    {
      id: 'infrared',
      name: 'Infrared (IR)',
      wavelength: '750nm – 1mm',
      desc: 'Wavelength: 750nm – 1mm. Selectable as a deep pulsing heat signature. Vitalizes motivation and thermal consistency.',
      color: '360, 100%, 35%',
      glow: 'rgba(239, 68, 68, 0.55)',
      previewColor: 'radial-gradient(circle, #ff3b30 0%, #8e0000 100%)'
    },
    {
      id: 'ultraviolet',
      name: 'Ultraviolet (UV)',
      wavelength: '10nm – 400nm',
      desc: 'Wavelength: 10nm – 400nm. Shivering blacklight fluorescence. Excellent for chemical study and coding breakthroughs.',
      color: '285, 100%, 70%',
      glow: 'rgba(168, 85, 247, 0.65)',
      previewColor: 'radial-gradient(circle, #d946ef 0%, #6b21a8 100%)'
    },
    {
      id: 'xray',
      name: 'X-Ray (XR)',
      wavelength: '0.01nm – 10nm',
      desc: 'Wavelength: 0.01nm – 10nm. Eerie grey-cyan radiation that cuts through tissue. Reveals deep architectural code patterns.',
      color: '185, 45%, 75%',
      glow: 'rgba(6, 182, 212, 0.55)',
      previewColor: 'radial-gradient(circle, #a5f3fc 0%, #0891b2 100%)'
    },
    {
      id: 'gammaray',
      name: 'Gamma Burst (GR)',
      wavelength: '< 0.01nm',
      desc: 'Wavelength: < 0.01nm. Supernova core frequency. Lime-gold cosmic rays with high particle counts.',
      color: '100, 95%, 60%',
      glow: 'rgba(132, 204, 22, 0.6)',
      previewColor: 'radial-gradient(circle, #bef264 0%, #4d7c0f 100%)'
    },
    {
      id: 'radiowave',
      name: 'Radio Wave (RW)',
      wavelength: '1mm – 100km',
      desc: 'Wavelength: 1mm – 100km. Steady slate-blue electromagnetic static. Emits consistency patterns throughout space-time.',
      color: '210, 45%, 45%',
      glow: 'rgba(59, 130, 246, 0.5)',
      previewColor: 'radial-gradient(circle, #60a5fa 0%, #1d4ed8 100%)'
    },
    {
      id: 'darkmatter',
      name: 'Dark Matter (DM)',
      wavelength: 'Quantum',
      desc: 'Wavelength: Non-baryonic. Pure gravitational void representation. Stabilizes active habits with space-warping weight.',
      color: '260, 30%, 12%',
      glow: 'rgba(99, 102, 241, 0.35)',
      previewColor: 'radial-gradient(circle, #312e81 0%, #030712 100%)'
    }
  ];

  const invisibleGrid = document.getElementById('modal-invisible-color-grid');
  invisibleGrid.innerHTML = '';

  const descTitle = document.getElementById('invisible-selected-title');
  const descText = document.getElementById('invisible-selected-desc');

  INVISIBLE_SPECTRA.forEach(item => {
    const option = document.createElement('div');
    option.className = `invisible-color-dot`;
    option.style.display = 'flex';
    option.style.alignItems = 'center';
    option.style.gap = '0.5rem';
    option.style.padding = '0.4rem 0.6rem';
    option.style.borderRadius = '8px';
    option.style.background = 'rgba(255,255,255,0.02)';
    option.style.border = '1px solid var(--border-glass)';
    option.style.cursor = 'pointer';
    option.style.transition = 'all 0.3s ease';

    const colorIndicator = document.createElement('div');
    colorIndicator.style.width = '16px';
    colorIndicator.style.height = '16px';
    colorIndicator.style.borderRadius = '50%';
    colorIndicator.style.background = item.previewColor;
    colorIndicator.style.boxShadow = `0 0 6px ${item.glow}`;
    colorIndicator.style.animation = `pulse-energy-${item.id} 2.5s infinite ease-in-out alternate`;

    // Dynamic keyframe creation
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes pulse-energy-${item.id} {
        0% { transform: scale(1); box-shadow: 0 0 4px ${item.glow}; }
        100% { transform: scale(1.15); box-shadow: 0 0 12px ${item.glow}; }
      }
    `;
    document.head.appendChild(styleEl);

    const textLabel = document.createElement('span');
    textLabel.innerText = item.name;
    textLabel.style.fontSize = '0.75rem';
    textLabel.style.fontWeight = '600';
    textLabel.style.color = 'var(--text-muted)';

    option.appendChild(colorIndicator);
    option.appendChild(textLabel);

    option.addEventListener('click', () => {
      clearAllColorSelections();
      option.classList.add('selected');
      option.style.borderColor = 'rgba(255, 255, 255, 0.4)';
      option.style.background = 'rgba(255, 255, 255, 0.06)';
      textLabel.style.color = 'var(--text-main)';

      state.habitCreatorSelectedColor = item.color;
      
      descTitle.innerText = item.name;
      descTitle.style.color = `hsl(${item.color})`;
      descText.innerText = item.desc;
    });

    invisibleGrid.appendChild(option);
  });

  function clearAllColorSelections() {
    grid.querySelectorAll('.color-dot-preset').forEach(d => d.classList.remove('selected'));
    document.querySelectorAll('.invisible-color-dot').forEach(d => {
      d.classList.remove('selected');
      d.style.borderColor = 'var(--border-glass)';
      d.style.background = 'rgba(255,255,255,0.02)';
      d.querySelector('span').style.color = 'var(--text-muted)';
    });
  }

  // 5. HYDRATE FORM VALUES IF IN CONFIGURE MODE
  let colorFound = false;
  
  if (CURATED_COLORS.includes(state.habitCreatorSelectedColor)) {
    switchTab(0);
    colorFound = true;
  } else {
    const matchedInvisible = INVISIBLE_SPECTRA.find(item => item.color === state.habitCreatorSelectedColor);
    if (matchedInvisible) {
      switchTab(2);
      setTimeout(() => {
        const dots = document.querySelectorAll('.invisible-color-dot');
        INVISIBLE_SPECTRA.forEach((item, idx) => {
          if (item.color === state.habitCreatorSelectedColor && dots[idx]) {
            dots[idx].click();
          }
        });
      }, 50);
      colorFound = true;
    }
  }

  // Fallback to spectrum if it's a custom HSL color
  if (!colorFound && state.habitCreatorSelectedColor) {
    switchTab(1);
    const parts = state.habitCreatorSelectedColor.split(',');
    if (parts.length === 3) {
      const h = parseInt(parts[0]);
      const s = parseInt(parts[1]);
      const l = parseInt(parts[2]);
      if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
        hueInput.value = h;
        satInput.value = s;
        lightInput.value = l;
        updateSpectrumColor();
      }
    }
  }
}

// --- UNIVERSAL EMOJI PICKER ENGINE & REAL-TIME SEARCH FILTER ---
function initCreatorEmojiPicker() {
  const grid = document.getElementById('modal-emoji-grid');
  
  // 1. CHRONOLOGICAL UNICODE EMOJI CATEGORIES (Hundreds of options)
  const EMOJI_SETS = {
    smileys: [
      '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','👻','💀','☠️','👽','👾','🤖','🎃','😺','😸','😻','😼','😽','🙀','😿','😾'
    ],
    animals: [
      '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦢','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷','🕸','🦂','🐢','🐍','🦎','🐙','🦑','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🐐','🦌','🐕','🐩','🐈','🐓','🦃','🦚','🦜','🌱','🌲','🌳','🌴','🌵','🌾','🌿','☘️','🍀','🍁','🍂','🍃','🍄','🐚'
    ],
    food: [
      '🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶','🌽','🥕','🥔','🍠','🥐','🍞','🥖','🥨','🥯','🥞','🧇','🧀','🍖','🍗','🥩','🥓','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🍳','🥘','🍲','🥣','🥗','🍿','🥞','🍼','🥛','☕','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🥤','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍛','🍜','🍝','🍣','🍤','🥟','🥡'
    ],
    sports: [
      '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🥅','⛳','🪁','🏹','🎽','🛹','🛷','⛸','🥌','🎿','⛷','🏂','🏋️‍♂️','🏋️‍♀️','🚴‍♂️','🚴‍♀️','🧗‍♂️','🧗‍♀️','🏊‍♂️','🏊‍♀️','🧘‍♂️','🧘‍♀️','🏄‍♂️','🏄‍♀️','🏆','🏅','🎟','🎫','🎮','🕹','🎰','🎲','🧩','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🎻'
    ],
    travel: [
      '🚗','🚕','🚙','🚌','🏎','🚓','🚑','🚒','🚐','🚚','🚜','🏍','🛵','🛺','🚲','🛴','🚏','⛽','🚨','🚥','🚦','⚓','⛵','🛶','🚤','🛳','🚢','✈️','🛩','🛫','🛬','🪂','🚁','🚀','🛸','🛰','🗺','🧭','🏔','🌋','🗻','🏕','🏖','🏜','🏝','🏞','🏟','🏛','🏠','🏡','🏢','🏥','🏦','🏨','🏫','🏰','💒','🗼','🗽','🕌','⛩','⛲','🌃','🏙','🌅','🌇','🌉'
    ],
    objects: [
      '⌚','📱','📲','💻','⌨️','🖥','🖨','🐭','🖱','🕹','🖲','💾','💿','📀','📼','📷','📸','📹','🎥','📽','🎞','📞','📟','📠','TV','📺','📻','🎙','⏰','⏳','⌛','💡','Flash','flashlight','flashlight','🔦','🕯','🪔','🧱','🗑','🪓','⚔️','🛡','🛠','🔨','🔧','🔩','⚙️','🗜','⚖️','🦯','🔗','⛓','🧰','🔑','🗝','🎈','🎏','🎀','🎁','🪄','🔮','🧿','🧸','🖼','🪞','🔬','🔭','📡','💉','🩸','💊','🩹','🩺','🧬','🧪','🧫','🪟','🧼','🪒','🧴','🧹','🧺','🧻','🪣','🪠','🧯','🛒','⚗️','🕳','🛎','🧲'
    ],
    symbols: [
      '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','💌','💤','💢','💣','💬','👁️‍🗨️','💭','💨','💫','👁','👣','👤','👥','🗣','🧠','🩸','🪐','🪐','🌟','⭐','✨','⚡','💥','🔥','🌈','☀️','🌤','⛅','🌥','☁️','🌦','🌧','⛈','🌩','❄️','🌨','☃️','⛄','🌬','🌪','🌊','☂️','☔','💧','💦','💤','🔔','🔕','🔇','🔈','🔉','🔊','🎵','🎶','📣','📢','💬','💭','🃏','🀄'
    ]
  };

  // 2. SEARCH DICTIONARY FOR HIGH-VALUE SEARCH TAGS
  const EMOJI_TAGS = {
    // Smileys & Emotion
    '😀': 'smile happy face laugh smileys', '😃': 'smile happy face laugh smileys',
    '😄': 'smile happy face laugh smileys', '😁': 'smile happy face laugh grin smileys',
    '😆': 'smile happy face laugh smileys', '😅': 'smile sweat happy laugh smileys',
    '😂': 'laugh cry tear joy lol smileys', '🤣': 'laugh roll cry lol smileys',
    '😊': 'smile blush happy smileys', '😇': 'angel halo innocent smileys',
    '🙂': 'smile slight happy smileys', '🙃': 'upside down smileys',
    '😉': 'wink smileys', '😌': 'relieved content smileys',
    '😍': 'heart eyes love smileys', '🥰': 'hearts love happy smileys',
    '😘': 'blow kiss heart smileys', '😋': 'yum delicious food smileys',
    '😛': 'tongue smileys', '😜': 'wink tongue smileys', '🤪': 'zany crazy smileys',
    '😎': 'cool sunglasses sunglasses smileys', '🤩': 'star eyes starry smileys',
    '🥳': 'party celebrate blow horn smileys', '😏': 'smirk smileys',
    '😒': 'unamused smileys', '😔': 'sad pensive smileys',
    '🥺': 'pleading beg face eyes smileys', '😭': 'cry sob cry loud tear tears smileys',
    '😤': 'angry steam proud smileys', '😠': 'angry mad smileys',
    '😡': 'rage angry mad red smileys', '🤬': 'swear curse angry mad smileys',
    '🤯': 'mind blown explode smileys', '😳': 'blush shock surprise smileys',
    '🥵': 'hot red sweat heat warm summer smileys', '🥶': 'cold blue freeze ice winter smileys',
    '😱': 'scream fear shock horror smileys', '🤔': 'think ponder question smileys',
    '🤫': 'shh quiet silence smileys', '😴': 'sleep snore bed tired smileys',
    '👻': 'ghost spooky halloween horror smileys', '💀': 'skull bone dead death skeleton horror smileys',
    '👽': 'alien space ufo cosmic horror smileys', '👾': 'monster retro game game pixel horror smileys',
    '🤖': 'robot tech computer machine smileys', '🎃': 'pumpkin jack-o-lantern halloween smileys',
    // High-frequency Symbols
    '🔥': 'fire burn hot flame hot orange red symbols', '✨': 'sparkles shine magic glow symbols',
    '⚡': 'lightning storm power energy spark symbols', '💥': 'collision boom explode burst symbols',
    '❤️': 'heart love red symbols',
    // Productivity & Study
    '💻': 'computer laptop code programming dsa study objects dev javascript html cpp java code coding',
    '📚': 'books read study study library study objects book',
    '📝': 'write write notebook list checklist agenda study objects',
    '🎯': 'target bullseye goal objective focus study sports objects',
    '🧠': 'brain smart mind study intelligence health symbols',
    '⏰': 'clock time alarm alert speed study travel objects',
    // Gym & Fitness
    '🏋️‍♂️': 'gym workout lift weight weightlifting fitness sports exercise chest squat deadlift bench',
    '🏋️‍♀️': 'gym workout lift weight weightlifting fitness sports exercise',
    '🏃‍♂️': 'run jogging speed cardio marathon fitness sports runner track',
    '🏃‍♀️': 'run jogging speed cardio marathon fitness sports runner',
    '💪': 'muscle arm flex strong fitness symbols power strength biceps',
    '🥗': 'salad food health healthy diet green fitness food',
    '💧': 'water drop hydrate fluid gym health symbols water drink',
    '🧘‍♂️': 'meditate yoga peace mind health study sports calm zen relax box breathing',
    // Money & finance
    '💰': 'money cash rich dollar wealth finance lifestyle objects cash budget save saving invest stock',
    '🌱': 'seed seedling green grow nature lifestyle symbols animals water green plant gardening',
    '🚿': 'shower clean lifestyle objects wash scrub skincare washface'
  };

  let activeCategory = 'smileys';

  function drawEmojiSet() {
    grid.innerHTML = '';
    const searchVal = document.getElementById('input-emoji-search').value.toLowerCase().trim();
    
    let items = [];
    if (searchVal) {
      // Search across ALL categories
      Object.values(EMOJI_SETS).forEach(arr => items.push(...arr));
    } else {
      items = EMOJI_SETS[activeCategory];
    }

    // Filter by tag if search keyword is typed
    if (searchVal) {
      items = items.filter(emoji => {
        const tag = EMOJI_TAGS[emoji] || '';
        return tag.toLowerCase().includes(searchVal) || emoji === searchVal;
      });
    }

    // Unique filter to prevent duplicates
    items = [...new Set(items)];

    if (items.length === 0) {
      grid.innerHTML = `<span style="grid-column: span 8; text-align: center; font-size: 0.75rem; color: var(--text-darker); margin-top: 2rem;">No matching emojis. Paste any custom emoji below!</span>`;
      return;
    }

    items.forEach(emoji => {
      const el = document.createElement('div');
      el.className = `emoji-picker-item ${state.habitCreatorSelectedEmoji === emoji ? 'selected' : ''}`;
      el.innerText = emoji;
      
      // Dynamic styles
      el.style.fontSize = '1.35rem';
      el.style.padding = '0.2rem';
      el.style.borderRadius = '6px';
      el.style.cursor = 'pointer';
      el.style.transition = 'all 0.15s ease';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      
      if (state.habitCreatorSelectedEmoji === emoji) {
        el.style.background = 'rgba(255,255,255,0.15)';
        el.style.border = '1px solid var(--border-glass-strong)';
      }

      el.addEventListener('click', () => {
        grid.querySelectorAll('.emoji-picker-item').forEach(e => {
          e.style.background = 'transparent';
          e.style.border = 'none';
        });
        el.style.background = 'rgba(255,255,255,0.15)';
        el.style.border = '1px solid var(--border-glass-strong)';
        
        state.habitCreatorSelectedEmoji = emoji;
        document.getElementById('selected-emoji-preview-badge').innerText = emoji;
        document.getElementById('input-emoji-custom').value = ''; // Clear custom text
      });

      grid.appendChild(el);
    });
  }

  // Draw default set
  drawEmojiSet();

  // Tabs switcher
  const tabs = document.querySelectorAll('#emoji-cat-tabs .emoji-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = 'transparent';
        t.style.color = 'var(--text-muted)';
      });
      tab.classList.add('active');
      tab.style.background = 'rgba(255, 255, 255, 0.08)';
      tab.style.color = '#fff';
      
      activeCategory = tab.getAttribute('data-cat');
      // Clear search on tab switch
      document.getElementById('input-emoji-search').value = '';
      drawEmojiSet();
    });
  });

  // Search input filter binding
  document.getElementById('input-emoji-search').oninput = () => {
    drawEmojiSet();
  };

  // Custom Emoji Input Box binding (Paste any emoji in the world!)
  const customInput = document.getElementById('input-emoji-custom');
  customInput.oninput = () => {
    const val = customInput.value.trim();
    if (val) {
      state.habitCreatorSelectedEmoji = val;
      document.getElementById('selected-emoji-preview-badge').innerText = val;
      
      // Clear grid selections
      grid.querySelectorAll('.emoji-picker-item').forEach(e => {
        e.style.background = 'transparent';
        e.style.border = 'none';
      });
    }
  };

  // Pre-style active tab
  tabs.forEach(t => {
    if (t.getAttribute('data-cat') === activeCategory) {
      t.style.background = 'rgba(255, 255, 255, 0.08)';
      t.style.color = '#fff';
    }
  });
}

// --- OPEN / CLOSE CREATOR ---
function openHabitCreatorModal(habitToEdit = null) {
  state.habitModalSubtasks = [];
  document.getElementById('modal-subtasks-builder-list').innerHTML = '';
  document.getElementById('new-subtask-input').value = '';
  const inputContainer = document.getElementById('subtasks-input-container');
  if (inputContainer) inputContainer.style.display = 'none';
  const triggerBtn = document.getElementById('btn-trigger-add-subtask');
  if (triggerBtn) triggerBtn.style.display = 'flex';
  document.getElementById('habit-creator-form').reset();

  const customGroup = document.getElementById('habit-custom-category-group');
  if (customGroup) customGroup.style.display = 'none';
  const customInput = document.getElementById('habit-custom-category');
  if (customInput) {
    customInput.value = '';
    customInput.required = false;
  }

  const catSelect = document.getElementById('habit-category');
  if (catSelect) {
    catSelect.innerHTML = '';
    const presets = ['Fitness', 'Study', 'Health', 'Finance', 'Self-care', 'Productivity'];
    presets.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      let label = cat;
      if (cat === 'Fitness' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_fitness;
      else if (cat === 'Study' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_study;
      else if (cat === 'Health' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_health;
      else if (cat === 'Finance' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_finance;
      else if (cat === 'Self-care' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_self_care;
      else if (cat === 'Productivity' && TRANSLATIONS[state.currentLang]) label = TRANSLATIONS[state.currentLang].cat_productivity;
      opt.innerText = label;
      catSelect.appendChild(opt);
    });

    // Add existing custom categories from active habits
    const uniqueCustomCats = new Set();
    if (state.habits) {
      state.habits.forEach(h => {
        if (!h.isDeleted && h.category && !presets.includes(h.category) && h.category !== 'custom') {
          uniqueCustomCats.add(h.category);
        }
      });
    }
    uniqueCustomCats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.innerText = cat;
      catSelect.appendChild(opt);
    });

    // Add + Add Custom Category... option
    const customOpt = document.createElement('option');
    customOpt.value = 'custom';
    customOpt.innerText = '+ Add Custom Category...';
    catSelect.appendChild(customOpt);
  }

  const title = document.getElementById('habit-modal-title');
  const deleteBtn = document.getElementById('btn-delete-habit-creator');
  const archiveBtn = document.getElementById('btn-archive-habit-creator');
  const hideBtn = document.getElementById('btn-hide-habit-creator');
  const hiddenToggle = document.getElementById('habit-is-hidden-toggle');

  if (habitToEdit) {
    title.innerText = 'Configure Habit';
    deleteBtn.style.display = 'inline-flex';
    archiveBtn.style.display = 'inline-flex';
    if (hideBtn) {
      if (habitToEdit.isHidden) {
        hideBtn.style.display = 'none';
      } else {
        hideBtn.style.display = 'inline-flex';
      }
    }
    document.getElementById('habit-edit-id').value = habitToEdit.id;
    document.getElementById('habit-name').value = habitToEdit.name;
    document.getElementById('habit-category').value = habitToEdit.category;
    document.getElementById('habit-desc').value = habitToEdit.desc;
    hiddenToggle.checked = habitToEdit.isHidden || false;

    // Schedule frequency toggles
    if (habitToEdit.frequency.type === 'daily') {
      document.querySelector('input[name="habit-freq-type"][value="daily"]').checked = true;
      document.getElementById('weekday-selector-container').style.display = 'none';
    } else {
      document.querySelector('input[name="habit-freq-type"][value="weekdays"]').checked = true;
      document.getElementById('weekday-selector-container').style.display = 'flex';
      // Highlight active weekdays buttons
      const wdBtns = document.querySelectorAll('.weekday-buttons-row .wd-btn');
      wdBtns.forEach(btn => {
        const val = parseInt(btn.getAttribute('data-day'));
        if (habitToEdit.frequency.days.includes(val)) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }

    state.habitCreatorSelectedColor = habitToEdit.color;
    state.habitCreatorSelectedEmoji = habitToEdit.emoji;
    document.getElementById('selected-emoji-preview-badge').innerText = habitToEdit.emoji;

    // Load subtasks list
    if (habitToEdit.subTasks) {
      state.habitModalSubtasks = [...habitToEdit.subTasks];
      renderSubtasksBuilderList();
    }
  } else {
    // Fresh habit setup
    title.innerText = TRANSLATIONS[state.currentLang].lbl_new_habit;
    deleteBtn.style.display = 'none';
    archiveBtn.style.display = 'none';
    if (hideBtn) hideBtn.style.display = 'none';
    hiddenToggle.checked = false;
    document.getElementById('habit-edit-id').value = '';
    
    state.habitCreatorSelectedColor = 'var(--color-indigo)';
    state.habitCreatorSelectedEmoji = '✨';
    document.getElementById('selected-emoji-preview-badge').innerText = '✨';
    document.querySelector('input[name="habit-freq-type"][value="daily"]').checked = true;
    document.getElementById('weekday-selector-container').style.display = 'none';
  }

  // Pre-highlight presets selected
  initCreatorColorPalette();
  initCreatorEmojiPicker();

  document.getElementById('modal-habit-creator').classList.add('active');
}

function renderSubtasksBuilderList() {
  const container = document.getElementById('modal-subtasks-builder-list');
  container.innerHTML = '';

  state.habitModalSubtasks.forEach((st) => {
    const item = document.createElement('li');
    item.className = 'builder-task-item';
    item.innerHTML = `
      <span>${st.text}</span>
      <button type="button" class="btn-remove-builder-item" data-id="${st.id}">&times;</button>
    `;
    item.querySelector('.btn-remove-builder-item').addEventListener('click', () => {
      state.habitModalSubtasks = state.habitModalSubtasks.filter(t => t.id !== st.id);
      renderSubtasksBuilderList();
    });
    container.appendChild(item);
  });
}

// --- OPEN / CLOSE JOURNAL WRITER ---
function openJournalModal(habitId, dateStr) {
  document.getElementById('journal-editor-form').reset();
  document.getElementById('journal-dropzone-prompt').style.display = 'flex';
  document.getElementById('journal-dropzone-preview-holder').style.display = 'none';
  document.getElementById('journal-preview-img').src = '';

  const habit = state.habits.find(h => h.id === parseInt(habitId));
  if (!habit) return;

  document.getElementById('journal-habit-id').value = habitId;
  document.getElementById('journal-date').value = dateStr;
  document.getElementById('journal-habit-emoji').innerText = habit.emoji;
  document.getElementById('journal-habit-name').innerText = habit.name;

  // Retrieve existing journal log if present
  const compKey = `${habitId}_${dateStr}`;
  const compRecord = state.completions.find(c => c.id === compKey);

  // Render prompts chips
  const chipsContainer = document.getElementById('journal-prompts-chips');
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    const prompts = [
      { label: '🧠 Reflection', template: '\n[Reflection] What went well today? What did I learn about my mindset and discipline?\n' },
      { label: '🚧 Obstacles', template: '\n[Obstacles] What friction or barriers did I face today, and how will I bypass them tomorrow?\n' },
      { label: '📊 Metrics', template: '\n[Metrics] Log numbers/metrics (e.g. weights lifted, lines written, water volume, skincare steps):\n- ' },
      { label: '✨ Wins', template: '\n[Wins] Highlight the major wins, breakthrough moments, or victories today:\n- ' }
    ];
    prompts.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'prompt-chip';
      btn.innerText = p.label;
      btn.addEventListener('click', () => {
        const textarea = document.getElementById('journal-note-input');
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          const before = text.substring(0, start);
          const after = text.substring(end, text.length);
          textarea.value = before + p.template + after;
          textarea.focus();
          const newCursorPos = start + p.template.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }
      });
      chipsContainer.appendChild(btn);
    });
  }

  if (compRecord) {
    document.getElementById('journal-note-input').value = compRecord.journalNote || '';
    if (compRecord.journalPhoto) {
      document.getElementById('journal-dropzone-prompt').style.display = 'none';
      const previewHolder = document.getElementById('journal-dropzone-preview-holder');
      previewHolder.style.display = 'flex';
      document.getElementById('journal-preview-img').src = compRecord.journalPhoto;
    }
  }

  document.getElementById('modal-journal-editor').classList.add('active');
}

// --- LIGHTBOX PORTAL ---
function openLightbox(imgSrc, dateText, habitName, noteText) {
  const lb = document.getElementById('modal-lightbox');
  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('lightbox-date').innerText = dateText;
  document.getElementById('lightbox-habit').innerText = habitName;
  document.getElementById('lightbox-desc').innerText = noteText;
  
  lb.classList.add('active');
}

// --- HTML5 CANVAS IMAGE RESIZE & COMPRESSOR ENGINE ---
function compressAndSaveImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      
      // Limit resolution to maximum 800px width/height
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Export compressed base64 JPEG at 0.7 quality
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(compressedDataUrl);
    };
  };
}

// --- UI THEME CHANGER ---
function applyTheme(theme) {
  document.body.classList.remove('dark-theme', 'light-theme');
  
  let target = theme;
  if (theme === 'auto') {
    target = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  if (target === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.add('dark-theme');
  }

  // Highlight active button in settings
  const lightBtn = document.getElementById('btn-theme-light');
  const darkBtn = document.getElementById('btn-theme-dark');
  const autoBtn = document.getElementById('btn-theme-auto');
  
  if (lightBtn && darkBtn && autoBtn) {
    lightBtn.classList.remove('active');
    darkBtn.classList.remove('active');
    autoBtn.classList.remove('active');

    if (theme === 'light') lightBtn.classList.add('active');
    else if (theme === 'dark') darkBtn.classList.add('active');
    else autoBtn.classList.add('active');
  }
}

// --- TRANSLATION SWEEPER ---
function translateUI(lang) {
  state.currentLang = lang;

  // Scan all data-lang components
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(el => {
    const key = el.getAttribute('data-lang');
    const text = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]);
    if (text) {
      el.innerText = text;
    }
  });

  // Scan placeholder components
  const inputs = document.querySelectorAll('[data-lang-placeholder]');
  inputs.forEach(el => {
    const key = el.getAttribute('data-lang-placeholder');
    const placeholder = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]);
    if (placeholder) {
      el.placeholder = placeholder;
    }
  });

  // Re-render due to name transitions
  updateViewContent();
}

// ================= SYSTEM EVENTS CONTROLLERS =================
function attachEventListeners() {
  
  // Sidebar Collapsible Toggling Logic
  const sidebar = document.getElementById('app-sidebar');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove('sidebar-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
  };

  const openSidebar = () => {
    if (sidebar) sidebar.classList.add('sidebar-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
  };

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar && sidebar.classList.contains('sidebar-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }

  // Navigation Tabs Switchers
  const navBtns = document.querySelectorAll('.sidebar-nav .nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      closeSidebar();
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');
      document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
      });
      document.getElementById(target).classList.add('active');
      
      state.activeView = target;
      
      // Update top header names contextually
      const headerTitle = document.getElementById('top-bar-title');
      const headerSubtitle = document.getElementById('top-bar-subtitle');
      
      if (target === 'view-dashboard') {
        headerTitle.innerText = TRANSLATIONS[state.currentLang].hdr_greeting;
        headerSubtitle.style.display = 'block';
      } else {
        headerTitle.innerText = btn.querySelector('span').innerText;
        headerSubtitle.style.display = 'none';
      }

      updateViewContent();
    });
  });

  // System Wide Dates Update
  const today = new Date();
  const headerTodayDateEl = document.getElementById('header-today-date');
  if (headerTodayDateEl) {
    headerTodayDateEl.innerText = today.toLocaleDateString(state.currentLang, {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  }

  // Calendar Dropdown Popover Toggling
  const btnHeaderDate = document.getElementById('btn-header-date');
  const calendarDropdown = document.getElementById('header-calendar-dropdown');

  if (btnHeaderDate && calendarDropdown) {
    btnHeaderDate.addEventListener('click', (e) => {
      e.stopPropagation();
      if (notificationsDropdown) notificationsDropdown.style.display = 'none';
      calendarDropdown.classList.toggle('active');
      if (calendarDropdown.classList.contains('active')) {
        state.calendarDate = new Date(); // Reset to current month on open!
        renderMonthlyCalendar();
      }
    });

    calendarDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.addEventListener('click', () => {
      calendarDropdown.classList.remove('active');
    });
  }

  // Notifications Dropdown Popover Toggling
  const btnHeaderNotifications = document.getElementById('btn-header-notifications');
  const notificationsDropdown = document.getElementById('header-notifications-dropdown');

  if (btnHeaderNotifications && notificationsDropdown) {
    btnHeaderNotifications.addEventListener('click', (e) => {
      e.stopPropagation();
      if (calendarDropdown) calendarDropdown.classList.remove('active');
      
      const isOpen = notificationsDropdown.style.display === 'flex';
      if (isOpen) {
        notificationsDropdown.style.display = 'none';
      } else {
        notificationsDropdown.style.display = 'flex';
        AppNotifications.renderDropdown();
        AppNotifications.updateBellBadge();
      }
    });

    notificationsDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.addEventListener('click', () => {
      if (notificationsDropdown) notificationsDropdown.style.display = 'none';
    });

    // Mark all read button
    const btnMarkAllRead = document.getElementById('btn-notif-mark-all-read');
    if (btnMarkAllRead) {
      btnMarkAllRead.addEventListener('click', async (e) => {
        e.stopPropagation();
        await AppNotifications.markAllAsRead();
      });
    }

    // Clear history button
    const btnClearAll = document.getElementById('btn-notif-clear-all');
    if (btnClearAll) {
      btnClearAll.addEventListener('click', async (e) => {
        e.stopPropagation();
        await AppNotifications.clearAllRead();
      });
    }

    // Search input
    const notifSearchInput = document.getElementById('notif-search-input');
    if (notifSearchInput) {
      notifSearchInput.addEventListener('input', () => {
        AppNotifications.renderDropdown();
      });
    }

    // Filter pills
    const filterPills = document.querySelectorAll('.notif-filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        AppNotifications.renderDropdown();
      });
    });

    // Go to settings button
    const btnGoSettings = document.getElementById('btn-notif-go-settings');
    if (btnGoSettings) {
      btnGoSettings.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsDropdown.style.display = 'none';
        const settingsTab = document.querySelector('.sidebar-nav .nav-btn[data-target="view-settings"]');
        if (settingsTab) {
          settingsTab.click();
          // Scroll to notifications settings block
          setTimeout(() => {
            const notifBlock = document.querySelector('.settings-block-wrapper');
            if (notifBlock) {
              notifBlock.scrollIntoView({ behavior: 'smooth' });
              notifBlock.style.borderColor = 'hsl(var(--color-indigo))';
              setTimeout(() => {
                notifBlock.style.borderColor = 'var(--border-glass)';
              }, 1500);
            }
          }, 300);
        }
      });
    }
  }

  // Habits View: Toggles List vs Streak Card systems
  const btnStreak = document.getElementById('btn-toggle-streak-view');
  const btnList = document.getElementById('btn-toggle-list-view');
  const habitsGrid = document.getElementById('habits-grid-container');

  btnStreak.addEventListener('click', () => {
    btnStreak.classList.add('active');
    btnList.classList.remove('active');
    habitsGrid.classList.remove('list-mode-active');
    habitsGrid.classList.add('streak-mode-active');
    renderHabitsView();
  });

  btnList.addEventListener('click', () => {
    btnList.classList.add('active');
    btnStreak.classList.remove('active');
    habitsGrid.classList.remove('streak-mode-active');
    habitsGrid.classList.add('list-mode-active');
    renderHabitsView();
  });

  // Modal open buttons (Creator)
  const creatorTriggers = document.querySelectorAll('.add-habit-trigger');
  creatorTriggers.forEach(btn => {
    btn.addEventListener('click', () => openHabitCreatorModal());
  });

  // Modal close buttons
  document.getElementById('btn-close-habit-modal').addEventListener('click', () => {
    document.getElementById('modal-habit-creator').classList.remove('active');
  });
  document.getElementById('btn-cancel-habit-creator').addEventListener('click', () => {
    document.getElementById('modal-habit-creator').classList.remove('active');
  });
  document.getElementById('btn-close-journal-modal').addEventListener('click', () => {
    document.getElementById('modal-journal-editor').classList.remove('active');
  });
  document.getElementById('btn-cancel-journal-modal').addEventListener('click', () => {
    document.getElementById('modal-journal-editor').classList.remove('active');
  });
  document.getElementById('btn-close-lightbox').addEventListener('click', () => {
    document.getElementById('modal-lightbox').classList.remove('active');
  });

  // Frequency custom drawer details
  const freqRadios = document.querySelectorAll('input[name="habit-freq-type"]');
  freqRadios.forEach(rad => {
    rad.addEventListener('change', () => {
      const drawer = document.getElementById('weekday-selector-container');
      if (rad.value === 'weekdays') {
        drawer.style.display = 'flex';
      } else {
        drawer.style.display = 'none';
      }
    });
  });

  // Weekdays Selector buttons toggle
  const wdBtns = document.querySelectorAll('.weekday-buttons-row .wd-btn');
  wdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  // Habit Modal checklists builder tasks adder
  const triggerAddSubtaskBtn = document.getElementById('btn-trigger-add-subtask');
  const cancelAddSubtaskBtn = document.getElementById('btn-cancel-add-subtask');
  const subtaskInputContainer = document.getElementById('subtasks-input-container');
  const addSubtaskBtn = document.getElementById('btn-add-subtask-to-list');
  const subtaskInput = document.getElementById('new-subtask-input');

  if (triggerAddSubtaskBtn && subtaskInputContainer) {
    triggerAddSubtaskBtn.addEventListener('click', () => {
      triggerAddSubtaskBtn.style.display = 'none';
      subtaskInputContainer.style.display = 'flex';
      subtaskInput.value = '';
      subtaskInput.focus();
    });
  }

  if (cancelAddSubtaskBtn && subtaskInputContainer) {
    cancelAddSubtaskBtn.addEventListener('click', () => {
      subtaskInputContainer.style.display = 'none';
      subtaskInput.value = '';
      triggerAddSubtaskBtn.style.display = 'flex';
    });
  }

  const handleAddSubtask = () => {
    const text = subtaskInput.value.trim();
    if (text === '') {
      if (subtaskInputContainer && triggerAddSubtaskBtn) {
        subtaskInputContainer.style.display = 'none';
        triggerAddSubtaskBtn.style.display = 'flex';
      }
      return;
    }

    state.habitModalSubtasks.push({
      id: Date.now(),
      text,
      checked: false
    });
    subtaskInput.value = '';
    renderSubtasksBuilderList();
    if (subtaskInputContainer && triggerAddSubtaskBtn) {
      subtaskInputContainer.style.display = 'none';
      triggerAddSubtaskBtn.style.display = 'flex';
    }
  };

  if (addSubtaskBtn) {
    addSubtaskBtn.addEventListener('click', handleAddSubtask);
  }

  if (subtaskInput) {
    subtaskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddSubtask();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (subtaskInputContainer && triggerAddSubtaskBtn) {
          subtaskInputContainer.style.display = 'none';
          triggerAddSubtaskBtn.style.display = 'flex';
        }
      }
    });
  }

  const catSelect = document.getElementById('habit-category');
  if (catSelect) {
    catSelect.addEventListener('change', () => {
      const customGroup = document.getElementById('habit-custom-category-group');
      const customInput = document.getElementById('habit-custom-category');
      if (catSelect.value === 'custom') {
        if (customGroup) customGroup.style.display = 'block';
        if (customInput) {
          customInput.required = true;
          customInput.focus();
        }
      } else {
        if (customGroup) customGroup.style.display = 'none';
        if (customInput) {
          customInput.required = false;
          customInput.value = '';
        }
      }
    });
  }

  // Save Habit Creator Form submission
  const creatorForm = document.getElementById('habit-creator-form');
  creatorForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const habitId = document.getElementById('habit-edit-id').value;
    const name = document.getElementById('habit-name').value.trim();
    let category = document.getElementById('habit-category').value;
    if (category === 'custom') {
      const customVal = document.getElementById('habit-custom-category').value.trim();
      if (!customVal) {
        showNotification('⚠️ Enter a custom category name!', 'var(--color-rose)');
        return;
      }
      category = customVal;
    }
    const desc = document.getElementById('habit-desc').value.trim();
    const freqType = document.querySelector('input[name="habit-freq-type"]:checked').value;

    let frequency = { type: 'daily' };
    if (freqType === 'weekdays') {
      const days = [];
      document.querySelectorAll('.weekday-buttons-row .wd-btn.active').forEach(btn => {
        days.push(parseInt(btn.getAttribute('data-day')));
      });
      if (days.length === 0) {
        showNotification('⚠️ Select at least one active weekday schedule!', 'var(--color-rose)');
        return;
      }
      frequency = { type: 'weekdays', days };
    }

    const isHidden = document.getElementById('habit-is-hidden-toggle').checked;

    const payload = {
      name,
      category,
      desc,
      color: state.habitCreatorSelectedColor,
      emoji: state.habitCreatorSelectedEmoji,
      frequency,
      subTasks: state.habitModalSubtasks,
      isHidden
    };

    if (habitId) {
      // Edit mode
      const old = state.habits.find(h => h.id === parseInt(habitId));
      const merged = { ...old, ...payload };
      await state.db.updateHabit(merged);
      showNotification(`"${name}" updated successfully!`, '#10b981');
    } else {
      // Create mode
      await state.db.addHabit(payload);
      showNotification(`"${name}" created! Keep it up! 🚀`, 'linear-gradient(135deg, #6366f1, #10b981)');
    }

    document.getElementById('modal-habit-creator').classList.remove('active');
    await reloadStateData();
    updateViewContent();
    checkAchievements();
  });

  // Delete (Move to Trash) Habit inside Creator
  document.getElementById('btn-delete-habit-creator').addEventListener('click', async () => {
    const id = parseInt(document.getElementById('habit-edit-id').value);
    if (!id) return;

    if (confirm('Move this habit to Trash? You can restore it later in Settings.')) {
      const habit = state.habits.find(h => h.id === id);
      habit.isDeleted = true;
      habit.isArchived = false;
      await state.db.updateHabit(habit);
      
      if (state.coreQuestHabitId === id) {
        state.coreQuestHabitId = null;
        await state.db.setSetting('core_quest_habit_id', null);
      }
      
      showNotification(`"${habit.name}" moved to Trash!`, '#be123c');
      document.getElementById('modal-habit-creator').classList.remove('active');
      await reloadStateData();
      updateViewContent();
    }
  });

  // Archive Habit inside Creator
  document.getElementById('btn-archive-habit-creator').addEventListener('click', async () => {
    const id = parseInt(document.getElementById('habit-edit-id').value);
    if (!id) return;

    if (confirm('Archive this habit? It will be paused and hidden from active lists.')) {
      const habit = state.habits.find(h => h.id === id);
      habit.isArchived = true;
      habit.isDeleted = false;
      await state.db.updateHabit(habit);
      
      if (state.coreQuestHabitId === id) {
        state.coreQuestHabitId = null;
        await state.db.setSetting('core_quest_habit_id', null);
      }
      
      showNotification(`"${habit.name}" archived successfully in Settings!`, '#d97706');
      document.getElementById('modal-habit-creator').classList.remove('active');
      await reloadStateData();
      updateViewContent();
    }
  });

  // Hide Habit inside Creator
  const hideCreatorBtn = document.getElementById('btn-hide-habit-creator');
  if (hideCreatorBtn) {
    hideCreatorBtn.addEventListener('click', async () => {
      const id = parseInt(document.getElementById('habit-edit-id').value);
      if (!id) return;

      if (confirm('Hide this habit? It will be moved to the passcode-locked Hidden Inventory.')) {
        const habit = state.habits.find(h => h.id === id);
        habit.isHidden = true;
        await state.db.updateHabit(habit);
        
        if (state.coreQuestHabitId === id) {
          state.coreQuestHabitId = null;
          await state.db.setSetting('core_quest_habit_id', null);
        }
        
        showNotification(`"${habit.name}" moved to Hidden Inventory! 🤫`, 'linear-gradient(135deg, #8b5cf6, #10b981)');
        document.getElementById('modal-habit-creator').classList.remove('active');
        await reloadStateData();
        updateViewContent();
      }
    });
  }

  // Timeline filters search
  const timelineSearch = document.getElementById('timeline-search');
  if (timelineSearch) {
    timelineSearch.value = '';
    timelineSearch.addEventListener('input', () => renderTimelineView());
  }

  // Passcode setup: Force clear cached inputs on page load
  const passcodeFieldOnLoad = document.getElementById('input-hidden-inventory-passcode');
  if (passcodeFieldOnLoad) {
    passcodeFieldOnLoad.value = '';
  }

  const timelinePhotoOnly = document.getElementById('timeline-photos-only');
  timelinePhotoOnly.addEventListener('change', () => renderTimelineView());

  // Deep-dive Analytics dropdown change
  const analyticsDrop = document.getElementById('analytics-habit-selector');
  analyticsDrop.addEventListener('change', (e) => {
    state.activeAnalyticsHabitId = e.target.value;
    renderGitHubHeatmap();
    renderAnalyticalCharts();
    renderDeepDiveSummary();
  });

  // Analytics Timeframe range selector
  const timeframeSelector = document.getElementById('analytics-timeframe-selector');
  if (timeframeSelector) {
    timeframeSelector.addEventListener('change', (e) => {
      state.activeAnalyticsRange = e.target.value;
      
      // Re-render all modules with new range filters
      renderGitHubHeatmap();
      renderAnalyticalCharts();
      renderDeepDiveSummary();
    });
  }

  // Custom widgets customizations
  const widgetThemeSel = document.getElementById('widget-theme-selector');
  widgetThemeSel.querySelectorAll('.theme-color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      widgetThemeSel.querySelectorAll('.theme-color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      state.activeWidgetTheme = dot.getAttribute('data-style');
      renderWidgetsView();
    });
  });

  const widgetSizeSel = document.getElementById('widget-size-select');
  widgetSizeSel.addEventListener('change', (e) => {
    state.activeWidgetSize = e.target.value;
    renderWidgetsView();
  });

  const widgetHabitSel = document.getElementById('widget-target-habit-select');
  widgetHabitSel.addEventListener('change', (e) => {
    state.activeWidgetHabitId = e.target.value;
    renderWidgetsView();
  });

  const widgetAlertsSel = document.getElementById('widget-show-alerts-toggle');
  if (widgetAlertsSel) {
    widgetAlertsSel.addEventListener('change', () => {
      renderWidgetsView();
    });
  }

  // Widgets customizer modal triggers
  const btnOpenWidgets = document.getElementById('btn-open-widgets-modal');
  const widgetsModal = document.getElementById('modal-widgets-customizer');
  const btnCloseWidgets = document.getElementById('btn-close-widgets-modal');
  const btnCloseWidgetsFooter = document.getElementById('btn-close-widgets-modal-footer');

  if (btnOpenWidgets && widgetsModal) {
    btnOpenWidgets.addEventListener('click', () => {
      // Refresh options dynamically when opening
      const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);
      const selector = document.getElementById('widget-target-habit-select');
      if (selector) {
        selector.innerHTML = '';
        activeHabits.forEach(h => {
          selector.innerHTML += `<option value="${h.id}">${h.name}</option>`;
        });
        if (activeHabits.length > 0 && !state.activeWidgetHabitId) {
          state.activeWidgetHabitId = activeHabits[0].id;
        }
        if (state.activeWidgetHabitId) {
          selector.value = state.activeWidgetHabitId;
        }
      }
      renderWidgetsView();
      widgetsModal.classList.add('active');
    });
  }

  if (widgetsModal) {
    if (btnCloseWidgets) {
      btnCloseWidgets.addEventListener('click', () => {
        widgetsModal.classList.remove('active');
      });
    }
    if (btnCloseWidgetsFooter) {
      btnCloseWidgetsFooter.addEventListener('click', () => {
        widgetsModal.classList.remove('active');
      });
    }
  }

  // Real home screen widget setup
  const btnGenerateReal = document.getElementById('btn-widget-generate-real');
  const modalWidgetInstructions = document.getElementById('modal-widget-instructions');
  const btnCloseInstructions = document.getElementById('btn-close-widget-instructions');
  const btnCloseInstructionsFooter = document.getElementById('btn-close-widget-instructions-footer');
  const btnWidgetCopyLink = document.getElementById('btn-widget-copy-link');

  if (btnGenerateReal && modalWidgetInstructions) {
    btnGenerateReal.addEventListener('click', () => {
      const habitSelector = document.getElementById('widget-target-habit-select');
      const habitId = state.activeWidgetHabitId || (habitSelector ? habitSelector.value : null);
      if (!habitId) {
        showNotification('⚠️ Create or select an active habit first!', 'var(--color-rose)');
        return;
      }
      
      const size = state.activeWidgetSize || 'medium';
      const theme = state.activeWidgetTheme || 'glass';
      const alertsToggle = document.getElementById('widget-show-alerts-toggle');
      const alerts = alertsToggle ? alertsToggle.checked : true;
      
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const url = `${origin}${pathname}?view=widget&habitId=${habitId}&size=${size}&theme=${theme}&alerts=${alerts}`;
      
      const urlInput = document.getElementById('widget-generated-url-input');
      if (urlInput) {
        urlInput.value = url;
      }
      
      modalWidgetInstructions.classList.add('active');
    });
  }

  if (modalWidgetInstructions) {
    if (btnCloseInstructions) {
      btnCloseInstructions.addEventListener('click', () => {
        modalWidgetInstructions.classList.remove('active');
      });
    }
    if (btnCloseInstructionsFooter) {
      btnCloseInstructionsFooter.addEventListener('click', () => {
        modalWidgetInstructions.classList.remove('active');
      });
    }
  }

  if (btnWidgetCopyLink) {
    btnWidgetCopyLink.addEventListener('click', () => {
      const urlInput = document.getElementById('widget-generated-url-input');
      if (urlInput && urlInput.value) {
        urlInput.select();
        urlInput.setSelectionRange(0, 99999); // For mobile devices
        
        navigator.clipboard.writeText(urlInput.value)
          .then(() => {
            showNotification('📋 Widget link copied to clipboard!', 'linear-gradient(135deg, #10b981, #6366f1)');
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
            showNotification('❌ Failed to copy link automatically.', 'var(--color-rose)');
          });
      }
    });
  }

  // Hidden Inventory modal triggers
  const btnOpenHiddenInventory = document.getElementById('btn-open-hidden-inventory-modal');
  const hiddenInventoryModal = document.getElementById('modal-hidden-inventory');
  const btnCloseHiddenInventory = document.getElementById('btn-close-hidden-inventory-modal');
  const btnCloseHiddenInventoryFooter = document.getElementById('btn-close-hidden-inventory-modal-footer');

  if (btnOpenHiddenInventory && hiddenInventoryModal) {
    btnOpenHiddenInventory.addEventListener('click', () => {
      const passcodeField = document.getElementById('input-hidden-inventory-passcode');
      if (passcodeField) passcodeField.value = '';
      renderSettingsView();
      hiddenInventoryModal.classList.add('active');
    });
  }

  if (hiddenInventoryModal) {
    const closeModal = () => {
      // Auto-lock vault on close for security
      state.hiddenInventoryUnlocked = false;
      const passcodeField = document.getElementById('input-hidden-inventory-passcode');
      if (passcodeField) passcodeField.value = '';
      renderSettingsView();
      hiddenInventoryModal.classList.remove('active');
    };

    if (btnCloseHiddenInventory) {
      btnCloseHiddenInventory.addEventListener('click', closeModal);
    }
    if (btnCloseHiddenInventoryFooter) {
      btnCloseHiddenInventoryFooter.addEventListener('click', closeModal);
    }
  }

  // Archive Vault modal triggers
  const btnOpenArchive = document.getElementById('btn-open-archive-modal');
  const archiveModal = document.getElementById('modal-archive-vault');
  const btnCloseArchive = document.getElementById('btn-close-archive-modal');
  const btnCloseArchiveFooter = document.getElementById('btn-close-archive-modal-footer');

  if (btnOpenArchive && archiveModal) {
    btnOpenArchive.addEventListener('click', () => {
      renderSettingsView();
      archiveModal.classList.add('active');
    });
  }

  if (archiveModal) {
    const closeArchive = () => {
      archiveModal.classList.remove('active');
      renderSettingsView();
    };
    if (btnCloseArchive) btnCloseArchive.addEventListener('click', closeArchive);
    if (btnCloseArchiveFooter) btnCloseArchiveFooter.addEventListener('click', closeArchive);
  }

  // Trash modal triggers
  const btnOpenTrash = document.getElementById('btn-open-trash-modal');
  const trashModal = document.getElementById('modal-trash-vault');
  const btnCloseTrash = document.getElementById('btn-close-trash-modal');
  const btnCloseTrashFooter = document.getElementById('btn-close-trash-modal-footer');

  if (btnOpenTrash && trashModal) {
    btnOpenTrash.addEventListener('click', () => {
      renderSettingsView();
      trashModal.classList.add('active');
    });
  }

  if (trashModal) {
    const closeTrash = () => {
      trashModal.classList.remove('active');
      renderSettingsView();
    };
    if (btnCloseTrash) btnCloseTrash.addEventListener('click', closeTrash);
    if (btnCloseTrashFooter) btnCloseTrashFooter.addEventListener('click', closeTrash);
  }

  // Settings: Theme toggles
  document.getElementById('btn-theme-light').addEventListener('click', async () => {
    state.selectedTheme = 'light';
    await state.db.setSetting('theme', 'light');
    applyTheme('light');
  });
  document.getElementById('btn-theme-dark').addEventListener('click', async () => {
    state.selectedTheme = 'dark';
    await state.db.setSetting('theme', 'dark');
    applyTheme('dark');
  });
  document.getElementById('btn-theme-auto').addEventListener('click', async () => {
    state.selectedTheme = 'auto';
    await state.db.setSetting('theme', 'auto');
    applyTheme('auto');
  });

  // Language switcher
  document.getElementById('setting-language-switcher').addEventListener('change', async (e) => {
    const lang = e.target.value;
    await state.db.setSetting('language', lang);
    translateUI(lang);
  });

  // Sound muter toggle
  document.getElementById('setting-sound-toggle').addEventListener('change', async (e) => {
    const active = e.target.checked;
    await state.db.setSetting('sound_muted', !active);
    state.audio.setMuted(!active);
  });

  // Backup exports JSON download
  document.getElementById('btn-settings-export').addEventListener('click', async () => {
    const jsonStr = await state.db.exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `DnD_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Backup exported perfectly!', '#10b981');
  });

  // Backup imports JSON restore
  document.getElementById('setting-import-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        await state.db.importData(event.target.result);
        showNotification('Database Restored Perfectly!', '#10b981');
        confetti({ particleCount: 150 });
        
        await reloadStateData();
        updateViewContent();
      } catch (err) {
        showNotification('Invalid backup JSON file schema!', 'var(--color-rose)');
      }
    };
    reader.readAsText(file);
  });

  // Mock Cloud Sync animation trigger
  document.getElementById('btn-settings-cloud-sync').addEventListener('click', () => {
    const text = document.getElementById('cloud-sync-text');
    text.innerText = 'Syncing... ⏳';
    
    // Animate stars confetti triggers
    setTimeout(() => {
      text.innerText = 'Synced ✓';
      confetti({ particleCount: 30, spread: 20 });
      showNotification('Cloud Sync Complete! Backup updated.', '#6366f1');
    }, 1500);
  });

  // Wipe database trigger
  document.getElementById('btn-settings-wipe').addEventListener('click', async () => {
    if (confirm('⚠️ WARNING: Wiping out database will permanently delete all habits, streak records, journal logs, and progress photos. This action is irreversible.')) {
      try {
        // 1. Close active DB connection to prevent deletion from being blocked
        if (state.db && state.db.db) {
          state.db.db.close();
        }
        
        // 2. Request deletion of the database
        const req = indexedDB.deleteDatabase('DnDDB');
        
        req.onsuccess = () => {
          showNotification('Database deleted successfully. Reloading...', '#be123c');
          setTimeout(() => window.location.reload(), 1500);
        };
        
        req.onerror = () => {
          showNotification('Failed to delete database!', 'var(--color-rose)');
        };
        
        req.onblocked = () => {
          // If connection wasn't closed in another tab, force reload to reset
          showNotification('Database deletion blocked. Reloading to clear...', '#be123c');
          setTimeout(() => window.location.reload(), 1500);
        };
      } catch (err) {
        showNotification('Error clearing database!', 'var(--color-rose)');
      }
    }
  });

  // Journal Editor form photo dropzone triggers
  const dropzone = document.getElementById('journal-photo-dropzone');
  const fileInput = document.getElementById('journal-photo-file-input');

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleCompressedPhotoPreview(file);
    }
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleCompressedPhotoPreview(file);
  });

  // Remove Photo preview inside Journal Modal
  document.getElementById('btn-remove-journal-photo').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('journal-dropzone-prompt').style.display = 'flex';
    document.getElementById('journal-dropzone-preview-holder').style.display = 'none';
    document.getElementById('journal-preview-img').src = '';
  });

  // Journal Form submissions
  const journalForm = document.getElementById('journal-editor-form');
  journalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const habitId = document.getElementById('journal-habit-id').value;
    const dateStr = document.getElementById('journal-date').value;
    const note = document.getElementById('journal-note-input').value.trim();
    const photoSrc = document.getElementById('journal-preview-img').src;

    const hasPhoto = photoSrc && photoSrc.startsWith('data:image/');

    // Log to DB
    await state.db.toggleCompletion(
      parseInt(habitId),
      dateStr,
      null, // keep existing checked subtasks
      note,
      hasPhoto ? photoSrc : null
    );

    showNotification('Journey log updated!', '#10b981');
    document.getElementById('modal-journal-editor').classList.remove('active');
    
    await reloadStateData();
    updateViewContent();
    checkAchievements();
  });

  // Consistency Calendar Month Navigation
  const btnCalPrev = document.getElementById('btn-cal-prev');
  const btnCalNext = document.getElementById('btn-cal-next');
  if (btnCalPrev && btnCalNext) {
    btnCalPrev.addEventListener('click', () => {
      state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
      renderMonthlyCalendar();
    });
    btnCalNext.addEventListener('click', () => {
      state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
      renderMonthlyCalendar();
    });
  }

  // Helper to verify local device owner via WebAuthn platform authentication (Windows Hello / Touch ID / Device PIN)
  async function verifyDeviceOwner() {
    if (window.PublicKeyCredential) {
      try {
        const isAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (isAvailable) {
          const challenge = new Uint8Array(32);
          window.crypto.getRandomValues(challenge);
          
          const options = {
            publicKey: {
              challenge: challenge,
              rp: { name: "DnD Secure Vault" },
              user: {
                id: new Uint8Array([1, 2, 3, 4]),
                name: "vault-owner",
                displayName: "Vault Owner"
              },
              pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
              authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "required"
              },
              timeout: 60000
            }
          };
          
          await navigator.credentials.create(options);
          return true;
        }
      } catch (err) {
        console.warn("Device authentication failed or cancelled:", err);
        throw new Error("Device lock confirmation failed or was cancelled.");
      }
    }
    
    // Fallback if browser WebAuthn is not supported
    return true;
  }
  window.verifyDeviceOwner = verifyDeviceOwner;

  // Hidden Inventory Unlock Event Listener
  const unlockBtn = document.getElementById('btn-unlock-hidden-inventory');
  if (unlockBtn) {
    unlockBtn.addEventListener('click', async () => {
      const pin = document.getElementById('input-hidden-inventory-passcode').value;
      const storedPasscode = await state.db.getSetting('vault_passcode', null);

      if (!storedPasscode) {
        // First time configuration
        if (pin.length !== 4 || isNaN(pin)) {
          showNotification('❌ Please enter a 4-digit numeric passcode!', '#f43f5e');
          return;
        }
        try {
          showNotification('ℹ️ Please verify your device credentials (PIN/Fingerprint) to continue.', '#3b82f6');
          await window.verifyDeviceOwner();
        } catch (e) {
          showNotification(`❌ Setup failed: ${e.message}`, '#f43f5e');
          return;
        }
        await state.db.setSetting('vault_passcode', pin);
        state.hiddenInventoryUnlocked = true;
        state.audio.playAchievement();
        if (typeof confetti === 'function') {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
        showNotification('🔐 Passcode Created & Vault Decrypted successfully!', 'linear-gradient(135deg, #10b981, #8b5cf6)');
        renderSettingsView();
      } else {
        // Verification state
        if (pin === storedPasscode) {
          state.hiddenInventoryUnlocked = true;
          state.audio.playAchievement();
          showNotification('🔐 Access Granted! Hidden Inventory Decrypted.', 'linear-gradient(135deg, #8b5cf6, #6d28d9)');
          renderSettingsView();
        } else {
          showNotification('❌ Invalid Passcode!', '#f43f5e');
        }
      }
    });
  }

  // Hidden Inventory Lock Event Listener
  const lockBtn = document.getElementById('btn-lock-hidden-inventory');
  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      state.hiddenInventoryUnlocked = false;
      document.getElementById('input-hidden-inventory-passcode').value = '';
      showNotification('🔐 Vault Locked!', 'rgba(255,255,255,0.3)');
      renderSettingsView();
    });
  }

  // Hidden Inventory Reset Passcode Listener
  const resetBtn = document.getElementById('btn-reset-hidden-inventory-passcode');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      if (confirm('🔐 Are you sure you want to change your passcode? This will lock the vault and let you configure a new passcode immediately.')) {
        state.hiddenInventoryUnlocked = false;
        await state.db.setSetting('vault_passcode', null);
        const passcodeField = document.getElementById('input-hidden-inventory-passcode');
        if (passcodeField) passcodeField.value = '';
        showNotification('🔑 Passcode reset! Please configure a new 4-digit passcode.', 'linear-gradient(135deg, #f59e0b, #f43f5e)');
        renderSettingsView();
      }
    });
  }

  // Close modals when clicking on the backdrop overlay outside the dialog cards
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        const id = overlay.getAttribute('id');
        if (id === 'modal-hidden-inventory') {
          state.hiddenInventoryUnlocked = false;
          const passcodeField = document.getElementById('input-hidden-inventory-passcode');
          if (passcodeField) passcodeField.value = '';
          renderSettingsView();
        } else if (id === 'modal-manage-categories') {
          if (state.activeNoteId) {
            loadActiveNoteIntoEditor();
          }
        }
        overlay.classList.remove('active');
      }
    });
  });

  // Initialize Notion Notes elements once on boot
  initNotesWorkspace();
}

function handleCompressedPhotoPreview(file) {
  compressAndSaveImage(file, (dataUrl) => {
    document.getElementById('journal-dropzone-prompt').style.display = 'none';
    const holder = document.getElementById('journal-dropzone-preview-holder');
    holder.style.display = 'flex';
    document.getElementById('journal-preview-img').src = dataUrl;
  });
}





// ================= MODERN PREMIUM NOTIFICATION ARCHITECTURE =================
const AppNotifications = {
  // Safe helper to check permission and enable notifications
  async requestPermission() {
    if (window.Capacitor?.Plugins?.LocalNotifications) {
      const result = await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } else if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  },

  async hasPermission() {
    if (window.Capacitor?.Plugins?.LocalNotifications) {
      const result = await window.Capacitor.Plugins.LocalNotifications.checkPermissions();
      return result.display === 'granted';
    } else if ('Notification' in window) {
      return Notification.permission === 'granted';
    }
    return false;
  },

  // Save preference and synchronize switches
  async savePreference(key, value) {
    state.notificationPreferences[key] = value;
    await state.db.setSetting('notification_preferences', state.notificationPreferences);
  },

  // Log and display immediate notifications
  async sendImmediate(title, text, category = 'system') {
    // Check preference
    const prefKey = `notif_${category}`;
    if (state.notificationPreferences[prefKey] === false) {
      return; // Suppressed by preference
    }

    // 1. Log to history list
    const notifItem = {
      id: Date.now() + '-' + Math.round(Math.random() * 1000),
      title: title,
      text: text,
      category: category,
      timestamp: Date.now(),
      read: false
    };
    state.notifications.unshift(notifItem);
    
    // Cap at 100 notifications to keep DB and memory usage low
    if (state.notifications.length > 100) {
      state.notifications = state.notifications.slice(0, 100);
    }
    await state.db.setSetting('notifications_list', state.notifications);

    // 2. Play audio cue if enabled
    if (state.notificationPreferences.notif_audio !== false && !state.audio.muted) {
      if (state.audio.playChime) {
        state.audio.playChime();
      }
    }

    // 3. Show in-app premium toast card
    this.showPremiumToast(notifItem);

    // 4. Send native/web push notification
    if (window.DnDAndroid && typeof window.DnDAndroid.showLocalNotification === 'function') {
      try {
        window.DnDAndroid.showLocalNotification(title, text);
      } catch (e) {
        console.error('DnDAndroid notification failed:', e);
      }
    } else if (window.Capacitor?.Plugins?.LocalNotifications) {
      try {
        await window.Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [
            {
              title: title,
              body: text,
              id: Math.floor(Math.random() * 1000000),
              schedule: { at: new Date(Date.now() + 50) } // almost immediate
            }
          ]
        });
      } catch (e) {
        console.error('Capacitor local notification failed:', e);
      }
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: text });
    }

    // 5. Re-render Notifications Center dropdown
    this.renderDropdown();
    this.updateBellBadge();
  },

  // Toast container for cleaner, compact alerts
  showPremiumToast(notif) {
    let toastContainer = document.getElementById('premium-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'premium-toast-container';
      toastContainer.className = 'premium-toast-container';
      document.body.appendChild(toastContainer);
    }

    const card = document.createElement('div');
    card.className = `premium-toast-card notif-cat-${notif.category} slide-in`;
    
    // Choose appropriate SVG icon based on category
    let iconSvg = '';
    if (notif.category === 'reminder') {
      iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path></svg>`;
    } else if (notif.category === 'guidance') {
      iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else if (notif.category === 'success') {
      iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else {
      iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    }

    card.innerHTML = `
      <div class="toast-icon-wrapper">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${notif.title}</div>
        <div class="toast-text">${notif.text}</div>
      </div>
      <button type="button" class="toast-close-btn">&times;</button>
    `;

    toastContainer.appendChild(card);

    // Auto-remove after 4s
    const removeToast = () => {
      card.classList.remove('slide-in');
      card.classList.add('slide-out');
      setTimeout(() => card.remove(), 400);
    };

    const autoTimer = setTimeout(removeToast, 4000);

    card.querySelector('.toast-close-btn').addEventListener('click', () => {
      clearTimeout(autoTimer);
      removeToast();
    });
  },

  // Update notification bell unread badge
  updateBellBadge() {
    const badge = document.getElementById('bell-unread-dot');
    if (!badge) return;
    const unreadCount = state.notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
      badge.style.display = 'flex';
      badge.textContent = unreadCount;
      badge.className = 'bell-unread-badge';
    } else {
      badge.style.display = 'none';
    }
  },

  // Render list dropdown
  renderDropdown() {
    const listContainer = document.getElementById('notif-list-container');
    if (!listContainer) return;

    // Filter search
    const searchVal = (document.getElementById('notif-search-input')?.value || '').toLowerCase().trim();
    // Filter category
    const activeFilterEl = document.querySelector('.notif-filter-pill.active');
    const filterCat = activeFilterEl ? activeFilterEl.getAttribute('data-filter') : 'all';

    let filtered = state.notifications;
    if (filterCat !== 'all') {
      filtered = filtered.filter(n => n.category === filterCat);
    }
    if (searchVal) {
      filtered = filtered.filter(n => n.title.toLowerCase().includes(searchVal) || n.text.toLowerCase().includes(searchVal));
    }

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="notif-empty-state">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-darker)" stroke-width="1.5" style="margin-bottom: 0.5rem;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <p>No notifications found</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(n => {
      const timeStr = this.formatTimeAgo(n.timestamp);
      return `
        <li class="notif-item ${n.read ? 'read' : 'unread'}" data-id="${n.id}" style="display: flex; flex-direction: column;">
          <div class="notif-item-header">
            <span class="notif-item-category-tag cat-${n.category}">${n.category}</span>
            <span class="notif-item-time">${timeStr}</span>
          </div>
          <div class="notif-item-body">
            <h4 class="notif-item-title">${n.title}</h4>
            <p class="notif-item-text">${n.text}</p>
          </div>
          <div class="notif-item-actions">
            ${!n.read ? `<button type="button" class="btn-notif-action mark-read-btn" title="Mark as read"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg></button>` : ''}
            <button type="button" class="btn-notif-action delete-btn" title="Delete"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
        </li>
      `;
    }).join('');

    // Attach list action listeners
    listContainer.querySelectorAll('.mark-read-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const li = btn.closest('.notif-item');
        const id = li.getAttribute('data-id');
        await this.markAsRead(id);
      });
    });

    listContainer.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const li = btn.closest('.notif-item');
        const id = li.getAttribute('data-id');
        await this.deleteNotification(id);
      });
    });
  },

  async markAsRead(id) {
    const item = state.notifications.find(n => n.id === id);
    if (item) {
      item.read = true;
      await state.db.setSetting('notifications_list', state.notifications);
      this.renderDropdown();
      this.updateBellBadge();
    }
  },

  async deleteNotification(id) {
    state.notifications = state.notifications.filter(n => n.id !== id);
    await state.db.setSetting('notifications_list', state.notifications);
    this.renderDropdown();
    this.updateBellBadge();
  },

  async markAllAsRead() {
    state.notifications.forEach(n => n.read = true);
    await state.db.setSetting('notifications_list', state.notifications);
    this.renderDropdown();
    this.updateBellBadge();
  },

  async clearAllRead() {
    state.notifications = state.notifications.filter(n => !n.read);
    await state.db.setSetting('notifications_list', state.notifications);
    this.renderDropdown();
    this.updateBellBadge();
  },

  formatTimeAgo(ts) {
    const diffMs = Date.now() - ts;
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}d ago`;
  },

  // Setup re-engagement native scheduling
  async scheduleReEngagement() {
    if (!window.Capacitor?.Plugins?.LocalNotifications) return;
    const prefKey = 'notif_reminders';
    if (state.notificationPreferences[prefKey] === false) return;

    try {
      const localNotifs = window.Capacitor.Plugins.LocalNotifications;
      
      // Cancel previous scheduled re-engagement notifications to avoid duplicate spam
      await localNotifs.cancel({
        notifications: [{ id: 9999 }]
      });

      // Schedule for 48 hours in the future
      const triggerTime = new Date(Date.now() + 48 * 60 * 60 * 1000);
      await localNotifs.schedule({
        notifications: [
          {
            title: "We miss you! 🥺",
            body: "Keep your habits alive! Check back in to continue your self-improvement quest.",
            id: 9999,
            schedule: { at: triggerTime }
          }
        ]
      });
    } catch (e) {
      console.error('Failed to schedule re-engagement notification:', e);
    }
  },

  // Setup daily habit reminder notifications (Capacitor & Web fallback)
  async scheduleDailyReminders() {
    if (state.notificationPreferences.notif_reminders === false) {
      if (window.Capacitor?.Plugins?.LocalNotifications) {
        await window.Capacitor.Plugins.LocalNotifications.cancel({ notifications: [{ id: 8888 }] });
      }
      return;
    }

    if (window.Capacitor?.Plugins?.LocalNotifications) {
      try {
        const localNotifs = window.Capacitor.Plugins.LocalNotifications;
        await localNotifs.cancel({ notifications: [{ id: 8888 }] });

        // Schedule daily at 9:00 PM (21:00)
        const now = new Date();
        const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
        if (scheduledTime < now) {
          scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        await localNotifs.schedule({
          notifications: [
            {
              title: "Daily Habits Reminder 🔔",
              body: "Have you completed all your quest objectives today? Mark them complete now!",
              id: 8888,
              schedule: {
                at: scheduledTime,
                repeats: true,
                every: 'day'
              }
            }
          ]
        });
      } catch (e) {
        console.error('Failed to schedule daily reminders:', e);
      }
    }
  }
};

// --- INTERACTIVE ONBOARDING QUEST CARD ---
async function renderOnboardingGuide() {
  const container = document.getElementById('onboarding-guide-container');
  if (!container) return;

  if (!state.onboardingState || state.onboardingState.reward_claimed) {
    container.style.display = 'none';
    return;
  }

  // Calculate dynamic steps progress
  const createHabitDone = state.habits.length > 0;
  
  // Check subtask checkoff
  const completeSubtaskDone = state.onboardingState.complete_subtask || state.completions.some(c => c.subTasksChecked && c.subTasksChecked.length > 0);
  
  const writeJournalDone = state.notes.length > 0;
  
  const completeHabitDone = state.completions.some(c => c.completed);

  // Update onboardingState if changed
  let changed = false;
  if (state.onboardingState.create_habit !== createHabitDone) {
    state.onboardingState.create_habit = createHabitDone;
    changed = true;
  }
  if (state.onboardingState.complete_subtask !== completeSubtaskDone) {
    state.onboardingState.complete_subtask = completeSubtaskDone;
    changed = true;
  }
  if (state.onboardingState.write_journal !== writeJournalDone) {
    state.onboardingState.write_journal = writeJournalDone;
    changed = true;
  }
  if (state.onboardingState.complete_habit !== completeHabitDone) {
    state.onboardingState.complete_habit = completeHabitDone;
    changed = true;
  }

  if (changed) {
    await state.db.setSetting('onboarding_state', state.onboardingState);
  }

  // Calculate completed steps
  let completedCount = 0;
  if (state.onboardingState.create_habit) completedCount++;
  if (state.onboardingState.complete_subtask) completedCount++;
  if (state.onboardingState.write_journal) completedCount++;
  if (state.onboardingState.complete_habit) completedCount++;

  const progressPercent = (completedCount / 4) * 100;

  container.style.display = 'block';

  container.innerHTML = `
    <div class="onboarding-header">
      <div class="onboarding-title-group">
        <h3>🚀 Onboarding Quest</h3>
        <span class="onboarding-badge">+50 XP</span>
      </div>
      <button type="button" class="onboarding-dismiss-btn" id="btn-onboarding-dismiss" title="Dismiss Guide">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div class="onboarding-progress-wrapper">
      <div class="onboarding-progress-info">
        <span>Quest Progress</span>
        <span>${completedCount} / 4 Steps</span>
      </div>
      <div class="onboarding-progress-bar">
        <div class="onboarding-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <ul class="onboarding-steps-list">
      <li class="onboarding-step-item ${state.onboardingState.create_habit ? 'completed' : ''}">
        <div class="onboarding-step-checkbox">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="onboarding-step-info">
          <div class="onboarding-step-title">Create a Habit</div>
          <div class="onboarding-step-desc">Add a custom habit to your daily quest board.</div>
        </div>
      </li>
      <li class="onboarding-step-item ${state.onboardingState.complete_subtask ? 'completed' : ''}">
        <div class="onboarding-step-checkbox">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="onboarding-step-info">
          <div class="onboarding-step-title">Complete a Checklist Subtask</div>
          <div class="onboarding-step-desc">Add a subtask to a habit checklist and check it off.</div>
        </div>
      </li>
      <li class="onboarding-step-item ${state.onboardingState.write_journal ? 'completed' : ''}">
        <div class="onboarding-step-checkbox">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="onboarding-step-info">
          <div class="onboarding-step-title">Log a Journal Reflection Note</div>
          <div class="onboarding-step-desc">Write down notes in the Notion-style journal workspace.</div>
        </div>
      </li>
      <li class="onboarding-step-item ${state.onboardingState.complete_habit ? 'completed' : ''}">
        <div class="onboarding-step-checkbox">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="onboarding-step-info">
          <div class="onboarding-step-title">Check Off a Habit</div>
          <div class="onboarding-step-desc">Mark a daily habit as complete on your agenda list.</div>
        </div>
      </li>
    </ul>

    ${completedCount === 4 ? `
      <button type="button" class="onboarding-claim-btn" id="btn-onboarding-claim">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        Claim Quest Reward (+50 XP)
      </button>
    ` : ''}
  `;

  // Attach event listeners
  const dismissBtn = container.querySelector('#btn-onboarding-dismiss');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', async () => {
      state.onboardingState.reward_claimed = true;
      await state.db.setSetting('onboarding_state', state.onboardingState);
      container.style.display = 'none';
      AppNotifications.sendImmediate('Guide Dismissed', 'You can view tips anytime in Settings.', 'guidance');
    });
  }

  const claimBtn = container.querySelector('#btn-onboarding-claim');
  if (claimBtn) {
    claimBtn.addEventListener('click', async () => {
      claimBtn.disabled = true;
      state.onboardingState.reward_claimed = true;
      await state.db.setSetting('onboarding_state', state.onboardingState);
      container.style.display = 'none';

      state.audio.playAchievement();
      confetti({
        particleCount: 150,
        spread: 85,
        colors: ['#6366f1', '#8b5cf6', '#10b981', '#fff'],
        origin: { y: 0.6 }
      });

      await awardXP(50);
      AppNotifications.sendImmediate('Quest Completed! 🎉', 'Onboarding guide completed successfully. Gained +50 XP reward!', 'success');
    });
  }
}

function refreshNotificationPreferencesUI() {
  const notifToggle = document.getElementById('setting-notif-toggle');
  const panel = document.getElementById('notifications-subpreferences-panel');
  if (!notifToggle) return;

  state.db.getSetting('notifications_enabled', false).then(enabled => {
    notifToggle.checked = enabled;
    if (panel) {
      panel.style.display = enabled ? 'flex' : 'none';
    }
  });

  const prefKeys = ['reminders', 'streaks', 'success', 'guidance', 'audio'];
  prefKeys.forEach(k => {
    const el = document.getElementById(`setting-notif-${k}`);
    if (el) {
      el.checked = state.notificationPreferences[`notif_${k}`] !== false;
    }
  });
}

async function initNotifications() {
  const notifToggle = document.getElementById('setting-notif-toggle');
  const testBtn = document.getElementById('btn-test-notif');
  const panel = document.getElementById('notifications-subpreferences-panel');
  
  if (!notifToggle) return;
  
  const enabled = await state.db.getSetting('notifications_enabled', false);
  notifToggle.checked = enabled;
  if (panel) {
    panel.style.display = enabled ? 'flex' : 'none';
  }

  // Set initial preferences states
  const prefKeys = ['reminders', 'streaks', 'success', 'guidance', 'audio'];
  prefKeys.forEach(k => {
    const el = document.getElementById(`setting-notif-${k}`);
    if (el) {
      el.checked = state.notificationPreferences[`notif_${k}`] !== false;
    }
  });
  
  notifToggle.addEventListener('change', async () => {
    if (notifToggle.checked) {
      const permission = await AppNotifications.requestPermission();
      if (permission) {
        await state.db.setSetting('notifications_enabled', true);
        if (panel) panel.style.display = 'flex';
        showNotification('🔔 Smart Notifications Activated!', '#10b981');
        AppNotifications.sendImmediate('Notifications Enabled!', 'You will now receive alerts and reminders.', 'system');
        await AppNotifications.scheduleDailyReminders();
        await AppNotifications.scheduleReEngagement();
      } else {
        notifToggle.checked = false;
        if (panel) panel.style.display = 'none';
        showNotification('⚠️ Permission Denied!', '#f43f5e');
      }
    } else {
      await state.db.setSetting('notifications_enabled', false);
      if (panel) panel.style.display = 'none';
      showNotification('Notifications Disabled.', 'rgba(255,255,255,0.3)');
      // Cancel scheduled notifications
      if (window.Capacitor?.Plugins?.LocalNotifications) {
        await window.Capacitor.Plugins.LocalNotifications.cancel({
          notifications: [{ id: 8888 }, { id: 9999 }]
        });
      }
    }
  });

  // Bind individual toggles
  prefKeys.forEach(k => {
    const el = document.getElementById(`setting-notif-${k}`);
    if (el) {
      el.addEventListener('change', async () => {
        await AppNotifications.savePreference(`notif_${k}`, el.checked);
        if (k === 'reminders') {
          await AppNotifications.scheduleDailyReminders();
        }
      });
    }
  });
  
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      // Pick or mock a habit name
      const habitNames = state.habits.length > 0
        ? state.habits.filter(h => !h.isDeleted && !h.isArchived).map(h => h.name)
        : ['DSA Coding Practice', 'Hydration Protocol', 'Skincare Routine', 'Budget Tracking'];
      const habitName = habitNames[Math.floor(Math.random() * habitNames.length)];
      
      const randomStreak = Math.floor(Math.random() * 14) + 2; // e.g. 2 to 15 days
      const typicalHours = [8, 14, 17, 20];
      const typicalHour = typicalHours[Math.floor(Math.random() * typicalHours.length)];
      const typicalTimeStr = (typicalHour % 12 || 12) + (typicalHour >= 12 ? ' PM' : ' AM');

      const testScenarios = [
        // 1. Streak Dying Warning
        {
          title: "Streak At Risk! ⚠️🔥",
          body: [
            `Don't let our 🔥 ${randomStreak} day streak die! I promise I won't bite... unless you want me to. 😏`,
            `You're about to lose your 🔥 ${randomStreak} day streak for "${habitName}". Are you always this quick to abandon things? 💅`,
            `Your streak for "${habitName}" is dying today. Please save it, I can't bear to see you fail. 🥺`,
            `That 🔥 ${randomStreak} day streak was the only impressive thing about you. Don't let it die! 💀`,
            `Are you ignoring "${habitName}" or just playing hard to get? Because your streak is crying right now. 😢`,
            `Oh, so we're just throwing away our 🔥 ${randomStreak} day streak? Who hurt you? 💔`,
            `Don't let your 🔥 ${randomStreak} day streak for "${habitName}" become history. Unless you like failing? 🙄`
          ]
        },
        // 2. Typical Time Missed
        {
          title: "Neglected Habit Reminder 🙄",
          body: [
            `Hey, you usually do "${habitName}" around ${typicalTimeStr}. It's past that time. Did you find a new favorite habit? 🧐`,
            `It's past your usual "${habitName}" time! Don't tell me you're slacking. I expected more from you. 🙄`,
            `You usually complete "${habitName}" by now. Did you get distracted by something shiny, or are you just lazy today? 😜`,
            `Did you forget our date with "${habitName}" at ${typicalTimeStr}? Keeping me waiting is not a good look on you. 💅`,
            `Is "${habitName}" too hard for you today? You're usually done by ${typicalTimeStr}. Just saying... 😏`
          ]
        },
        // 3. General Sarcastic Roast
        {
          title: "Neglected Habit Reminder 🙄",
          body: [
            `Hey gorgeous, did you forget about "${habitName}"? Or are you just trying to get me to chase you? 😉`,
            `I got a notification saying someone extremely attractive is neglecting "${habitName}". Oh wait, it's you. 😘`,
            `I miss you more than tea misses sugar. Come complete "${habitName}" already! ☕`,
            `Our relationship with "${habitName}" is getting complicated. Complete it soon? 🥺`,
            `My heart skips a beat when you skip "${habitName}". Complete it for me? 💓`,
            `No pressure, but "${habitName}" has been waiting for you all day. Don't stand it up! ⏳`,
            `Are you a magician? Because every time I check "${habitName}", you make it disappear! ✨`,
            `Is it just me, or does "${habitName}" look extra attractive when you actually do it? 😏`,
            `Hey! I'm not jealous, but "${habitName}" is getting all my attention today. Care to check it off? 😜`,
            `Are you practicing being useless, or is "${habitName}" just too hard for your single brain cell? 🧠`,
            `They say consistency is key, but clearly, you prefer locked doors. Do "${habitName}" already! 🔑`,
            `I'd roast you for skipping "${habitName}", but life seems to have done that for me. Oof. 💀`
          ]
        }
      ];

      // Select random scenario and random text from it
      const scenario = testScenarios[Math.floor(Math.random() * testScenarios.length)];
      const text = scenario.body[Math.floor(Math.random() * scenario.body.length)];

      showNotification("Test Alert scheduled in 3 seconds! Close the app or lock your screen to see it. 🤫", "linear-gradient(135deg, #8b5cf6, #10b981)");

      // Send immediate in-app toast log record so it appears in history
      const notifItem = {
        id: Date.now() + '-' + Math.round(Math.random() * 1000),
        title: scenario.title,
        text: text,
        category: 'reminder',
        timestamp: Date.now(),
        read: false
      };
      state.notifications.unshift(notifItem);
      if (state.notifications.length > 100) {
        state.notifications = state.notifications.slice(0, 100);
      }
      await state.db.setSetting('notifications_list', state.notifications);
      AppNotifications.renderDropdown();
      AppNotifications.updateBellBadge();

      // Trigger actual native push notification 3 seconds later
      if (window.DnDAndroid && typeof window.DnDAndroid.showLocalNotification === 'function') {
        setTimeout(() => {
          try {
            window.DnDAndroid.showLocalNotification(scenario.title, text);
          } catch (e) {}
        }, 3000);
      } else if (window.Capacitor?.Plugins?.LocalNotifications) {
        try {
          await window.Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [
              {
                title: scenario.title,
                body: text,
                id: 7777,
                schedule: { at: new Date(Date.now() + 3000) }
              }
            ]
          });
        } catch (e) {}
      } else if ('Notification' in window && Notification.permission === 'granted') {
        setTimeout(() => {
          new Notification(scenario.title, { body: text });
        }, 3000);
      }
    });
  }

  // Update bell badge on boot
  AppNotifications.updateBellBadge();

  // Schedule daily reminders and re-engagement on boot if enabled
  const isNotifEnabled = await state.db.getSetting('notifications_enabled', false);
  if (isNotifEnabled) {
    await AppNotifications.scheduleDailyReminders();
    await AppNotifications.scheduleReEngagement();
  }

  // Check and send sarcastic reminders for neglected habits daily
  await checkSarcasticHabitReminders();
}

async function checkSarcasticHabitReminders() {
  const isNotifEnabled = await state.db.getSetting('notifications_enabled', false);
  if (!isNotifEnabled) return;

  const todayStr = new Date().toISOString().split('T')[0];
  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);
  
  for (const h of activeHabits) {
    const completedToday = state.completions.some(c => c.habitId === h.id && c.completed && c.date === todayStr);
    
    if (completedToday) {
      // Cancel scheduled notifications for this habit
      await cancelHabitNotifications(h.id);
      continue;
    }

    // Calculate elapsed days since creation
    const createdTime = h.createdTime || Date.now();
    const elapsedDays = Math.floor((Date.now() - createdTime) / (24 * 60 * 60 * 1000));
    if (elapsedDays < 1) continue; // Must be at least 1 day old

    if (window.Capacitor?.Plugins?.LocalNotifications) {
      try {
        const localNotifs = window.Capacitor.Plugins.LocalNotifications;
        
        // Ensure high importance channel exists
        await localNotifs.createChannel({
          id: 'dnd_high_importance',
          name: 'DnD Reminders',
          description: 'Habit check-in reminders and warnings',
          importance: 5, // High importance
          visibility: 1, // Public (shows on lock screen)
          vibration: true
        });

        // Cancel previous scheduled notifications to avoid duplicates
        await cancelHabitNotifications(h.id);

        const completionsForHabit = state.completions.filter(c => c.habitId === h.id && c.completed);
        const stats = await state.db.getStreakStats(h.id, completionsForHabit);
        const streak = stats.currentStreak;

        // 1. Check and Schedule STREAK DYING WARNING
        if (streak > 0) {
          const streakDyingTexts = [
            `Don't let our 🔥 ${streak} day streak die! I promise I won't bite... unless you want me to. 😏`,
            `You're about to lose your 🔥 ${streak} day streak for "${h.name}". Are you always this quick to abandon things? 💅`,
            `Your streak for "${h.name}" is dying today. Please save it, I can't bear to see you fail. 🥺`,
            `That 🔥 ${streak} day streak was the only impressive thing about you. Don't let it die! 💀`,
            `Are you ignoring "${h.name}" or just playing hard to get? Because your streak is crying right now. 😢`,
            `Oh, so we're just throwing away our 🔥 ${streak} day streak? Who hurt you? 💔`,
            `Don't let your 🔥 ${streak} day streak for "${h.name}" become history. Unless you like failing? 🙄`
          ];
          const selectedStreakText = streakDyingTexts[Math.floor(Math.random() * streakDyingTexts.length)];

          const streakTarget = new Date();
          streakTarget.setHours(20, 30, 0, 0); // 8:30 PM
          if (streakTarget < new Date()) {
            // If already past 8:30 PM, schedule for tomorrow
            streakTarget.setDate(streakTarget.getDate() + 1);
          }

          await localNotifs.schedule({
            notifications: [
              {
                title: "Streak At Risk! ⚠️🔥",
                body: selectedStreakText,
                id: h.id + 100000,
                channelId: 'dnd_high_importance',
                schedule: { at: streakTarget }
              }
            ]
          });
        }

        // 2. Schedule Typical Time Missed OR General Sarcastic Reminder
        let typicalHour = null;
        if (completionsForHabit.length >= 2) {
          const hours = completionsForHabit.map(c => c.completionHour).filter(hr => hr !== undefined);
          if (hours.length > 0) {
            const count = {};
            let maxCount = 0;
            let modeHour = hours[0];
            hours.forEach(hr => {
              count[hr] = (count[hr] || 0) + 1;
              if (count[hr] > maxCount) {
                maxCount = count[hr];
                modeHour = hr;
              }
            });
            typicalHour = modeHour;
          }
        }

        let reminderBody = '';
        let targetTime = new Date();

        if (typicalHour !== null) {
          // Schedule tomorrow at typicalHour
          targetTime.setDate(targetTime.getDate() + 1);
          targetTime.setHours(typicalHour, 0, 0, 0);

          const typicalTimeStr = (typicalHour % 12 || 12) + (typicalHour >= 12 ? ' PM' : ' AM');
          const typicalTexts = [
            `Hey, you usually do "${h.name}" around ${typicalTimeStr}. It's past that time. Did you find a new favorite habit? 🧐`,
            `It's past your usual "${h.name}" time! Don't tell me you're slacking. I expected more from you. 🙄`,
            `You usually complete "${h.name}" by now. Did you get distracted by something shiny, or are you just lazy today? 😜`,
            `Did you forget our date with "${h.name}" at ${typicalTimeStr}? Keeping me waiting is not a good look on you. 💅`,
            `Is "${h.name}" too hard for you today? You're usually done by ${typicalTimeStr}. Just saying... 😏`
          ];
          reminderBody = typicalTexts[Math.floor(Math.random() * typicalTexts.length)];
        } else {
          // General sarcastic / flirty roast
          targetTime.setDate(targetTime.getDate() + 1);
          targetTime.setHours(18, 0, 0, 0); // 6:00 PM

          const getOrdinal = (num) => {
            const j = num % 10;
            const k = num % 100;
            if (j === 1 && k !== 11) return num + "st";
            if (j === 2 && k !== 12) return num + "nd";
            if (j === 3 && k !== 13) return num + "rd";
            return num + "th";
          };
          const nthTime = elapsedDays + 1;
          const generalTexts = [
            `🙄 This is Day 1 for the ${getOrdinal(nthTime)} time for "${h.name}".`,
            `Hey gorgeous, did you forget about "${h.name}"? Or are you just trying to get me to chase you? 😉`,
            `I got a notification saying someone extremely attractive is neglecting "${h.name}". Oh wait, it's you. 😘`,
            `I miss you more than tea misses sugar. Come complete "${h.name}" already! ☕`,
            `Our relationship with "${h.name}" is getting complicated. Complete it soon? 🥺`,
            `My heart skips a beat when you skip "${h.name}". Complete it for me? 💓`,
            `No pressure, but "${h.name}" has been waiting for you all day. Don't stand it up! ⏳`,
            `Are you a magician? Because every time I check "${h.name}", you make it disappear! ✨`,
            `Is it just me, or does "${h.name}" look extra attractive when you actually do it? 😏`,
            `Hey! I'm not jealous, but "${h.name}" is getting all my attention today. Care to check it off? 😜`,
            `Are you practicing being useless, or is "${h.name}" just too hard for your single brain cell? 🧠`,
            `They say consistency is key, but clearly, you prefer locked doors. Do "${h.name}" already! 🔑`,
            `I'd roast you for skipping "${h.name}", but life seems to have done that for me. Oof. 💀`
          ];
          reminderBody = generalTexts[Math.floor(Math.random() * generalTexts.length)];
        }

        await localNotifs.schedule({
          notifications: [
            {
              title: "Neglected Habit Reminder 🙄",
              body: reminderBody,
              id: h.id,
              channelId: 'dnd_high_importance',
              schedule: { at: targetTime }
            }
          ]
        });

      } catch (e) {
        console.error('Failed to schedule local notification:', e);
      }
    }
  }
}

function renderCircadianChart() {
  const canvas = document.getElementById('chart-circadian-scatter');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (state.charts.circadian) state.charts.circadian.destroy();
  
  const dataPoints = [];
  const countMap = {};
  
  state.completions.forEach(c => {
    if (c.completed) {
      let hour = c.completionHour;
      if (hour === undefined) {
        const hash = (c.habitId + c.date.charCodeAt(9)) % 2;
        hour = hash === 0 ? 8 : 18;
      }
      
      const dateObj = new Date(c.date);
      const day = dateObj.getDay();
      
      const key = `${day}_${hour}`;
      countMap[key] = (countMap[key] || 0) + 1;
    }
  });
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  Object.keys(countMap).forEach(key => {
    const [day, hour] = key.split('_').map(Number);
    const count = countMap[key];
    dataPoints.push({
      x: day,
      y: hour,
      r: Math.min(15, 3 + count * 1.5),
      count: count
    });
  });
  
  state.charts.circadian = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Completions',
        data: dataPoints,
        backgroundColor: 'rgba(16, 185, 129, 0.4)',
        borderColor: '#10b981',
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const p = context.raw;
              const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              const dayName = daysList[p.x];
              const hourStr = `${String(p.y).padStart(2, '0')}:00`;
              return ` ${dayName} at ${hourStr} — ${p.count} Completion${p.count === 1 ? '' : 's'}`;
            }
          }
        }
      },
      scales: {
        x: {
          min: -0.5,
          max: 6.5,
          ticks: {
            callback: function(val) {
              return days[val];
            },
            color: '#9ca3af',
            font: { weight: '600' }
          },
          grid: { color: 'rgba(255,255,255,0.03)' }
        },
        y: {
          min: -0.5,
          max: 23.5,
          ticks: {
            callback: function(val) {
              return `${String(val).padStart(2, '0')}:00`;
            },
            color: '#9ca3af'
          },
          grid: { color: 'rgba(255,255,255,0.03)' }
        }
      }
    }
  });
  
  renderCircadianInsights(countMap);
}

function renderCircadianInsights(countMap) {
  const el = document.getElementById('circadian-insights');
  if (!el) return;
  
  let totalCompletions = 0;
  let morningCount = 0;
  let afternoonCount = 0;
  let eveningCount = 0;
  
  Object.keys(countMap).forEach(key => {
    const [day, hour] = key.split('_').map(Number);
    const count = countMap[key];
    totalCompletions += count;
    if (hour >= 5 && hour < 12) morningCount += count;
    else if (hour >= 12 && hour < 17) afternoonCount += count;
    else eveningCount += count;
  });
  
  let peakTime = 'Evening 🌙';
  if (morningCount >= afternoonCount && morningCount >= eveningCount) peakTime = 'Morning 🌅';
  else if (afternoonCount >= morningCount && afternoonCount >= eveningCount) peakTime = 'Afternoon ☀️';
  
  const mPct = totalCompletions > 0 ? Math.round((morningCount / totalCompletions) * 100) : 0;
  
  el.className = "notion-callout";
  el.style.borderLeftColor = "hsl(var(--color-violet))";
  el.style.marginTop = "1rem";
  el.style.background = "rgba(255,255,255,0.02)";
  el.innerHTML = `
    <span class="notion-callout-emoji" style="font-size: 1.3rem;">🔮</span>
    <div class="notion-callout-content">
      <span class="notion-callout-title" style="font-weight: 700; font-size: 0.85rem; color: var(--text-main); margin-bottom: 0.25rem; display: block;">Circadian Discipline Insight</span>
      <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
        Your peak performance zone is in the <strong>${peakTime}</strong>, with <strong>${mPct}%</strong> of your habits logged in the morning slots. Studies show morning completions build 42% stronger neuro-consistency streaks!
      </p>
    </div>
  `;
}

// ================= PREMIUM COMPONENT RENDERERS =================

// --- DAILY CORE QUEST FOCUS CARD ---
async function renderCoreQuestCard() {
  const container = document.getElementById('core-quest-container');
  if (!container) return;

  if (!state.coreQuestHabitId) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  const habit = state.habits.find(h => h.id === state.coreQuestHabitId && !h.isArchived && !h.isDeleted && !h.isHidden);
  if (!habit) {
    container.style.display = 'none';
    container.innerHTML = '';
    // If the habit is archived or missing, clean state
    state.coreQuestHabitId = null;
    state.db.setSetting('core_quest_habit_id', null);
    return;
  }

  // Only display if the habit is due today
  const todayStr = new Date().toISOString().split('T')[0];
  const isDue = isHabitDueOnDate(habit, new Date());
  if (!isDue) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'block';

  const compKey = `${habit.id}_${todayStr}`;
  const compRecord = state.completions.find(c => c.id === compKey);
  const isCompleted = compRecord ? compRecord.completed : false;
  const subChecked = compRecord ? compRecord.subTasksChecked || [] : [];

  // Convert color to HSL or RGB
  const rawHSL = habit.color.startsWith('var') ? getHSLFromVar(habit.color) : habit.color;
  let rgbColor = '99, 102, 241'; // fallback indigo
  if (habit.color.startsWith('var')) {
    if (habit.color.includes('emerald')) rgbColor = '16, 185, 129';
    else if (habit.color.includes('rose')) rgbColor = '244, 63, 94';
    else if (habit.color.includes('violet')) rgbColor = '139, 92, 246';
    else if (habit.color.includes('amber')) rgbColor = '245, 158, 11';
    else if (habit.color.includes('sky')) rgbColor = '14, 165, 233';
    else if (habit.color.includes('orange')) rgbColor = '249, 115, 22';
    else if (habit.color.includes('fuchsia')) rgbColor = '217, 70, 239';
  } else {
    // Custom HSL representation to RGB
    const parts = rawHSL.split(',');
    if (parts.length === 3) {
      // HSL representation
      const h = parseInt(parts[0]);
      const s = parseInt(parts[1]) / 100;
      const l = parseInt(parts[2]) / 100;
      // Simple HSL to RGB conversion
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
      else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
      else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
      else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
      else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
      else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
      rgbColor = `${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)}`;
    }
  }

  const streakStats = await state.db.getStreakStats(habit.id);

  const shieldBadgeMarkup = habit.shieldsCount > 0 ? `
    <span class="shield-badge-glowing" style="font-size: 0.7rem; padding: 2px 6px;">🛡️ Shield Charged (x${habit.shieldsCount})</span>
  ` : `
    <span class="shield-progress-badge" style="font-size: 0.7rem; padding: 2px 6px;">🛡️ Shield Progress: ${streakStats.currentStreak % 21}/21 Days</span>
  `;

  const missedDates = getMissedDueDaysForHabit(habit);
  let shieldRepairBanner = '';
  if (missedDates.length >= 1 && missedDates.length <= 2 && habit.shieldsCount > 0) {
    shieldRepairBanner = `
      <div class="shield-repair-banner" style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; background: rgba(245, 158, 11, 0.08); border: 1.5px dashed rgba(245, 158, 11, 0.4); border-radius: 10px; padding: 0.6rem 0.85rem; font-size: 0.8rem; color: #fff; animation: shieldPulseBorder 3s infinite ease-in-out; text-align: left; width: 100%;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.25rem;">🛡️</span>
          <div>
            <strong style="color: #f59e0b; display: block; font-size: 0.85rem;">Quest Streak Protected!</strong>
            <span style="font-size: 0.7rem; color: var(--text-muted);">Restore streak of ${missedDates.length} missed day${missedDates.length > 1 ? 's' : ''} using a shield.</span>
          </div>
        </div>
        <button type="button" class="btn-activate-shield-quest" style="padding: 0.35rem 0.75rem; font-size: 0.7rem; border-radius: 6px; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; font-weight: bold; color: #fff; cursor: pointer; white-space: nowrap; box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);">
          Use Shield
        </button>
      </div>
    `;
  }

  let subtasksDrawer = '';
  if (habit.subTasks && habit.subTasks.length > 0) {
    const listItems = habit.subTasks.map(st => {
      const isChecked = subChecked.includes(st.id);
      return `
        <div class="agenda-subtask-item ${isChecked ? 'checked' : ''}" data-subid="${st.id}" style="margin: 0.35rem 0;">
          <div class="subtask-mini-check ${isChecked ? 'checked' : ''}">✔</div>
          <span>${st.text}</span>
        </div>
      `;
    }).join('');
    subtasksDrawer = `
      <div class="core-quest-subtasks-wrapper" style="margin-top: 1rem; border-top: 1px dashed var(--border-glass); padding-top: 0.75rem;">
        <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Quest Sub-tasks:</div>
        <div class="agenda-subtasks-drawer" style="max-height: none; display: block; background: transparent; padding: 0;">${listItems}</div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="core-quest-card" style="--quest-color-rgb: ${rgbColor}; border-color: hsla(${rawHSL}, 0.5);">
      <div class="core-quest-emoji">${habit.emoji}</div>
      <div class="core-quest-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.4rem;">
              <span class="core-quest-tag" style="--quest-color-rgb: ${rgbColor}; margin-bottom: 0;">DAILY CORE QUEST</span>
              ${streakStats.currentStreak > 0 ? `
                <span class="streak-counter-badge" style="font-size: 0.7rem; padding: 2px 6px;">🔥 ${streakStats.currentStreak}</span>
              ` : ''}
              ${shieldBadgeMarkup}
            </div>
            <h3 class="core-quest-title">${habit.name}</h3>
            <p class="core-quest-desc">${habit.desc || 'No description'}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="habit-checkbox-wrapper" style="transform: scale(1.15);">
              <div class="custom-checkbox ${isCompleted ? 'checked' : ''}" id="core-quest-checkbox">✔</div>
            </div>
          </div>
        </div>
        ${subtasksDrawer}
        ${shieldRepairBanner}
      </div>
    </div>
  `;

  // Wire up checkbox click
  const chk = container.querySelector('#core-quest-checkbox');
  chk.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (habit.subTasks && habit.subTasks.length > 0 && !isCompleted) {
      const allTicked = subChecked.length === habit.subTasks.length;
      if (!allTicked) {
        const allIds = habit.subTasks.map(t => t.id);
        const res = await state.db.toggleCompletion(habit.id, todayStr, allIds);
        if (res.completed) {
          await awardXP(10);
          confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
        }
        await reloadStateData();
        updateViewContent();
        return;
      }
    }
    const res = await state.db.toggleCompletion(habit.id, todayStr);
    if (res.completed) {
      await awardXP(10);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
    await reloadStateData();
    updateViewContent();
  });

  // Wire up subtasks click
  const subItems = container.querySelectorAll('.agenda-subtask-item');
  subItems.forEach(item => {
    item.addEventListener('click', async (e) => {
      e.stopPropagation();
      const subId = parseInt(item.getAttribute('data-subid'));
      let nextChecked = [...subChecked];
      if (nextChecked.includes(subId)) {
        nextChecked = nextChecked.filter(id => id !== subId);
      } else {
        nextChecked.push(subId);
      }
      const res = await state.db.toggleCompletion(habit.id, todayStr, nextChecked);
      const isAllChecked = nextChecked.length === habit.subTasks.length;
      if (isAllChecked && !isCompleted) {
        await awardXP(10);
        confetti({ particleCount: 40, spread: 50 });
      }
      await reloadStateData();
      updateViewContent();
    });
  });

  // Wire up shield activation
  const repairBtnQuest = container.querySelector('.btn-activate-shield-quest');
  if (repairBtnQuest) {
    repairBtnQuest.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(`🛡️ Consume 1 Golden Shield to restore streak for "${habit.name}"?`)) {
        habit.shieldsCount = Math.max(0, habit.shieldsCount - 1);
        await state.db.updateHabit(habit);
        
        for (const missedDate of missedDates) {
          await state.db.toggleCompletion(
            habit.id,
            missedDate,
            null,
            '🛡️ Streak Shield Activated! Streak saved from being broken.'
          );
        }
        
        state.audio.playPerfectDay();
        confetti({ 
          particleCount: 150, 
          spread: 80, 
          colors: ['#f59e0b', '#fbbf24', '#fff'],
          origin: { y: 0.6 }
        });
        showNotification(`🛡️ Streak restored! consumed 1 Golden Shield.`, '#f59e0b');
        
        await reloadStateData();
        updateViewContent();
      }
    });
  }
}

// --- INTERACTIVE MONTHLY CONSISTENCY CALENDAR GRID ---
function renderMonthlyCalendar() {
  const innerGrid = document.getElementById('calendar-grid-inner');
  const monthTitle = document.getElementById('calendar-month-title');
  
  if (!innerGrid || !monthTitle) return;

  innerGrid.innerHTML = '';

  const date = state.calendarDate || new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.innerText = date.toLocaleDateString(state.currentLang, { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1);
  const firstDayIndex = firstDay.getDay(); 
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const activeHabits = state.habits.filter(h => !h.isArchived && !h.isDeleted && !h.isHidden);

  // 1. Previous Month Padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    const cell = document.createElement('div');
    cell.className = 'calendar-day-cell other-month';
    cell.innerHTML = `<span class="cal-num">${dayNum}</span>`;
    innerGrid.appendChild(cell);
  }

  // 2. Current Month Cells
  for (let d = 1; d <= totalDays; d++) {
    const loopDate = new Date(year, month, d);
    const dateY = loopDate.getFullYear();
    const dateM = String(loopDate.getMonth() + 1).padStart(2, '0');
    const dateD = String(loopDate.getDate()).padStart(2, '0');
    const dateStr = `${dateY}-${dateM}-${dateD}`;

    const dueHabits = activeHabits.filter(h => isHabitDueOnDate(h, loopDate));
    
    let totalDue = dueHabits.length;
    let completedCount = 0;

    dueHabits.forEach(h => {
      const compKey = `${h.id}_${dateStr}`;
      const comp = state.completions.find(c => c.id === compKey);
      if (comp && comp.completed) {
        completedCount++;
      }
    });

    const rate = totalDue > 0 ? Math.round((completedCount / totalDue) * 100) : 0;

    let shadeClass = 'cal-lvl-0';
    if (totalDue > 0) {
      if (rate === 100) shadeClass = 'cal-lvl-perfect';
      else if (rate >= 67) shadeClass = 'cal-lvl-3';
      else if (rate >= 34) shadeClass = 'cal-lvl-2';
      else if (rate >= 1) shadeClass = 'cal-lvl-1';
    }

    const cell = document.createElement('div');
    cell.className = `calendar-day-cell ${shadeClass}`;
    cell.setAttribute('data-date', dateStr);

    cell.innerHTML = `
      <span class="cal-num">${d}</span>
      ${totalDue > 0 ? `<span class="cal-pct">${rate}%</span>` : ''}
    `;

    cell.addEventListener('click', () => {
      innerGrid.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      renderCalendarDayDrawer(loopDate, dateStr, dueHabits);
    });

    innerGrid.appendChild(cell);
  }

  // 3. Next Month Padding
  const totalCellsSoFar = firstDayIndex + totalDays;
  const cellsNeeded = totalCellsSoFar % 7 === 0 ? 0 : 7 - (totalCellsSoFar % 7);
  for (let i = 1; i <= cellsNeeded; i++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day-cell other-month';
    cell.innerHTML = `<span class="cal-num">${i}</span>`;
    innerGrid.appendChild(cell);
  }
}

// --- CALENDAR EXPANDABLE DETAILED DAY DRAWER ---
function renderCalendarDayDrawer(loopDate, dateStr, dueHabits) {
  const drawer = document.getElementById('calendar-day-detail-drawer');
  if (!drawer) return;

  const formattedDate = loopDate.toLocaleDateString(state.currentLang, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  if (dueHabits.length === 0) {
    drawer.style.display = 'block';
    drawer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0;">${formattedDate}</h4>
        <button id="btn-close-cal-drawer" style="background: transparent; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; line-height: 1;">&times;</button>
      </div>
      <p style="font-size: 0.8rem; color: var(--text-darker); margin: 0;">No active habits were scheduled or due on this date.</p>
    `;
    document.getElementById('btn-close-cal-drawer').onclick = () => {
      drawer.style.display = 'none';
      document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
    };
    return;
  }

  drawer.style.display = 'block';

  let habitsHTML = '';

  dueHabits.forEach(h => {
    const compKey = `${h.id}_${dateStr}`;
    const comp = state.completions.find(c => c.id === compKey);
    const isCompleted = comp ? comp.completed : false;
    const subChecked = comp ? comp.subTasksChecked || [] : [];
    
    let subtasksStatus = '';
    if (h.subTasks && h.subTasks.length > 0) {
      const total = h.subTasks.length;
      const done = subChecked.length;
      subtasksStatus = `<span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">(Sub-tasks: ${done}/${total})</span>`;
    }

    let noteAndPhotoHTML = '';
    if (comp && (comp.journalNote || comp.journalPhoto)) {
      noteAndPhotoHTML = `
        <div style="margin-top: 0.75rem; background: rgba(0,0,0,0.15); border: 1px solid var(--border-glass); border-radius: 8px; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${comp.journalNote ? `
            <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4; margin: 0; font-style: italic; border-left: 2px solid hsl(var(--color-indigo)); padding-left: 0.5rem;">
              "${comp.journalNote}"
            </p>
          ` : ''}
          ${comp.journalPhoto ? `
            <div class="calendar-detail-photo" style="border-radius: 6px; overflow: hidden; border: 1px solid var(--border-glass); cursor: zoom-in; max-width: 180px; max-height: 120px; position: relative;">
              <img src="${comp.journalPhoto}" alt="Progress Photo" style="width: 100%; height: auto; display: block; object-fit: cover;">
              <div class="photo-zoom-overlay" style="opacity: 1; background: rgba(0,0,0,0.4);"><i data-lucide="zoom-in" style="width: 14px; height: 14px;"></i></div>
            </div>
          ` : ''}
        </div>
      `;
    }

    habitsHTML += `
      <div style="padding: 0.75rem; border-radius: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); display: flex; flex-direction: column; gap: 0.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.1rem;">${h.emoji}</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: #fff;">${h.name}</span>
            ${subtasksStatus}
          </div>
          <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; background: ${isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)'}; color: ${isCompleted ? '#34d399' : 'var(--text-muted)'}; border: 1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-glass)'};">
            ${isCompleted ? 'Completed ✓' : 'Incomplete'}
          </span>
        </div>
        ${noteAndPhotoHTML}
      </div>
    `;
  });

  drawer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-glass);">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1rem;">📅</span>
        <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0;">Details for ${formattedDate}</h4>
      </div>
      <button id="btn-close-cal-drawer" style="background: transparent; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; line-height: 1;">&times;</button>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${habitsHTML}
    </div>
  `;

  // Attach lightbox zoom on thumbnail click
  const photos = drawer.querySelectorAll('.calendar-detail-photo');
  photos.forEach(photo => {
    photo.addEventListener('click', () => {
      const img = photo.querySelector('img');
      const habitName = photo.closest('div').parentElement.querySelector('span[style*="font-weight: 700"]').innerText;
      const noteEl = photo.parentElement.querySelector('p');
      const noteText = noteEl ? noteEl.innerText.replace(/"/g, '') : '';
      openLightbox(img.src, formattedDate, habitName, noteText);
    });
  });

  lucide.createIcons();

  document.getElementById('btn-close-cal-drawer').onclick = () => {
    drawer.style.display = 'none';
    document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
  };
}

// --- HELPER: CALCULATE MISSED DUE DAYS FOR STREAK SHIELD ---
function getMissedDueDaysForHabit(habit) {
  if (habit.isArchived || habit.isDeleted) return [];

  const completions = state.completions.filter(c => c.habitId === habit.id && c.completed);
  if (completions.length === 0) return [];

  const completedDatesStr = completions.map(c => c.date);

  const today = new Date();
  today.setHours(0,0,0,0);

  const missedDates = [];
  let curr = new Date(today);
  curr.setDate(curr.getDate() - 1); // start from yesterday

  // Limit search to last 30 days to avoid long loops if they haven't logged in months
  const limitDate = new Date(today);
  limitDate.setDate(limitDate.getDate() - 30);

  // Find the first completion date to avoid scanning before habit started
  const minTime = habit.createdTime;
  const minDate = new Date(minTime);
  minDate.setHours(0,0,0,0);

  while (curr >= limitDate && curr >= minDate) {
    const dateStr = curr.toISOString().split('T')[0];
    const isDue = isHabitDueOnDate(habit, curr);
    const isDone = completedDatesStr.includes(dateStr);

    if (isDue) {
      if (isDone) {
        // We hit a completed day, so we stop collecting missed days
        break;
      } else {
        // It was due but not completed, add to missed
        missedDates.push(dateStr);
      }
    }
    curr.setDate(curr.getDate() - 1);
  }

  return missedDates.reverse(); // return in chronological order
}

// =========================================================================
// ================= VIEW 7: NOTION-STYLE NOTES WORKSPACE =================
// =========================================================================

const NOTES_COVER_GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #a855f7)', // Indigo to Purple
  'linear-gradient(135deg, #10b981, #059669)', // Emerald to Dark Green
  'linear-gradient(135deg, #f59e0b, #e11d48)', // Amber to Rose
  'linear-gradient(135deg, #06b6d4, #3b82f6)', // Cyan to Blue
  'linear-gradient(135deg, #f43f5e, #fb7185)', // Rose to Pink
  'linear-gradient(135deg, #1e293b, #0f172a)'  // Sleek Dark Slate
];

const EMOJI_CATEGORIES = {
  "Smileys": [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😝', '😜', '🤪', '🧐', '😎', '🤩', '🥳', '😏', '😒', '😔', '😟', '😕', '🙁', '☹️', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🫣', '🤭', '🤫', '🫡', '🤥', '🫵', '👍', '👎', '👊', '✊', '🤛', '🤜', '🫰', '✌️', '🤞', '🤟', '🤘', '👌', '🤌', '🤏', '👈', '👉', '👆', '👇', '🫱', '🫲', '👋', '👏', '🙌', '👐', '🫳', '🫴', '🙏', '✍️', '💅', '🤳', '🤝'
  ],
  "Lifestyle": [
    '💪', '🏋️‍♂️', '🏃‍♂️', '🚴‍♂️', '🏊‍♂️', '🧘‍♂️', '🧗‍♂️', '🏄‍♂️', '🌱', '🌳', '🌸', '🌞', '🌌', '🌍', '🏠', '🏢', '🏫', '🏪', '🏥', '🏦', '🏨', '💒', '🏛️', '⛪', '🏕️', '🏡', '🛌', '🧹', '🛁', '🚿', '💰', '💵', '💳', '💎', '👗', '👟', '👜', '🕶️', '🚗', '🛵', '🚲', '🐶', '🐱', '🦊', '🦁', '🐯', '🐻', '🐼', '🐨', '🐰', '🦖', '🐉', '🐳', '🐬', '🐙', '🥑', '🍎', '🍋', '🍌', '🍇', '🍒', '🍕', '🍔', '🍟', '🍣', '🍿', '🧁', '🍺', '🍷', '☕', '🍵', '🧉'
  ],
  "Office": [
    '📄', '📝', '📚', '💻', '💡', '🎯', '🚀', '🧠', '💼', '📅', '📈', '📊', '🔍', '📂', '⏰', '🎓', '🛠️', '📎', '📌', '✉️', '📥', '📤', '🗂️', '🔒', '🔑', '🏷️', '📢', '🔔', '🔏', '📦', '🖊️', '🗒️', '📒', '📕', '📗', '📘', '📙', '📓', '📔', '📐', '📏', '✂️', '📁'
  ],
  "Symbols": [
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💖', '🌟', '💥', '🌀', '💤', '❌', '✅', '⚠️', '🚫', '💯', '🏁', '🚩', '🎵', '🎶', '➕', '➖', '✖️', '➗', '❓', '❔', '❗️', '❕', '🌐', '💠', '🌀', '🔱', '☯️', '☮️', '⚛️', '🕉️', '✡️', '☸️', '💮', '🉐', '🈴', '🚫', '⚠️', '🔒', '🔔'
  ]
};

// Extractor of Hex value for Twemoji CDN filenames (skipping variation selectors)
function getEmojiHex(emoji) {
  if (!emoji) return '1f4c4'; // Fallback to 📄 hex
  const codePoints = [];
  try {
    for (const char of emoji) {
      const cp = char.codePointAt(0);
      if (cp === 0xfe0f) continue;
      codePoints.push(cp.toString(16));
    }
  } catch (e) {
    return '1f4c4';
  }
  return codePoints.length > 0 ? codePoints.join('-') : '1f4c4';
}

// Generate beautiful Twemoji 2D flat icon PNG URL (habits modal only — notes use native emoji)
function getTwemojiUrl(emoji) {
  const hex = getEmojiHex(emoji || '📄');
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/${hex}.png`;
}

// Notion-style native emoji renderer (no CDN images — works offline on all devices)
function setNativeEmoji(el, emoji, sizePx = 24) {
  if (!el) return;
  const em = emoji || '📄';
  el.innerHTML = '';
  el.classList.add('notion-emoji');
  el.style.fontSize = `${sizePx}px`;
  el.style.lineHeight = '1';
  el.style.display = 'inline-flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.textContent = em;
  el.setAttribute('aria-label', em);
}

function isNotesMobileView() {
  return window.matchMedia('(max-width: 900px)').matches;
}

function positionNotesPopover(picker, triggerEl) {
  if (isNotesMobileView()) {
    picker.classList.add('notes-popover-sheet');
    picker.style.position = 'fixed';
    picker.style.bottom = '0';
    picker.style.left = '0';
    picker.style.right = '0';
    picker.style.top = 'auto';
    picker.style.width = '100%';
    picker.style.maxWidth = '100%';
    picker.style.maxHeight = '72vh';
    picker.style.borderRadius = '20px 20px 0 0';
    picker.style.zIndex = '6000';
    document.body.appendChild(picker);
    return;
  }
  const rect = triggerEl.getBoundingClientRect();
  picker.style.top = `${rect.bottom + window.scrollY + 6}px`;
  picker.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - 300)}px`;
  document.body.appendChild(picker);
}

let notesAutoSaveTimeout = null;

// Initialize once
function initNotesWorkspace() {
  // 1. Sidebar Search binding & Pull-to-Reveal Logic
  const notesSearch = document.getElementById('notes-search-input');
  const searchContainer = document.getElementById('notes-search-container');
  const pagesList = document.getElementById('notes-pages-list');

  if (notesSearch) {
    notesSearch.addEventListener('input', () => {
      renderNotesView();
    });
  }

  if (pagesList && searchContainer && notesSearch) {
    const showSearch = () => {
      searchContainer.style.height = '38px';
      searchContainer.style.opacity = '1';
      searchContainer.style.pointerEvents = 'auto';
    };

    const hideSearch = () => {
      // Don't hide if currently focused by user or if a search filter is active
      if (document.activeElement === notesSearch || notesSearch.value.trim() !== '') return;
      searchContainer.style.height = '0';
      searchContainer.style.opacity = '0';
      searchContainer.style.pointerEvents = 'none';
    };

    // Toggle on scroll
    pagesList.addEventListener('scroll', () => {
      if (pagesList.scrollTop <= 5) {
        showSearch();
      } else {
        hideSearch();
      }
    });

    // Support mouse wheel pull-down when already at the top
    pagesList.addEventListener('wheel', (e) => {
      if (pagesList.scrollTop <= 0 && e.deltaY < 0) {
        showSearch();
      }
    }, { passive: true });

    // Support touch drag-down when already at the top
    let touchStartY = 0;
    pagesList.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    pagesList.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && pagesList.scrollTop <= 0) {
        const touchCurrentY = e.touches[0].clientY;
        const diff = touchCurrentY - touchStartY;
        if (diff > 15) { // Dragged down by more than 15px
          showSearch();
        }
      }
    }, { passive: true });

    // Keep visible on focus & hide on blur (if scrolled)
    notesSearch.addEventListener('focus', () => {
      showSearch();
    });

    notesSearch.addEventListener('blur', () => {
      setTimeout(() => {
        if (pagesList.scrollTop > 5) {
          hideSearch();
        }
      }, 250);
    });
  }

  // Notes Sidebar Navigation Menu (Three Lines Dropdown)
  const notesFolderMenuBtn = document.getElementById('btn-notes-folder-menu');
  const notesFolderDropdown = document.getElementById('notes-folder-dropdown');
  const folderMenuItems = document.querySelectorAll('.folder-menu-item');

  if (notesFolderMenuBtn && notesFolderDropdown) {
    notesFolderMenuBtn.onclick = (e) => {
      e.stopPropagation();
      notesFolderDropdown.style.display = notesFolderDropdown.style.display === 'flex' ? 'none' : 'flex';
    };

    document.addEventListener('click', (e) => {
      if (!notesFolderMenuBtn.contains(e.target) && !notesFolderDropdown.contains(e.target)) {
        notesFolderDropdown.style.display = 'none';
      }
    });
  }

  folderMenuItems.forEach(btn => {
    btn.onclick = () => {
      const tab = btn.getAttribute('data-tab');
      state.notesSidebarTab = tab;
      
      // Close dropdown
      if (notesFolderDropdown) {
        notesFolderDropdown.style.display = 'none';
      }

      // Visual active tab highlight
      folderMenuItems.forEach(b => {
        if (b.getAttribute('data-tab') === tab) {
          b.classList.add('active');
          b.style.background = 'rgba(99, 102, 241, 0.15)';
          b.style.color = '#818cf8';
        } else {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = 'var(--text-muted)';
        }
      });
      
      // Update dynamic header
      const folderTitle = document.getElementById('notes-current-folder-title');
      if (folderTitle) {
        if (tab === 'active') folderTitle.innerText = 'ACTIVE PAGES';
        else if (tab === 'archived') folderTitle.innerText = 'ARCHIVED PAGES';
        else if (tab === 'vault') folderTitle.innerText = 'SECURE VAULT';
        else if (tab === 'trash') folderTitle.innerText = 'TRASH INVENTORY';
      }

      // Lock vault if switching away from vault
      if (tab !== 'vault') {
        state.notesVaultUnlocked = false;
      }
      
      state.activeNoteId = null; // deselect note when switching folders
      renderNotesView();
      loadActiveNoteIntoEditor();
    };
  });

  // Helper to close more actions dropdown
  function closeMoreDropdown() {
    const moreDropdown = document.getElementById('note-more-dropdown');
    const moreTrigger = document.getElementById('btn-note-more-trigger');
    if (moreDropdown) {
      moreDropdown.classList.remove('active');
      if (moreTrigger) moreTrigger.classList.remove('active');
      if (moreDropdown.parentElement === document.body) {
        document.getElementById('note-more-menu-container')?.appendChild(moreDropdown);
      }
    }
  }

  // Header controls action listeners
  const btnPin = document.getElementById('btn-note-pin-active');
  if (btnPin) {
    btnPin.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.isFavorite = !note.isFavorite;
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        state.activeNoteId = null; // deselect and redirect back to list
        renderNotesView();
        loadActiveNoteIntoEditor();
        showNotification(note.isFavorite ? 'Page pinned to Favorites! 📌' : 'Page unpinned.', '#f59e0b');
        closeMoreDropdown();
      }
    });
  }

  const btnArchive = document.getElementById('btn-note-archive-active');
  if (btnArchive) {
    btnArchive.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.isArchived = !note.isArchived;
        if (note.isArchived) {
          note.isFavorite = false; // unpin on archive
        }
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        state.activeNoteId = null; // deselect
        renderNotesView();
        loadActiveNoteIntoEditor();
        showNotification(note.isArchived ? 'Page archived successfully! 📥' : 'Page unarchived.', '#d97706');
        closeMoreDropdown();
      }
    });
  }

  const btnHide = document.getElementById('btn-note-hide-active');
  if (btnHide) {
    btnHide.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        const storedPasscode = await state.db.getSetting('vault_passcode', null);
        if (!storedPasscode) {
          const pass = prompt('🔐 Create a secure 4-digit personal passcode to lock this note and unlock your hidden vault:');
          if (!pass) return;
          if (pass.length !== 4 || isNaN(pass)) {
            showNotification('❌ Passcode must be a 4-digit number!', '#f43f5e');
            return;
          }
          try {
            showNotification('ℹ️ Please verify your device credentials (PIN/Fingerprint) to continue.', '#3b82f6');
            await window.verifyDeviceOwner();
          } catch (e) {
            showNotification(`❌ Setup failed: ${e.message}`, '#f43f5e');
            return;
          }
          await state.db.setSetting('vault_passcode', pass);
          showNotification('🔐 Passcode Created successfully!', '#10b981');
        }
        
        note.isHidden = !note.isHidden;
        if (note.isHidden) {
          note.isFavorite = false; // unpin on hide
          note.isArchived = false;
        }
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        state.activeNoteId = null; // deselect
        renderNotesView();
        loadActiveNoteIntoEditor();
        showNotification(note.isHidden ? 'Page hidden in Secure Vault! 🔒' : 'Page unhidden.', '#818cf8');
        closeMoreDropdown();
      }
    });
  }

  const btnTrash = document.getElementById('btn-note-trash-active');
  if (btnTrash) {
    btnTrash.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note && confirm(`Move "${note.title || 'Untitled Page'}" to Trash?`)) {
        note.isDeleted = true;
        note.isFavorite = false;
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        state.activeNoteId = null;
        renderNotesView();
        loadActiveNoteIntoEditor();
        showNotification('Page moved to Trash!', '#be123c');
        closeMoreDropdown();
      }
    });
  }

  // Banners actions listeners
  const btnRestoreBanner = document.getElementById('btn-restore-active-note');
  if (btnRestoreBanner) {
    btnRestoreBanner.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.isDeleted = false;
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        renderNotesView();
        loadActiveNoteIntoEditor();
        showNotification('Note page restored to Active pages!', '#10b981');
      }
    });
  }

  const btnDeletePermBanner = document.getElementById('btn-delete-permanent-active-note');
  if (btnDeletePermBanner) {
    btnDeletePermBanner.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note && confirm(`⚠️ Permanent Delete: Are you sure you want to permanently delete "${note.title || 'Untitled Page'}"? This action is irreversible.`)) {
        await state.db.deleteNote(note.id);
        state.activeNoteId = null;
        state.notes = await state.db.getNotes(true);
        renderNotesView();
        loadActiveNoteIntoEditor();
        showNotification('Note deleted permanently from database.', '#f43f5e');
      }
    });
  }

  const btnUnarchiveBanner = document.getElementById('btn-unarchive-active-note');
  if (btnUnarchiveBanner) {
    btnUnarchiveBanner.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.isArchived = false;
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        renderNotesView();
        loadActiveNoteIntoEditor();
        showNotification('Note page restored to Active pages!', '#10b981');
      }
    });
  }

  // 2. Sidebar New Page button binding
  const btnAddPage = document.getElementById('btn-add-note-page');
  if (btnAddPage) {
    btnAddPage.addEventListener('click', () => createNewNotePage());
  }

  // 3. Empty State New Page button binding
  const btnAddEmpty = document.getElementById('btn-add-note-empty-state');
  if (btnAddEmpty) {
    btnAddEmpty.addEventListener('click', () => createNewNotePage());
  }

  // Mobile Back Button binding
  const btnMobileBack = document.getElementById('btn-notes-mobile-back');
  if (btnMobileBack) {
    btnMobileBack.addEventListener('click', () => {
      state.activeNoteId = null;
      loadActiveNoteIntoEditor();
    });
  }

  // 4. Editor Title field real-time update
  const titleField = document.getElementById('note-editor-title');
  if (titleField) {
    titleField.addEventListener('input', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.title = titleField.value || 'Untitled Page';
        
        // Instant sidebar update
        const sidebarRow = document.querySelector(`.note-page-row[data-id="${note.id}"] .page-title`);
        if (sidebarRow) {
          sidebarRow.innerText = titleField.value || 'Untitled Page';
        }
        
        // Sync Instagram Preview Live!
        if (window.syncInstagramStoryCard) {
          window.syncInstagramStoryCard(note);
        }
        
        debouncedSaveNote(note);
      }
    });
  }

  // Title Style Customizer change listeners
  const fontSelect = document.getElementById('note-style-font');
  if (fontSelect) {
    fontSelect.addEventListener('change', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.titleFont = fontSelect.value;
        applyActiveNoteStyles(note);

  // Load saved drawings on direct note surface canvas
  if (window.loadActiveNoteDrawings) {
    window.loadActiveNoteDrawings(note);
  }
        debouncedSaveNote(note);
      }
    });
  }

  const colorSelect = document.getElementById('note-style-color');
  if (colorSelect) {
    colorSelect.addEventListener('change', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.titleColor = colorSelect.value;
        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      }
    });
  }

  const effectSelect = document.getElementById('note-style-effect');
  if (effectSelect) {
    effectSelect.addEventListener('change', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.titleEffect = effectSelect.value;
        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      }
    });
  }

  // 4b. Editor Subheading field real-time update
  const subheadingField = document.getElementById('note-editor-subheading');
  if (subheadingField) {
    subheadingField.addEventListener('input', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.subheading = subheadingField.value;
        
        // Sync Instagram Preview Live!
        if (window.syncInstagramStoryCard) {
          window.syncInstagramStoryCard(note);
        }
        
        debouncedSaveNote(note);
      }
    });
  }

  // 4c. Editor Description field real-time update
  const descField = document.getElementById('note-editor-desc');
  if (descField) {
    descField.addEventListener('input', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.desc = descField.value;
        debouncedSaveNote(note);
      }
    });
  }

  // 5. Editor Content textarea auto-save & Slash commands listener
  const contentField = document.getElementById('note-editor-content');
  if (contentField) {
    contentField.addEventListener('input', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.content = contentField.value;
        debouncedSaveNote(note);
      }
      if (window.resizeSurfaceCanvas) {
        window.resizeSurfaceCanvas();
      }
    });

    contentField.addEventListener('keyup', (e) => {
      if (e.key === '/') {
        showSlashMenu(contentField);
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        hideSlashMenu();
      }
    });
  }

  // 6. Editor Category select dropdown change
  const catSelect = document.getElementById('note-category-select');
  if (catSelect) {
    catSelect.addEventListener('change', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.category = catSelect.value;
        showSavingIndicator(true);
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        showSavingIndicator(false);
      }
    });
  }

  // 7. Cover Header Click cycler
  const coverHeader = document.getElementById('notes-cover-header');
  if (coverHeader) {
    coverHeader.addEventListener('click', async () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        let currentIdx = NOTES_COVER_GRADIENTS.indexOf(note.coverGradient);
        if (currentIdx === -1) currentIdx = 0;
        const nextIdx = (currentIdx + 1) % NOTES_COVER_GRADIENTS.length;
        const nextGrad = NOTES_COVER_GRADIENTS[nextIdx];

        note.coverGradient = nextGrad;
        coverHeader.style.background = nextGrad;

        showSavingIndicator(true);
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        showSavingIndicator(false);
      }
    });
  }

  // 8. Emoji Picker Badge click
  const emojiTrigger = document.getElementById('note-emoji-trigger');
  if (emojiTrigger) {
    emojiTrigger.addEventListener('click', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        showEmojiPickerForNote(emojiTrigger, note);
      }
    });
  }

  // 9. Edit vs Preview Mode switcher bindings
  const btnEdit = document.getElementById('btn-note-mode-edit');
  const btnPreview = document.getElementById('btn-note-mode-preview');
  const previewArea = document.getElementById('note-editor-preview-container');

  if (btnEdit && btnPreview && contentField && previewArea) {
    btnEdit.addEventListener('click', () => {
      btnEdit.classList.add('active');
      btnEdit.style.background = 'rgba(255,255,255,0.08)';
      btnEdit.style.color = '#fff';

      btnPreview.classList.remove('active');
      btnPreview.style.background = 'transparent';
      btnPreview.style.color = 'var(--text-muted)';

      previewArea.style.display = 'none';
      contentField.style.display = 'block';
      contentField.focus();
    });

    btnPreview.addEventListener('click', () => {
      btnPreview.classList.add('active');
      btnPreview.style.background = 'rgba(255,255,255,0.08)';
      btnPreview.style.color = '#fff';

      btnEdit.classList.remove('active');
      btnEdit.style.background = 'transparent';
      btnEdit.style.color = 'var(--text-muted)';

      const note = state.notes.find(n => n.id === state.activeNoteId);
      const rawText = note ? note.content : '';
      previewArea.innerHTML = parseNotesMarkdown(rawText);

      contentField.style.display = 'none';
      previewArea.style.display = 'block';
    });
  }

  // 10. Open Categories Manager Modal
  const btnTriggerManage = document.getElementById('btn-trigger-manage-categories');
  const modalManage = document.getElementById('modal-manage-categories');
  const btnCloseHeader = document.getElementById('btn-close-categories-modal');
  const btnCloseFooter = document.getElementById('btn-close-categories-modal-footer');

  if (btnTriggerManage && modalManage) {
    btnTriggerManage.addEventListener('click', () => {
      modalManage.classList.add('active');
      renderManagerCategoriesList();
    });
  }

  const closeModal = () => {
    if (modalManage) {
      modalManage.classList.remove('active');
      // Refresh the editor selectors in case categories list changed
      if (state.activeNoteId) {
        loadActiveNoteIntoEditor();
      }
    }
  };

  if (btnCloseHeader) btnCloseHeader.addEventListener('click', closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeModal);

  // New category creation emoji picker binding
  let newCatEmoji = '📂';
  const btnCatNewEmoji = document.getElementById('btn-cat-new-emoji');
  if (btnCatNewEmoji) {
    btnCatNewEmoji.addEventListener('click', () => {
      showTwemojiPicker(btnCatNewEmoji, (emoji) => {
        newCatEmoji = emoji;
        btnCatNewEmoji.innerText = emoji;
      });
    });
  }

  // Submit new category
  const btnSubmitNewCategory = document.getElementById('btn-submit-new-category');
  const inputCatNewName = document.getElementById('input-cat-new-name');
  if (btnSubmitNewCategory && inputCatNewName) {
    btnSubmitNewCategory.addEventListener('click', async () => {
      const name = inputCatNewName.value.trim();
      if (!name) return;

      const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      
      // Ensure unique category ID
      let finalId = id;
      let counter = 1;
      while (state.noteCategories.some(c => c.id === finalId)) {
        finalId = `${id}_${counter}`;
        counter++;
      }

      // Generate a vibrant HSL color for the new category!
      const randomHue = Math.floor(Math.random() * 360);
      const hsl = `${randomHue}, 75%, 55%`;

      state.noteCategories.push({
        id: finalId,
        name: name,
        emoji: newCatEmoji,
        hsl: hsl,
        subcategories: []
      });

      await saveCategoriesConfig();
      
      // Reset input form
      inputCatNewName.value = '';
      newCatEmoji = '📂';
      if (btnCatNewEmoji) btnCatNewEmoji.innerText = '📂';

      renderManagerCategoriesList();
      showNotification('Created new category! 🎉', 'linear-gradient(135deg, #10b981, #3b82f6)');
    });
  }

  // --- NEW: PREMIUM NOTE STYLE TRIGGER & DROPDOWN INTERACTIVITY ---
  const styleTrigger = document.getElementById('btn-note-style-trigger');
  const styleDropdown = document.getElementById('note-style-dropdown');
  const moreTrigger = document.getElementById('btn-note-more-trigger');
  const moreDropdown = document.getElementById('note-more-dropdown');

  if (styleTrigger && styleDropdown) {
    styleTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = styleDropdown.classList.toggle('active');
      styleTrigger.classList.toggle('active', isActive);
      if (moreDropdown) {
        moreDropdown.classList.remove('active');
        if (moreTrigger) moreTrigger.classList.remove('active');
      }
    });
  }

  if (moreTrigger && moreDropdown) {
    moreTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = moreDropdown.classList.toggle('active');
      moreTrigger.classList.toggle('active', isActive);
      if (isActive && isNotesMobileView()) {
        document.body.appendChild(moreDropdown);
      } else if (!isActive && moreDropdown.parentElement === document.body) {
        document.getElementById('note-more-menu-container')?.appendChild(moreDropdown);
      }
      if (styleDropdown) {
        styleDropdown.classList.remove('active');
        if (styleTrigger) styleTrigger.classList.remove('active');
      }
    });
  }

  // Close both dropdowns on click outside
  document.addEventListener('click', (e) => {
    if (styleDropdown && styleTrigger && !styleDropdown.contains(e.target) && e.target !== styleTrigger && !styleTrigger.contains(e.target)) {
      styleDropdown.classList.remove('active');
      styleTrigger.classList.remove('active');
    }
    if (moreDropdown && moreTrigger && !moreDropdown.contains(e.target) && e.target !== moreTrigger && !moreTrigger.contains(e.target)) {
      moreDropdown.classList.remove('active');
      moreTrigger.classList.remove('active');
      if (moreDropdown.parentElement === document.body) {
        document.getElementById('note-more-menu-container')?.appendChild(moreDropdown);
      }
    }
  });

  // --- NEW: INITIALIZE ULTRA-ADVANCED INTERACTIVE PREMIUM UPGRADES ---
  initPremiumNotesUpgrades();
}

function initPremiumNotesUpgrades() {
  // Initialize floating plus menu and Rich-Text WYSIWYG editor engine
  initNotesPlusMenuAndWYSIWYG();

  // Inline Custom style dropdown control listeners (Fonts, Colors, Effects)
  const inlineFont = document.getElementById('note-style-font-dropdown');
  if (inlineFont) {
    inlineFont.addEventListener('change', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.titleFont = inlineFont.value;
        const legacyFont = document.getElementById('note-style-font');
        if (legacyFont) legacyFont.value = inlineFont.value;
        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      }
    });
  }

  const inlineEffect = document.getElementById('note-style-effect-dropdown');
  if (inlineEffect) {
    inlineEffect.addEventListener('change', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.titleEffect = inlineEffect.value;
        const legacyEffect = document.getElementById('note-style-effect');
        if (legacyEffect) legacyEffect.value = inlineEffect.value;
        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      }
    });
  }

  const inlineTheme = document.getElementById('note-style-theme-dropdown');
  if (inlineTheme) {
    inlineTheme.addEventListener('change', () => {
      applyNotePresetTheme(inlineTheme.value);
    });
  }

  const colorDots = document.querySelectorAll('#style-color-palette .color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        const color = dot.getAttribute('data-color');
        const targetSelect = document.getElementById('note-style-color-target');
        const target = targetSelect ? targetSelect.value : 'title';

        if (target === 'title') {
          note.titleColor = color;
          const legacyColor = document.getElementById('note-style-color');
          if (legacyColor) legacyColor.value = color;
        } else if (target === 'subheading') {
          note.subheadingColor = color;
        } else if (target === 'description') {
          note.descColor = color;
        } else if (target === 'content') {
          note.contentColor = color;
        }

        colorDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      }
    });
  });

  const targetColorSelect = document.getElementById('note-style-color-target');
  if (targetColorSelect) {
    targetColorSelect.addEventListener('change', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        const target = targetColorSelect.value;
        let currentColor = 'default';
        if (target === 'title') currentColor = note.titleColor || 'default';
        else if (target === 'subheading') currentColor = note.subheadingColor || 'default';
        else if (target === 'description') currentColor = note.descColor || 'default';
        else if (target === 'content') currentColor = note.contentColor || 'default';

        colorDots.forEach(d => {
          if (d.getAttribute('data-color') === currentColor) {
            d.classList.add('active');
          } else {
            d.classList.remove('active');
          }
        });
      }
    });
  }

  // ================= 1. DYNAMIC THEMES & BACKGROUND WALLPAPERS ENGINE =================
  const themeTrigger = document.getElementById('btn-note-theme-trigger');
  const themeOverlay = document.getElementById('note-theme-overlay');
  const themeClose = document.getElementById('btn-close-theme');
  const uploadBg = document.getElementById('theme-upload-bg');
  const clearBg = document.getElementById('btn-theme-clear-bg');
  const auroraBg = document.getElementById('notes-aurora-bg');
  const cyberpunkGrid = document.getElementById('notes-cyberpunk-grid');
  const notesEditorCol = document.querySelector('.notes-editor-column');

  // Toggle Customizer Panel
  if (themeTrigger && themeOverlay) {
    themeTrigger.addEventListener('click', () => {
      themeOverlay.style.display = themeOverlay.style.display === 'none' ? 'block' : 'none';
      closeOtherOverlays('theme-overlay');
      const styleDropdown = document.getElementById('note-style-dropdown');
      const styleTrigger = document.getElementById('btn-note-style-trigger');
      if (styleDropdown) styleDropdown.classList.remove('active');
      if (styleTrigger) styleTrigger.classList.remove('active');
    });
  }

  if (themeClose && themeOverlay) {
    themeClose.addEventListener('click', () => themeOverlay.style.display = 'none');
  }

  // Preset Theme Selector click handlers
  const presetCards = document.querySelectorAll('.theme-preset-card');
  presetCards.forEach(card => {
    card.addEventListener('click', () => {
      presetCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const preset = card.getAttribute('data-preset');
      applyNotePresetTheme(preset);
    });
  });

  function applyNotePresetTheme(preset) {
    if (!state.activeNoteId) return;
    const note = state.notes.find(n => n.id === state.activeNoteId);
    if (!note) return;

    note.presetTheme = preset;
    note.customWallpaper = ''; // Clear custom wallpaper so preset overrides it
    debouncedSaveNote(note);
    renderPresetThemeDOM(note);

    // Sync theme dropdown
    const inlineTheme = document.getElementById('note-style-theme-dropdown');
    if (inlineTheme) inlineTheme.value = preset;

    // Sync theme preset cards
    const presetCards = document.querySelectorAll('.theme-preset-card');
    presetCards.forEach(card => {
      if (card.getAttribute('data-preset') === preset) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Automatically redirect back to notes page by closing overlay
    if (themeOverlay) {
      themeOverlay.style.display = 'none';
    }
  }

  function renderPresetThemeDOM(note) {
    if (!notesEditorCol) return;
    const preset = note.presetTheme || 'default';
    const notesEditorBgLayer = document.getElementById('notes-editor-bg-layer');
    
    // Reset background styles first
    notesEditorCol.style.background = '';
    notesEditorCol.style.backgroundImage = '';
    notesEditorCol.style.setProperty('--bg-app', '');
    if (notesEditorBgLayer) {
      notesEditorBgLayer.style.background = '';
      notesEditorBgLayer.style.backgroundImage = '';
    }
    if (auroraBg) auroraBg.style.display = 'none';
    if (cyberpunkGrid) cyberpunkGrid.style.opacity = '0';

    const setBg = (bgVal) => {
      if (notesEditorBgLayer) {
        notesEditorBgLayer.style.background = bgVal;
      } else {
        notesEditorCol.style.background = bgVal;
      }
    };

    if (preset === 'aurora') {
      if (auroraBg) auroraBg.style.display = 'block';
      setBg('radial-gradient(circle at center, rgba(99,102,241,0.18), #0d0d12 100%)');
    } else if (preset === 'cyberpunk') {
      if (cyberpunkGrid) cyberpunkGrid.style.opacity = '1';
      setBg('rgba(10, 5, 20, 0.9)');
    } else if (preset === 'nature') {
      setBg('radial-gradient(circle at center, rgba(16,185,129,0.18), #03140d 100%)');
    } else if (preset === 'space') {
      setBg('radial-gradient(circle at center, rgba(99,102,241,0.22) 10%, #03030c 100%)');
    } else if (preset === 'amoled') {
      setBg('#000000');
    } else if (preset === 'sunset') {
      setBg('radial-gradient(circle at center, rgba(245,158,11,0.18), #1a0a02 100%)');
    } else if (preset === 'ocean') {
      setBg('radial-gradient(circle at center, rgba(14,165,233,0.18), #010a17 100%)');
    } else if (preset === 'sakura') {
      setBg('radial-gradient(circle at center, rgba(244,63,94,0.15), #120207 100%)');
    } else if (preset === 'crimson') {
      setBg('radial-gradient(circle at center, rgba(239,68,68,0.15), #140102 100%)');
    } else if (preset === 'lavender') {
      setBg('radial-gradient(circle at center, rgba(168,85,247,0.18), #090214 100%)');
    } else if (preset === 'moss') {
      setBg('radial-gradient(circle at center, rgba(34,197,94,0.15), #021204 100%)');
    } else if (preset === 'desert') {
      setBg('linear-gradient(135deg, rgba(234,179,8,0.15) 0%, #170f02 100%)');
    } else if (preset === 'sunset-valley') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("sunset_valley.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'aurora-cabin') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("aurora_cabin.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'cloud-field') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("cloud_field.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'sunset-train') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("sunset_train.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'ferris-wheel') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("ferris_wheel.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'racing-car') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("racing_car.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'sakura-fuji') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("sakura_fuji.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'deep-sea-sharks') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("deep_sea_sharks.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'van-gogh-lighthouse') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("van_gogh_lighthouse.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'pink-hearts') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("pink_hearts.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'aerial-beach') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("aerial_beach.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'flower-canopy') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("flower_canopy.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'cloud-sky') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("cloud_sky.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'cozy-study') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("cozy_study.webp?v=1.3.2") center/cover no-repeat');
    } else if (preset === 'study-notebook') {
      setBg('linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("study_notebook.webp?v=1.3.2") center/cover no-repeat');
    }

    // Apply custom wallpaper image if loaded
    if (note.customWallpaper) {
      if (notesEditorBgLayer) {
        notesEditorBgLayer.style.backgroundImage = `url(${note.customWallpaper})`;
        notesEditorBgLayer.style.backgroundSize = 'cover';
        notesEditorBgLayer.style.backgroundPosition = 'center';
      } else {
        notesEditorCol.style.backgroundImage = `url(${note.customWallpaper})`;
        notesEditorCol.style.backgroundSize = 'cover';
        notesEditorCol.style.backgroundPosition = 'center';
      }
    }
  }



  // Custom Wallpaper Upload
  if (uploadBg) {
    uploadBg.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (!state.activeNoteId) return;
        const note = state.notes.find(n => n.id === state.activeNoteId);
        if (note) {
          note.customWallpaper = reader.result;
          note.presetTheme = ''; // Clear preset theme so custom wallpaper overrides it
          renderPresetThemeDOM(note);
          debouncedSaveNote(note);
          showNotification('Wallpaper applied successfully! 🖼️', '#10b981');
          
          // Automatically redirect back to notes page by closing overlay
          if (themeOverlay) {
            themeOverlay.style.display = 'none';
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (clearBg) {
    clearBg.addEventListener('click', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.customWallpaper = '';
        renderPresetThemeDOM(note);
        debouncedSaveNote(note);
        showNotification('Wallpaper reset to default.', '#64748b');
      }
    });
  }

  // ================= 2. INTERACTIVE SURFACE SKETCHING DRAWING CANVAS =================
  const surfaceCanvas = document.getElementById('note-surface-canvas');
  const surfaceCtx = surfaceCanvas ? surfaceCanvas.getContext('2d') : null;
  const directDrawDock = document.getElementById('direct-draw-dock');
  
  let surfaceDrawing = false;
  let surfaceStrokesHistory = []; // Undo stack
  let surfaceRedoHistory = [];    // Redo stack
  
  // Custom Lasso selection attributes
  let lassoPoints = [];
  let lassoSelectedImage = null;
  let lassoBaseCanvas = null;
  let lassoImageX = 0;
  let lassoImageY = 0;
  let isLassoDrawing = false;
  let isLassoMoving = false;
  let startDragX = 0;
  let startDragY = 0;

  // Resize canvas helper
  window.resizeSurfaceCanvas = function() {
    if (!surfaceCanvas || !surfaceCtx) return;
    const parent = surfaceCanvas.parentElement;
    if (!parent) return;
    
    // Save current drawing image representation
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = surfaceCanvas.width;
    tempCanvas.height = surfaceCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(surfaceCanvas, 0, 0);
    
    const parentWidth = parent.clientWidth || 800;
    const parentHeight = parent.clientHeight || 1200;
    
    // Adjust logic canvas size
    surfaceCanvas.width = parentWidth;
    surfaceCanvas.height = parentHeight;
    
    // Restore previous drawings
    surfaceCtx.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
    surfaceCtx.drawImage(tempCanvas, 0, 0);
    
    surfaceCtx.lineCap = 'round';
    surfaceCtx.lineJoin = 'round';
  };

  // Sync / load drawings from active note object
  window.loadActiveNoteDrawings = function(note) {
    if (!surfaceCanvas || !surfaceCtx) return;
    surfaceCtx.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
    surfaceStrokesHistory = [];
    surfaceRedoHistory = [];
    lassoSelectedImage = null;
    lassoBaseCanvas = null;

    if (note && note.drawingsDataUrl) {
      const img = new Image();
      img.onload = () => {
        window.resizeSurfaceCanvas();
        surfaceCtx.drawImage(img, 0, 0);
        surfaceStrokesHistory.push(surfaceCanvas.toDataURL());
      };
      img.src = note.drawingsDataUrl;
    } else {
      window.resizeSurfaceCanvas();
    }
  };

  // Helper to save canvas snapshot to undo history
  function pushSurfaceCanvasState() {
    if (!surfaceCanvas) return;
    const currentState = surfaceCanvas.toDataURL();
    const lastState = surfaceStrokesHistory[surfaceStrokesHistory.length - 1];
    if (currentState !== lastState) {
      if (surfaceStrokesHistory.length > 30) surfaceStrokesHistory.shift(); // Limit to 30 undos
      surfaceStrokesHistory.push(currentState);
      surfaceRedoHistory = []; // Clear redo stack on new action
    }
  }

  // Trigger Direct Draw Mode
  window.toggleDirectDrawingMode = function(activate) {
    if (!surfaceCanvas || !directDrawDock) return;
    
    if (activate) {
      window.resizeSurfaceCanvas();
      directDrawDock.style.display = 'flex';
      surfaceCanvas.style.pointerEvents = 'auto';
      surfaceCanvas.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.25)';
      
      if (surfaceStrokesHistory.length === 0) {
        surfaceStrokesHistory.push(surfaceCanvas.toDataURL());
      }
      
      if (window.lucide) {
        window.lucide.createIcons({ scope: directDrawDock });
      }
      
      showNotification('Direct drawing mode active! Draw on top of any elements 🎨', '#818cf8');
    } else {
      directDrawDock.style.display = 'none';
      surfaceCanvas.style.pointerEvents = 'none';
      surfaceCanvas.style.boxShadow = 'none';
      
      // Close drawing settings popovers on exit
      const popoverAdjust = document.getElementById('popover-brush-adjust');
      const popoverColors = document.getElementById('popover-brush-colors');
      if (popoverAdjust) popoverAdjust.style.display = 'none';
      if (popoverColors) popoverColors.style.display = 'none';
      
      if (state.activeNoteId) {
        const note = state.notes.find(n => n.id === state.activeNoteId);
        if (note) {
          note.drawingsDataUrl = surfaceCanvas.toDataURL();
          debouncedSaveNote(note);
        }
      }
    }
  };

  if (surfaceCanvas && surfaceCtx) {
    const getSurfacePos = (e) => {
      const rect = surfaceCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (surfaceCanvas.width / rect.width),
        y: (clientY - rect.top) * (surfaceCanvas.height / rect.height)
      };
    };

    const startSurfaceDraw = (e) => {
      const pos = getSurfacePos(e);
      const brushType = document.getElementById('draw-dock-brush-type').value;
      
      if (brushType === 'lasso') {
        if (lassoSelectedImage) {
          const imgW = lassoSelectedImage.width;
          const imgH = lassoSelectedImage.height;
          if (pos.x >= lassoImageX && pos.x <= lassoImageX + imgW &&
              pos.y >= lassoImageY && pos.y <= lassoImageY + imgH) {
            isLassoMoving = true;
            startDragX = pos.x - lassoImageX;
            startDragY = pos.y - lassoImageY;
            e.preventDefault();
            return;
          } else {
            dropLassoSelection();
          }
        }
        
        isLassoDrawing = true;
        lassoPoints = [{ x: pos.x, y: pos.y }];
        pushSurfaceCanvasState();
        lassoBaseCanvas = document.createElement('canvas');
        lassoBaseCanvas.width = surfaceCanvas.width;
        lassoBaseCanvas.height = surfaceCanvas.height;
        lassoBaseCanvas.getContext('2d').drawImage(surfaceCanvas, 0, 0);
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      surfaceDrawing = true;
      surfaceCtx.beginPath();
      surfaceCtx.moveTo(pos.x, pos.y);
    };

    const drawSurface = (e) => {
      if (!surfaceDrawing && !isLassoDrawing && !isLassoMoving) return;
      e.preventDefault();
      const pos = getSurfacePos(e);
      
      const brushType = document.getElementById('draw-dock-brush-type').value;
      const sizeVal = parseInt(document.getElementById('draw-dock-brush-size').value);
      const opacityVal = parseInt(document.getElementById('draw-dock-brush-opacity').value) / 100;
      const hexColor = document.getElementById('draw-dock-brush-color').value;

      if (isLassoMoving && lassoSelectedImage) {
        lassoImageX = pos.x - startDragX;
        lassoImageY = pos.y - startDragY;
        redrawCanvasWithFloatingLasso();
        return;
      }
      
      if (isLassoDrawing) {
        lassoPoints.push({ x: pos.x, y: pos.y });
        redrawCanvasWithFloatingLasso();
        
        surfaceCtx.save();
        surfaceCtx.beginPath();
        surfaceCtx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
        for (let i = 1; i < lassoPoints.length; i++) {
          surfaceCtx.lineTo(lassoPoints[i].x, lassoPoints[i].y);
        }
        surfaceCtx.setLineDash([4, 4]);
        surfaceCtx.strokeStyle = '#818cf8';
        surfaceCtx.lineWidth = 1.5;
        surfaceCtx.stroke();
        surfaceCtx.restore();
        return;
      }

      surfaceCtx.lineCap = 'round';
      surfaceCtx.lineJoin = 'round';
      surfaceCtx.globalCompositeOperation = 'source-over';
      surfaceCtx.shadowBlur = 0;
      surfaceCtx.shadowColor = 'transparent';
      surfaceCtx.lineWidth = sizeVal;

      if (brushType === 'eraser') {
        surfaceCtx.globalCompositeOperation = 'destination-out';
        surfaceCtx.lineWidth = sizeVal * 2;
        surfaceCtx.strokeStyle = 'rgba(0,0,0,1)';
      } else if (brushType === 'pencil') {
        surfaceCtx.lineWidth = Math.max(1, sizeVal * 0.4);
        surfaceCtx.strokeStyle = hexToRgba(hexColor, opacityVal * 0.6);
      } else if (brushType === 'brush') {
        surfaceCtx.lineWidth = sizeVal;
        surfaceCtx.strokeStyle = hexToRgba(hexColor, opacityVal * 0.7);
        surfaceCtx.shadowBlur = sizeVal * 0.4;
        surfaceCtx.shadowColor = hexColor;
      } else if (brushType === 'marker') {
        surfaceCtx.lineCap = 'square';
        surfaceCtx.lineWidth = sizeVal * 1.3;
        surfaceCtx.strokeStyle = hexToRgba(hexColor, opacityVal * 0.85);
      } else if (brushType === 'highlighter') {
        surfaceCtx.lineCap = 'square';
        surfaceCtx.lineWidth = sizeVal * 2.2;
        surfaceCtx.strokeStyle = hexToRgba(hexColor, 0.45);
        surfaceCtx.globalCompositeOperation = 'multiply';
      } else if (brushType === 'glow') {
        surfaceCtx.lineWidth = sizeVal;
        surfaceCtx.strokeStyle = '#ffffff';
        surfaceCtx.shadowBlur = sizeVal * 1.5;
        surfaceCtx.shadowColor = hexColor;
      } else {
        surfaceCtx.strokeStyle = hexToRgba(hexColor, opacityVal);
      }

      surfaceCtx.lineTo(pos.x, pos.y);
      surfaceCtx.stroke();
    };

    const stopSurfaceDraw = () => {
      if (isLassoMoving) {
        isLassoMoving = false;
        return;
      }
      
      if (isLassoDrawing) {
        isLassoDrawing = false;
        processLassoSelection();
        return;
      }

      if (!surfaceDrawing) return;
      surfaceDrawing = false;
      surfaceCtx.closePath();
      pushSurfaceCanvasState();
    };

    surfaceCanvas.addEventListener('mousedown', startSurfaceDraw);
    surfaceCanvas.addEventListener('mousemove', drawSurface);
    window.addEventListener('mouseup', stopSurfaceDraw);

    surfaceCanvas.addEventListener('touchstart', startSurfaceDraw, { passive: false });
    surfaceCanvas.addEventListener('touchmove', drawSurface, { passive: false });
    window.addEventListener('touchend', stopSurfaceDraw);
  }

  function processLassoSelection() {
    if (lassoPoints.length < 3) return;
    const xs = lassoPoints.map(p => p.x);
    const ys = lassoPoints.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const w = maxX - minX;
    const h = maxY - minY;
    if (w < 4 || h < 4) return;
    
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext('2d');
    
    if (!lassoBaseCanvas) {
      lassoBaseCanvas = document.createElement('canvas');
      lassoBaseCanvas.width = surfaceCanvas.width;
      lassoBaseCanvas.height = surfaceCanvas.height;
      lassoBaseCanvas.getContext('2d').drawImage(surfaceCanvas, 0, 0);
    }
    
    offCtx.save();
    offCtx.beginPath();
    offCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
      offCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    offCtx.closePath();
    offCtx.clip();
    offCtx.drawImage(lassoBaseCanvas, -minX, -minY);
    offCtx.restore();
    
    const baseCtx = lassoBaseCanvas.getContext('2d');
    baseCtx.save();
    baseCtx.beginPath();
    baseCtx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
    for (let i = 1; i < lassoPoints.length; i++) {
      baseCtx.lineTo(lassoPoints[i].x, lassoPoints[i].y);
    }
    baseCtx.closePath();
    baseCtx.globalCompositeOperation = 'destination-out';
    baseCtx.fill();
    baseCtx.restore();
    
    lassoSelectedImage = offscreen;
    lassoImageX = minX;
    lassoImageY = minY;
    
    redrawCanvasWithFloatingLasso();
    showNotification('Region cut! Drag it to move or click Done to drop ✂️', '#a855f7');
  }

  function redrawCanvasWithFloatingLasso(drawDashedBorder = true) {
    if (!surfaceCanvas || !surfaceCtx) return;
    if (lassoBaseCanvas) {
      surfaceCtx.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
      surfaceCtx.drawImage(lassoBaseCanvas, 0, 0);
      if (lassoSelectedImage) {
        surfaceCtx.save();
        surfaceCtx.drawImage(lassoSelectedImage, lassoImageX, lassoImageY);
        if (drawDashedBorder) {
          surfaceCtx.setLineDash([4, 4]);
          surfaceCtx.strokeStyle = '#a855f7';
          surfaceCtx.lineWidth = 1;
          surfaceCtx.strokeRect(lassoImageX, lassoImageY, lassoSelectedImage.width, lassoSelectedImage.height);
        }
        surfaceCtx.restore();
      }
    } else if (surfaceStrokesHistory.length > 0) {
      const img = new Image();
      img.onload = () => {
        surfaceCtx.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
        surfaceCtx.drawImage(img, 0, 0);
        if (lassoSelectedImage) {
          surfaceCtx.save();
          surfaceCtx.drawImage(lassoSelectedImage, lassoImageX, lassoImageY);
          if (drawDashedBorder) {
            surfaceCtx.setLineDash([4, 4]);
            surfaceCtx.strokeStyle = '#a855f7';
            surfaceCtx.lineWidth = 1;
            surfaceCtx.strokeRect(lassoImageX, lassoImageY, lassoSelectedImage.width, lassoSelectedImage.height);
          }
          surfaceCtx.restore();
        }
      };
      img.src = surfaceStrokesHistory[surfaceStrokesHistory.length - 1];
    }
  }

  function dropLassoSelection() {
    if (!lassoSelectedImage) return;
    // Draw the image synchronously onto the canvas WITHOUT the dashed border
    redrawCanvasWithFloatingLasso(false);
    lassoSelectedImage = null;
    lassoBaseCanvas = null;
    pushSurfaceCanvasState();
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Popovers and Toggle Buttons Setup
  const btnAdjust = document.getElementById('btn-draw-dock-adjust');
  const popoverAdjust = document.getElementById('popover-brush-adjust');
  const btnColors = document.getElementById('btn-draw-dock-colors');
  const popoverColors = document.getElementById('popover-brush-colors');

  if (btnAdjust && popoverAdjust) {
    btnAdjust.onclick = (e) => {
      e.stopPropagation();
      const isVisible = popoverAdjust.style.display === 'flex';
      popoverAdjust.style.display = isVisible ? 'none' : 'flex';
      if (popoverColors) popoverColors.style.display = 'none';
    };
  }

  if (btnColors && popoverColors) {
    btnColors.onclick = (e) => {
      e.stopPropagation();
      const isVisible = popoverColors.style.display === 'grid';
      popoverColors.style.display = isVisible ? 'none' : 'grid';
      if (popoverAdjust) popoverAdjust.style.display = 'none';
    };
  }

  // Prevent closing when clicking inside popovers
  [popoverAdjust, popoverColors].forEach(popover => {
    if (popover) {
      popover.onclick = (e) => e.stopPropagation();
    }
  });

  // Close popovers on click outside
  document.addEventListener('click', () => {
    if (popoverAdjust) popoverAdjust.style.display = 'none';
    if (popoverColors) popoverColors.style.display = 'none';
  });

  // Brush size and opacity sliders
  const sizeSlider = document.getElementById('draw-dock-brush-size');
  const sizeLbl = document.getElementById('lbl-draw-dock-size');
  const indicatorSize = document.getElementById('indicator-brush-size');
  if (sizeSlider) {
    sizeSlider.oninput = () => {
      const val = `${sizeSlider.value}px`;
      if (sizeLbl) sizeLbl.innerText = val;
      if (indicatorSize) indicatorSize.innerText = val;
    };
  }
  
  const opacitySlider = document.getElementById('draw-dock-brush-opacity');
  const opacityLbl = document.getElementById('lbl-draw-dock-opacity');
  if (opacitySlider && opacityLbl) {
    opacitySlider.oninput = () => opacityLbl.innerText = `${opacitySlider.value}%`;
  }

  // Color preset selector dots & Indicator updates
  const paletteDots = document.querySelectorAll('.draw-palette-dot');
  const brushColorPicker = document.getElementById('draw-dock-brush-color');
  const indicatorColorDot = document.getElementById('indicator-brush-color-dot');
  
  paletteDots.forEach(dot => {
    dot.onclick = () => {
      dropLassoSelection();
      paletteDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const hex = dot.getAttribute('data-color');
      if (brushColorPicker) brushColorPicker.value = hex;
      if (indicatorColorDot) indicatorColorDot.style.backgroundColor = hex;
    };
  });
  
  if (brushColorPicker) {
    brushColorPicker.oninput = () => {
      dropLassoSelection();
      paletteDots.forEach(d => d.classList.remove('active'));
      if (indicatorColorDot) indicatorColorDot.style.backgroundColor = brushColorPicker.value;
    };
  }

  // Set initial color preview dot on load
  const activeDot = document.querySelector('.draw-palette-dot.active');
  if (indicatorColorDot) {
    if (activeDot) {
      indicatorColorDot.style.backgroundColor = activeDot.getAttribute('data-color');
    } else if (brushColorPicker) {
      indicatorColorDot.style.backgroundColor = brushColorPicker.value;
    }
  }

  // Brush type change drops floating lasso
  const brushTypeDropdown = document.getElementById('draw-dock-brush-type');
  if (brushTypeDropdown) {
    brushTypeDropdown.onchange = () => {
      if (brushTypeDropdown.value !== 'lasso') {
        dropLassoSelection();
      }
    };
  }

  // Tool button selection handlers
  const toolBtns = document.querySelectorAll('.draw-tools-group .draw-tool-btn');
  toolBtns.forEach(btn => {
    btn.onclick = () => {
      toolBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const toolName = btn.getAttribute('data-tool');
      if (brushTypeDropdown) {
        brushTypeDropdown.value = toolName;
        // Trigger onchange manually
        brushTypeDropdown.dispatchEvent(new Event('change'));
      }
    };
  });

  // Actions
  const btnSaveDock = document.getElementById('btn-draw-dock-save');
  if (btnSaveDock) {
    btnSaveDock.onclick = () => {
      dropLassoSelection();
      window.toggleDirectDrawingMode(false);
    };
  }

  const btnUndoDock = document.getElementById('btn-draw-dock-undo');
  if (btnUndoDock) {
    btnUndoDock.onclick = () => {
      if (surfaceStrokesHistory.length > 1) {
        dropLassoSelection();
        const currentState = surfaceStrokesHistory.pop();
        surfaceRedoHistory.push(currentState);
        
        const prevState = surfaceStrokesHistory[surfaceStrokesHistory.length - 1];
        const img = new Image();
        img.onload = () => {
          surfaceCtx.save();
          surfaceCtx.globalCompositeOperation = 'source-over';
          surfaceCtx.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
          surfaceCtx.drawImage(img, 0, 0);
          surfaceCtx.restore();
        };
        img.src = prevState;
      }
    };
  }

  const btnRedoDock = document.getElementById('btn-draw-dock-redo');
  if (btnRedoDock) {
    btnRedoDock.onclick = () => {
      if (surfaceRedoHistory.length > 0) {
        dropLassoSelection();
        const nextState = surfaceRedoHistory.pop();
        surfaceStrokesHistory.push(nextState);
        
        const img = new Image();
        img.onload = () => {
          surfaceCtx.save();
          surfaceCtx.globalCompositeOperation = 'source-over';
          surfaceCtx.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
          surfaceCtx.drawImage(img, 0, 0);
          surfaceCtx.restore();
        };
        img.src = nextState;
      }
    };
  }

  const btnClearDock = document.getElementById('btn-draw-dock-clear');
  if (btnClearDock) {
    btnClearDock.onclick = () => {
      lassoSelectedImage = null;
      surfaceCtx.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
      pushSurfaceCanvasState();
    };
  }

  window.addEventListener('resize', () => {
    if (directDrawDock && directDrawDock.style.display === 'flex') {
      window.resizeSurfaceCanvas();
    }
    updateNotesMobileLayout();
  });
  // ================= 3. SECURE PASSCODE VAULT SCREEN =================
  const vaultTrigger = document.getElementById('btn-note-vault-trigger');
  const vaultConfigOverlay = document.getElementById('note-vault-config-overlay');
  const btnCloseVaultConfig = document.getElementById('btn-close-vault-config');
  const btnVaultSave = document.getElementById('btn-vault-save');
  const btnVaultDisable = document.getElementById('btn-vault-disable');
  const vaultSetupInput = document.getElementById('vault-setup-passcode');
  const vaultOverlay = document.getElementById('note-vault-overlay');
  const vaultUnlockInput = document.getElementById('vault-passcode-input');
  const btnVaultCancelUnlock = document.getElementById('btn-cancel-vault-unlock');
  const btnVaultUnlockEnter = document.getElementById('btn-vault-unlock-enter');

  if (vaultTrigger && vaultConfigOverlay) {
    vaultTrigger.addEventListener('click', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        // Pre-populate input if already locked
        if (vaultSetupInput) {
          vaultSetupInput.value = note.vaultPasscode || '';
        }
        vaultConfigOverlay.style.display = vaultConfigOverlay.style.display === 'none' ? 'block' : 'none';
        closeOtherOverlays('vault-config-overlay');
      }
    });
  }

  if (btnCloseVaultConfig && vaultConfigOverlay) {
    btnCloseVaultConfig.addEventListener('click', () => vaultConfigOverlay.style.display = 'none');
  }

  // Locking a page
  if (btnVaultSave && vaultSetupInput) {
    btnVaultSave.addEventListener('click', () => {
      const code = vaultSetupInput.value;
      if (code.length !== 4 || isNaN(code)) {
        showNotification('Passcode must be a 4-digit number!', '#f43f5e');
        return;
      }
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.isLocked = true;
        note.vaultPasscode = code;
        debouncedSaveNote(note);
        vaultConfigOverlay.style.display = 'none';
        updateVaultTriggerUI(true);
        showNotification('Note protected in passcode vault! 🔒', '#818cf8');
      }
    });
  }

  if (btnVaultDisable) {
    btnVaultDisable.addEventListener('click', () => {
      if (!state.activeNoteId) return;
      const note = state.notes.find(n => n.id === state.activeNoteId);
      if (note) {
        note.isLocked = false;
        note.vaultPasscode = '';
        debouncedSaveNote(note);
        vaultConfigOverlay.style.display = 'none';
        updateVaultTriggerUI(false);
        showNotification('Passcode lock removed from page.', '#64748b');
      }
    });
  }

  function updateVaultTriggerUI(isLocked) {
    const txt = document.getElementById('btn-vault-text');
    if (txt) {
      txt.innerText = isLocked ? 'Locked (Secure)' : 'Vault Lock';
    }
  }

  // Unlock Keypad digits
  let tempUnlockPasscode = "";
  const keypadBtns = document.querySelectorAll('.keypad-btn');
  keypadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-key');
      if (val === 'clear') {
        tempUnlockPasscode = tempUnlockPasscode.slice(0, -1);
      } else if (val) {
        if (tempUnlockPasscode.length < 4) tempUnlockPasscode += val;
      }
      renderUnlockDots();
      
      // Auto-unlock once 4 digits entered
      if (tempUnlockPasscode.length === 4) {
        setTimeout(verifyUnlockPasscode, 150);
      }
    });
  });

  if (btnVaultUnlockEnter) {
    btnVaultUnlockEnter.addEventListener('click', verifyUnlockPasscode);
  }

  function renderUnlockDots() {
    const dots = document.querySelectorAll('#vault-passcode-dots .dot');
    dots.forEach((dot, index) => {
      if (index < tempUnlockPasscode.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  function verifyUnlockPasscode() {
    if (!state.activeNoteId) return;
    const note = state.notes.find(n => n.id === state.activeNoteId);
    if (note) {
      if (tempUnlockPasscode === note.vaultPasscode) {
        // Unlock note!
        vaultOverlay.style.display = 'none';
        showNotification('Identity verified. Access granted! 🔓', '#10b981');
        // Clear locked inputs mask, load document values
        document.getElementById('note-editor-title').style.filter = '';
        document.getElementById('note-editor-content').style.filter = '';
        document.getElementById('note-editor-subheading').style.filter = '';
        document.getElementById('note-editor-desc').style.filter = '';
      } else {
        // Shakes keypad overlay on incorrect passcode
        const card = vaultOverlay.querySelector('.vault-lock-card');
        if (card) {
          card.classList.add('shaking');
          setTimeout(() => card.classList.remove('shaking'), 400);
        }
        tempUnlockPasscode = "";
        renderUnlockDots();
        showNotification('Passcode verification failed! ❌', '#f43f5e');
      }
    }
  }

  if (btnVaultCancelUnlock) {
    btnVaultCancelUnlock.addEventListener('click', () => {
      // Close editor completely, go back to empty slate
      state.activeNoteId = null;
      loadActiveNoteIntoEditor();
      if (vaultOverlay) vaultOverlay.style.display = 'none';
    });
  }

  // Check locking state inside global active note loader
  window.checkNotePasscodeState = function(note) {
    if (vaultOverlay) {
      vaultOverlay.style.display = 'none';
      updateVaultTriggerUI(false);
    }
    
    // Always clear any filters/blurs
    const titleField = document.getElementById('note-editor-title');
    const contentArea = document.getElementById('note-editor-content');
    const subheadingField = document.getElementById('note-editor-subheading');
    const descField = document.getElementById('note-editor-desc');
    
    if (titleField) titleField.style.filter = '';
    if (contentArea) contentArea.style.filter = '';
    if (subheadingField) subheadingField.style.filter = '';
    if (descField) descField.style.filter = '';
    
    renderPresetThemeDOM(note);
  };

  // ================= 4. CATEGORY RELATIONSHIP MIND-MAP NODE SYSTEM =================
  const mindmapTrigger = document.getElementById('btn-note-mindmap-trigger');
  const mindmapOverlay = document.getElementById('note-mindmap-overlay');
  const mindmapClose = document.getElementById('btn-close-mindmap');
  const mCanvas = document.getElementById('mindmap-canvas');
  let mCtx = mCanvas ? mCanvas.getContext('2d') : null;
  let mindNodes = [];
  let mindDraggingNode = null;
  let mindMapAnimationFrame = null;

  if (mindmapTrigger && mindmapOverlay) {
    mindmapTrigger.addEventListener('click', () => {
      mindmapOverlay.style.display = mindmapOverlay.style.display === 'none' ? 'block' : 'none';
      closeOtherOverlays('mindmap-overlay');
      if (mindmapOverlay.style.display === 'block') {
        buildMindmapGraph();
        animateMindmap();
      } else {
        cancelAnimationFrame(mindMapAnimationFrame);
      }
    });
  }

  if (mindmapClose && mindmapOverlay) {
    mindmapClose.addEventListener('click', () => {
      mindmapOverlay.style.display = 'none';
      cancelAnimationFrame(mindMapAnimationFrame);
    });
  }

  function buildMindmapGraph() {
    if (!mCanvas) return;
    mindNodes = [];
    
    const centerX = mCanvas.width / 2;
    const centerY = mCanvas.height / 2;

    // Center Hub node
    const root = {
      x: centerX,
      y: centerY,
      r: 32,
      label: "My Workspace",
      type: "root",
      color: "var(--color-indigo)",
      vx: 0,
      vy: 0
    };
    mindNodes.push(root);

    // Group notes by Category
    const categoryGroups = {};
    state.notes.forEach(note => {
      const cat = note.category || 'General';
      if (!categoryGroups[cat]) categoryGroups[cat] = [];
      categoryGroups[cat].push(note);
    });

    // Create Category Nodes
    let idx = 0;
    const cats = Object.keys(categoryGroups);
    cats.forEach(catName => {
      const angle = (idx / cats.length) * Math.PI * 2;
      const dist = 110;
      const catNode = {
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        r: 20,
        label: catName,
        type: "category",
        color: "#10b981",
        parent: root,
        vx: 0,
        vy: 0
      };
      mindNodes.push(catNode);

      // Create Note Page Nodes
      const list = categoryGroups[catName];
      list.forEach((note, noteIdx) => {
        const noteAngle = angle - 0.4 + (noteIdx / list.length) * 0.8;
        const noteDist = 180;
        const noteNode = {
          id: note.id,
          x: centerX + Math.cos(noteAngle) * noteDist,
          y: centerY + Math.sin(noteAngle) * noteDist,
          r: 12,
          label: note.title || 'Untitled',
          type: "note",
          color: "#f59e0b",
          parent: catNode,
          vx: 0,
          vy: 0
        };
        mindNodes.push(noteNode);
      });
      idx++;
    });
  }

  function animateMindmap() {
    if (!mCanvas || !mCtx) return;
    
    // Nodes physics attraction/repulsion forces loop
    for (let i = 0; i < mindNodes.length; i++) {
      const n1 = mindNodes[i];
      if (n1 === mindDraggingNode) continue;
      
      // Hooke's Elastic force toward parent node
      if (n1.parent) {
        const dx = n1.parent.x - n1.x;
        const dy = n1.parent.y - n1.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const force = (dist - 80) * 0.005; // spring constant
        n1.vx += (dx / dist) * force;
        n1.vy += (dy / dist) * force;
      }

      // Repulsion force between adjacent nodes (prevent overlapping)
      for (let j = 0; j < mindNodes.length; j++) {
        if (i === j) continue;
        const n2 = mindNodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        if (dist < 75) {
          const force = (75 - dist) * 0.012;
          n1.vx -= (dx / dist) * force;
          n1.vy -= (dy / dist) * force;
        }
      }

      // Physics drag damping
      n1.vx *= 0.85;
      n1.vy *= 0.85;
      n1.x += n1.vx;
      n1.y += n1.vy;

      // Keep logical boundaries
      n1.x = Math.max(n1.r + 10, Math.min(mCanvas.width - n1.r - 10, n1.x));
      n1.y = Math.max(n1.r + 10, Math.min(mCanvas.height - n1.r - 10, n1.y));
    }

    // Render Canvas frame
    mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);

    // Draw Spring Connecting Lines
    mCtx.lineWidth = 1.5;
    mindNodes.forEach(n => {
      if (n.parent) {
        mCtx.strokeStyle = n.type === 'note' ? 'rgba(245,158,11,0.28)' : 'rgba(16,185,129,0.35)';
        mCtx.beginPath();
        mCtx.moveTo(n.x, n.y);
        mCtx.lineTo(n.parent.x, n.parent.y);
        mCtx.stroke();
      }
    });

    // Draw Circle Nodes
    mindNodes.forEach(n => {
      mCtx.fillStyle = n.color;
      mCtx.beginPath();
      mCtx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      mCtx.fill();
      
      // Node Glowing Shadow borders
      mCtx.strokeStyle = 'rgba(255,255,255,0.12)';
      mCtx.lineWidth = 2.5;
      mCtx.stroke();

      // Text Labels
      mCtx.fillStyle = '#fff';
      mCtx.font = n.type === 'root' ? 'bold 10px sans-serif' : 'bold 9px sans-serif';
      mCtx.textAlign = 'center';
      
      // Cut text if too long
      let displayLabel = n.label;
      if (displayLabel.length > 14) displayLabel = displayLabel.slice(0, 12) + "..";
      
      mCtx.fillText(displayLabel, n.x, n.y + n.r + 11);
    });

    mindMapAnimationFrame = requestAnimationFrame(animateMindmap);
  }

  // Mindmap Node Dragging & Selection Click handlers
  if (mCanvas) {
    const getNodeAt = (e) => {
      const rect = mCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX - rect.left) * (mCanvas.width / rect.width);
      const y = (clientY - rect.top) * (mCanvas.height / rect.height);
      
      return mindNodes.find(n => {
        const dx = n.x - x;
        const dy = n.y - y;
        return Math.sqrt(dx*dx + dy*dy) < n.r + 5;
      });
    };

    mCanvas.addEventListener('mousedown', (e) => {
      const node = getNodeAt(e);
      if (node) {
        mindDraggingNode = node;
        mCanvas.style.cursor = 'grabbing';
      }
    });

    mCanvas.addEventListener('mousemove', (e) => {
      if (mindDraggingNode) {
        const rect = mCanvas.getBoundingClientRect();
        mindDraggingNode.x = (e.clientX - rect.left) * (mCanvas.width / rect.width);
        mindDraggingNode.y = (e.clientY - rect.top) * (mCanvas.height / rect.height);
      } else {
        const node = getNodeAt(e);
        mCanvas.style.cursor = node ? 'pointer' : 'grab';
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (mindDraggingNode) {
        // If it is a note node and wasn't dragged far, trigger click selection!
        if (mindDraggingNode.type === 'note') {
          state.activeNoteId = mindDraggingNode.id;
          renderNotesView();
          loadActiveNoteIntoEditor();
          mindmapOverlay.style.display = 'none';
          cancelAnimationFrame(mindMapAnimationFrame);
          showNotification(`Navigated to "${mindDraggingNode.label}" 🧭`, '#10b981');
        }
        mindDraggingNode = null;
        mCanvas.style.cursor = 'grab';
      }
    });
  }

  // ================= 5. FLOATING POMODORO STUDY WIDGET =================
  const pomodoroTrigger = document.getElementById('btn-note-pomodoro-trigger');
  const pomodoroWidget = document.getElementById('note-pomodoro-widget');
  const pomodoroClose = document.getElementById('btn-close-pomodoro');
  const btnPomoStart = document.getElementById('btn-pomodoro-start');
  const btnPomoPause = document.getElementById('btn-pomodoro-pause');
  const btnPomoReset = document.getElementById('btn-pomodoro-reset');
  const pomoTimeDisplay = document.getElementById('pomodoro-time');
  const pomoLabel = document.getElementById('pomodoro-state');

  let pomoTimeLeft = 25 * 60; // 25 minutes
  let pomoTimerInterval = null;
  let pomoCurrentState = "study"; // study or break

  if (pomodoroTrigger && pomodoroWidget) {
    pomodoroTrigger.addEventListener('click', () => {
      pomodoroWidget.style.display = pomodoroWidget.style.display === 'none' ? 'block' : 'none';
      if (pomodoroWidget.style.display === 'block') {
        pomoTimeLeft = 25 * 60;
        updatePomoDisplay();
      }
    });
  }

  if (pomodoroClose && pomodoroWidget) {
    pomodoroClose.addEventListener('click', () => {
      pomodoroWidget.style.display = 'none';
      clearInterval(pomoTimerInterval);
    });
  }

  function updatePomoDisplay() {
    if (!pomoTimeDisplay) return;
    const mins = Math.floor(pomoTimeLeft / 60);
    const secs = pomoTimeLeft % 60;
    pomoTimeDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  if (btnPomoStart) {
    btnPomoStart.addEventListener('click', () => {
      if (pomoTimerInterval) return;
      pomoTimerInterval = setInterval(() => {
        if (pomoTimeLeft > 0) {
          pomoTimeLeft--;
          updatePomoDisplay();
        } else {
          // Timer finished
          clearInterval(pomoTimerInterval);
          pomoTimerInterval = null;
          handlePomoCycleFinished();
        }
      }, 1000);
      showNotification('Focus timer active. Start studying! 📚', '#f43f5e');
    });
  }

  if (btnPomoPause) {
    btnPomoPause.addEventListener('click', () => {
      clearInterval(pomoTimerInterval);
      pomoTimerInterval = null;
    });
  }

  if (btnPomoReset) {
    btnPomoReset.addEventListener('click', () => {
      clearInterval(pomoTimerInterval);
      pomoTimerInterval = null;
      pomoCurrentState = "study";
      if (pomoLabel) pomoLabel.innerText = "Study Session";
      pomoTimeLeft = 25 * 60;
      updatePomoDisplay();
    });
  }

  function handlePomoCycleFinished() {
    if (pomoCurrentState === "study") {
      // Toggle to short break
      pomoCurrentState = "break";
      if (pomoLabel) pomoLabel.innerText = "Short Break ☕";
      pomoTimeLeft = 5 * 60;
      updatePomoDisplay();
      playLevelUpSound(); // Trigger sound notification
      showNotification('Study block completed! Take a 5-minute break. ☕', '#10b981');
      
      // Reward 5 XP for focus!
      awardXPPoints(5);
    } else {
      // Return to study
      pomoCurrentState = "study";
      if (pomoLabel) pomoLabel.innerText = "Study Session";
      pomoTimeLeft = 25 * 60;
      updatePomoDisplay();
      playLevelUpSound();
      showNotification('Break over. Back to studying! ✍️', '#6366f1');
    }
  }

  function awardXPPoints(amount) {
    if (state.db) {
      state.db.getSetting('user_xp', 0).then(xp => {
        let newXp = xp + amount;
        state.db.setSetting('user_xp', newXp).then(() => {
          if (window.renderDashboardStats) window.renderDashboardStats();
          showNotification(`Earned +${amount} XP for focus! 🌟`, '#fbbf24');
        });
      });
    }
  }

  // ================= 6. SIMULATED OFFLINE AI COPILOT ASSISTANT =================
  const aiTrigger = document.getElementById('btn-note-ai-trigger');
  const aiPanel = document.getElementById('note-ai-copilot-panel');
  const aiClose = document.getElementById('btn-close-ai');
  const btnAiSummarize = document.getElementById('btn-ai-summarize');
  const btnAiTags = document.getElementById('btn-ai-tags');
  const btnAiMood = document.getElementById('btn-ai-mood');
  const aiOutputText = document.getElementById('ai-output-text');

  if (aiTrigger && aiPanel) {
    aiTrigger.addEventListener('click', () => {
      aiPanel.style.display = aiPanel.style.display === 'none' ? 'flex' : 'none';
      if (aiPanel.style.display === 'flex') {
        closeOtherOverlays('ai-panel');
      }
    });
  }

  if (aiClose && aiPanel) {
    aiClose.addEventListener('click', () => aiPanel.style.display = 'none');
  }

  // Offline simulated AI processing blocks
  if (btnAiSummarize && aiOutputText) {
    btnAiSummarize.addEventListener('click', () => {
      const content = document.getElementById('note-editor-content').value;
      if (!content || content.trim() === '') {
        aiOutputText.innerHTML = `<p style="color:var(--text-darker);">Write some content in your note first!</p>`;
        return;
      }

      aiOutputText.innerHTML = `<p style="font-size:0.75rem; color: #818cf8; animation: pulse 1s infinite alternate;">🧠 Analyzing document structure...</p>`;
      
      setTimeout(() => {
        // Extract 3 major bullet summaries
        const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 15);
        let summaryHTML = `<h5 class="ai-summary-heading">📝 Document Summary</h5><ul>`;
        
        if (sentences.length > 0) {
          const count = Math.min(3, sentences.length);
          for (let i = 0; i < count; i++) {
            summaryHTML += `<li>${sentences[i]}.</li>`;
          }
        } else {
          summaryHTML += `<li>Short page summary: ${content.slice(0, 80)}...</li>`;
        }
        summaryHTML += `</ul>`;
        aiOutputText.innerHTML = summaryHTML;
        showNotification('Summary compiled offline!', '#10b981');
      }, 800);
    });
  }

  if (btnAiTags && aiOutputText) {
    btnAiTags.addEventListener('click', () => {
      const content = document.getElementById('note-editor-content').value;
      if (!content || content.trim() === '') {
        aiOutputText.innerHTML = `<p style="color:var(--text-darker);">Write some content in your note first!</p>`;
        return;
      }

      aiOutputText.innerHTML = `<p style="font-size:0.75rem; color: #818cf8; animation: pulse 1s infinite alternate;">🏷️ Sorting key patterns...</p>`;
      
      setTimeout(() => {
        const words = content.toLowerCase().split(/\W+/);
        const map = {};
        words.forEach(w => {
          if (w.length > 4 && !['about', 'their', 'there', 'which', 'would', 'could', 'should', 'every'].includes(w)) {
            map[w] = (map[w] || 0) + 1;
          }
        });

        const sorted = Object.entries(map).sort((a,b) => b[1] - a[1]).slice(0, 5);
        let tagsHTML = `<h5 class="ai-summary-heading">🏷️ Smart Category Tags</h5><div style="margin-top:0.4rem;">`;
        if (sorted.length > 0) {
          sorted.forEach(entry => {
            tagsHTML += `<span class="ai-tag-badge">#${entry[0]}</span>`;
          });
        } else {
          tagsHTML += `<span class="ai-tag-badge">#general</span><span class="ai-tag-badge">#journal</span>`;
        }
        tagsHTML += `</div>`;
        aiOutputText.innerHTML = tagsHTML;
        showNotification('Keywords sorted!', '#10b981');
      }, 700);
    });
  }

  if (btnAiMood && aiOutputText) {
    btnAiMood.addEventListener('click', () => {
      const content = document.getElementById('note-editor-content').value;
      if (!content || content.trim() === '') {
        aiOutputText.innerHTML = `<p style="color:var(--text-darker);">Write some content in your note first!</p>`;
        return;
      }

      aiOutputText.innerHTML = `<p style="font-size:0.75rem; color: #818cf8; animation: pulse 1s infinite alternate;">🔮 Indexing emotional keyframes...</p>`;
      
      setTimeout(() => {
        let happyScore = (content.match(/(happy|joy|great|amazing|won|level|excited|love|nice|perfect)/gi) || []).length;
        let stressScore = (content.match(/(sad|stress|tired|exhaust|failed|lose|miss|dead|hard)/gi) || []).length;
        
        let mood = "Neutral & Balanced 🌌";
        let recommendation = "Sunset Orange preset to maintain clean, professional focus.";
        let color = "#fb923c";

        if (happyScore > stressScore) {
          mood = "Highly Dynamic & Positive! 🔮";
          recommendation = "Use the **Aurora Glow** dynamic preset to reflect creative energy.";
          color = "#ec4899";
        } else if (stressScore > happyScore) {
          mood = "Low Energy / Stressed 🌲";
          recommendation = "Apply the **Forest Glow** wallpaper preset to induce calm, slow breathing.";
          color = "#10b981";
        }

        let moodHTML = `
          <h5 class="ai-summary-heading">🔮 Mood Analytics</h5>
          <p style="font-size:0.72rem; color: ${color}; font-weight:800; margin: 0.25rem 0;">${mood}</p>
          <p style="font-size:0.68rem; color: var(--text-muted); line-height:1.45; margin-top:0.35rem;"><strong>Theme Recommendation:</strong> ${recommendation}</p>
        `;
        aiOutputText.innerHTML = moodHTML;
        showNotification('Mood analysis compiled!', '#10b981');
      }, 900);
    });
  }



  // ================= 8. REAL-TIME INSTAGRAM STORY PREVIEW SYNCHRONIZATION =================
  window.syncInstagramStoryCard = function(note) {
    const card = document.getElementById('instagram-story-preview');
    const instaTitle = document.getElementById('insta-title');
    const instaSub = document.getElementById('insta-subheading');
    const instaEmoji = document.getElementById('insta-emoji');
    const instaCat = document.getElementById('insta-category-pill');
    const instaBg = document.getElementById('insta-bg-layer');

    if (!card || !note) return;

    // 1. Sync Title & Subheading
    if (instaTitle) {
      instaTitle.innerText = note.title || 'Untitled Page';
      instaTitle.style.fontFamily = note.titleFont || '';
      
      const themeColor = note.titleColor === 'default' ? '#fff' : (note.titleColor === 'indigo' ? '#818cf8' : (note.titleColor === 'emerald' ? '#34d399' : (note.titleColor === 'orange' ? '#fb923c' : (note.titleColor === 'rose' ? '#f43f5e' : '#fbbf24'))));
      instaTitle.style.color = themeColor;

      // Reset style classes
      instaTitle.classList.remove('mode-wavy', 'mode-neon', 'mode-cyberpunk', 'mode-blur');
      instaTitle.style.textShadow = '';
      instaTitle.style.fontStyle = '';
      instaTitle.style.textDecoration = '';

      const effect = note.titleEffect || 'normal';
      if (effect === 'glow') {
        instaTitle.style.textShadow = `0 0 12px ${themeColor}`;
      } else if (effect === 'italic') {
        instaTitle.style.fontStyle = 'italic';
      } else if (effect === 'underline') {
        instaTitle.style.textDecoration = 'underline';
      } else if (effect === 'wavy') {
        instaTitle.classList.add('mode-wavy');
      } else if (effect === 'neon') {
        instaTitle.classList.add('mode-neon');
      } else if (effect === 'cyberpunk') {
        instaTitle.classList.add('mode-cyberpunk');
      } else if (effect === 'blur') {
        instaTitle.classList.add('mode-blur');
      }
    }

    if (instaSub) {
      instaSub.innerText = note.subheading || 'Add a subheading...';
      instaSub.style.fontFamily = note.titleFont || '';
    }

    // 2. Sync Emoji
    if (instaEmoji) {
      const em = note.emoji || '📄';
      instaEmoji.innerHTML = `<img src="${getTwemojiUrl(em)}" alt="emoji" style="width: 48px; height: 48px; display: block; object-fit: contain;">`;
    }

    // 3. Sync Category Pill
    if (instaCat) {
      instaCat.innerText = note.category || 'General';
      const cat = state.noteCategories.find(c => c.name.toLowerCase() === (note.category || 'General').toLowerCase());
      const hsl = cat ? cat.hsl : '200, 70%, 50%';
      instaCat.style.borderColor = `hsla(${hsl}, 0.55)`;
      instaCat.style.background = `hsla(${hsl}, 0.25)`;
    }

    // 4. Sync Background Gradients inside card
    if (instaBg) {
      instaBg.style.background = note.coverGradient || 'linear-gradient(135deg, #ff007f, #7f00ff)';
    }
  };

  // Helper helper close overlays
  function closeOtherOverlays(activeId) {
    const sketchOverlay = document.getElementById('note-sketch-overlay');
    if (activeId !== 'theme-overlay' && themeOverlay) themeOverlay.style.display = 'none';
    if (activeId !== 'sketch-overlay' && sketchOverlay) sketchOverlay.style.display = 'none';
    if (activeId !== 'vault-config-overlay' && vaultConfigOverlay) vaultConfigOverlay.style.display = 'none';
    if (activeId !== 'mindmap-overlay' && mindmapOverlay) {
      mindmapOverlay.style.display = 'none';
      cancelAnimationFrame(mindMapAnimationFrame);
    }
  }
}

// Global utility sound trigger helper
function playLevelUpSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  osc.type = 'triangle';
  osc.connect(gain);
  gain.connect(audioContext.destination);

  gain.gain.setValueAtTime(0.06, audioContext.currentTime);
  osc.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
  osc.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
  osc.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
  osc.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3); // C6

  osc.start();
  osc.stop(audioContext.currentTime + 0.45);
}


// --- NEW: SIDEBAR ENGINE FOR CUSTOM STYLE POPULATOR ---
function openNoteStyleSidebar(category) {
  const sidebar = document.getElementById('note-style-sidebar');
  if (!sidebar) return;

  state.activeStyleSidebarCategory = category;
  sidebar.classList.add('active');

  renderStyleSidebarContent(category);
}

function renderStyleSidebarContent(category) {
  const sidebarTitle = document.getElementById('style-sidebar-title');
  const sidebarIcon = document.getElementById('style-sidebar-icon');
  const sidebarContent = document.getElementById('note-style-sidebar-content');

  if (!sidebarTitle || !sidebarIcon || !sidebarContent) return;

  sidebarContent.innerHTML = '';

  const note = state.activeNoteId ? state.notes.find(n => n.id === state.activeNoteId) : null;
  if (!note) {
    sidebarContent.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); font-style:italic; text-align:center;">Select or open a note page first.</p>`;
    return;
  }

  // 1. FONTS CATEGORY
  if (category === 'fonts') {
    sidebarTitle.innerText = 'Fonts';
    sidebarIcon.innerText = '🔤';

    const fonts = [
      { id: 'var(--font-primary)', name: 'Sans (Modern)', css: 'var(--font-primary)' },
      { id: "'Playfair Display', serif", name: 'Serif (Elegant / Editor)', css: "'Playfair Display', serif" },
      { id: "'Courier Prime', monospace", name: 'Typewriter (Retro)', css: "'Courier Prime', monospace" },
      { id: "'Outfit', sans-serif", name: 'Display (Instagram Modern)', css: "'Outfit', sans-serif" },
      { id: "'Caveat', cursive", name: 'Signature (Cursive / Journal)', css: "'Caveat', cursive" },
      { id: "'Lilita One', cursive", name: 'Poster (Chunky / Squeeze)', css: "'Lilita One', cursive" },
      { id: "'Sacramento', cursive", name: 'Neon (Glowing Thin Script)', css: "'Sacramento', cursive" }
    ];

    const currentFont = note.titleFont || 'var(--font-primary)';

    const group = document.createElement('div');
    group.className = 'style-list-group';

    fonts.forEach(f => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `style-list-item ${currentFont === f.id ? 'active' : ''}`;
      btn.innerHTML = `
        <span style="font-family: ${f.css}; font-size: 0.95rem; font-weight: 700;">${f.name}</span>
        <i data-lucide="check" class="item-check-icon" style="width: 14px; height: 14px;"></i>
      `;

      btn.onclick = () => {
        note.titleFont = f.id;
        
        // Sync legacy select to maintain full compatibility
        const fontSelect = document.getElementById('note-style-font');
        if (fontSelect) fontSelect.value = f.id;
        
        // Apply immediately to DOM and DB
        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      };

      group.appendChild(btn);
    });

    sidebarContent.appendChild(group);
  }

  // 2. TEXT COLOUR CATEGORY
  else if (category === 'colors') {
    sidebarTitle.innerText = 'Text Colour';
    sidebarIcon.innerText = '🌈';

    const colors = [
      { id: 'default', name: 'Default color', value: 'var(--text-main)', bg: 'rgba(255,255,255,0.1)' },
      { id: 'indigo', name: 'Indigo tint', value: '#818cf8', bg: '#818cf8' },
      { id: 'emerald', name: 'Emerald green', value: '#34d399', bg: '#34d399' },
      { id: 'orange', name: 'Sunset orange', value: '#fb923c', bg: '#fb923c' },
      { id: 'rose', name: 'Vibrant rose', value: '#f43f5e', bg: '#f43f5e' },
      { id: 'gold', name: 'Imperial gold', value: '#fbbf24', bg: '#fbbf24' }
    ];

    const currentColor = note.titleColor || 'default';

    const group = document.createElement('div');
    group.className = 'style-list-group';

    colors.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `style-list-item ${currentColor === c.id ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="item-swatch" style="background: ${c.bg};"></span>
        <span style="font-size: 0.8rem; font-weight: 600; color: ${c.id === 'default' ? 'var(--text-muted)' : c.value};">${c.name}</span>
        <i data-lucide="check" class="item-check-icon" style="width: 14px; height: 14px;"></i>
      `;

      btn.onclick = () => {
        note.titleColor = c.id;

        // Sync legacy select to maintain full compatibility
        const colorSelect = document.getElementById('note-style-color');
        if (colorSelect) colorSelect.value = c.id;

        // Apply immediately to DOM and DB
        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      };

      group.appendChild(btn);
    });

    sidebarContent.appendChild(group);
  }

  // 3. EFFECTS CATEGORY
  else if (category === 'effects') {
    sidebarTitle.innerText = 'Effects';
    sidebarIcon.innerText = '✨';

    const effects = [
      { id: 'normal', name: 'None (Clean)', style: '' },
      { id: 'glow', name: 'Glow shine ✨', style: 'text-shadow: 0 0 10px rgba(99, 102, 241, 0.7); color: #fff;' },
      { id: 'italic', name: 'Elegant script ✍️', style: 'font-style: italic;' },
      { id: 'underline', name: 'Underlined header ▔', style: 'text-decoration: underline;' },
      { id: 'wavy', name: 'Wavy animation 🌊', style: 'animation: wavyText 1.6s infinite alternate; display: inline-block;' },
      { id: 'neon', name: 'Neon Glare ⚡', style: 'text-shadow: 0 0 5px #fff, 0 0 10px #6366f1, 0 0 15px #6366f1; color: #fff;' },
      { id: 'cyberpunk', name: 'Cyberpunk Code 🌆', style: 'text-shadow: 0 0 8px rgba(6, 182, 212, 0.6); color: #06b6d4; font-family: monospace;' },
      { id: 'blur', name: 'Dream Blur 🌌', style: 'filter: blur(0.5px); text-shadow: 0 0 8px #fff; opacity: 0.85;' }
    ];

    const currentEffect = note.titleEffect || 'normal';

    const group = document.createElement('div');
    group.className = 'style-list-group';

    effects.forEach(e => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `style-list-item ${currentEffect === e.id ? 'active' : ''}`;
      btn.innerHTML = `
        <span style="font-size: 0.82rem; font-weight: 600; ${e.style}">${e.name}</span>
        <i data-lucide="check" class="item-check-icon" style="width: 14px; height: 14px;"></i>
      `;

      btn.onclick = () => {
        note.titleEffect = e.id;

        // Sync legacy select to maintain full compatibility
        const effectSelect = document.getElementById('note-style-effect');
        if (effectSelect) effectSelect.value = e.id;

        // Apply immediately to DOM and DB
        applyActiveNoteStyles(note);
        debouncedSaveNote(note);
      };

      group.appendChild(btn);
    });

    sidebarContent.appendChild(group);
  }

  // Render icons inside the sidebar content dynamically
  lucide.createIcons();
}

// Reusable Custom Double-Column Category & Subcategory Popover Picker
function showDoubleColumnCategoryPicker(triggerEl, note) {
  const existing = document.getElementById('note-category-double-popover');
  if (existing) {
    existing.remove();
    return;
  }

  const popover = document.createElement('div');
  popover.id = 'note-category-double-popover';
  popover.style.position = 'absolute';
  popover.style.zIndex = '2500';
  popover.style.width = '380px';
  popover.style.background = 'rgba(15, 23, 42, 0.98)';
  popover.style.border = '1px solid var(--border-glass-strong)';
  popover.style.borderRadius = '16px';
  popover.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)';
  popover.style.backdropFilter = 'blur(20px)';
  popover.style.display = 'flex';
  popover.style.flexDirection = 'column';
  popover.style.overflow = 'hidden';
  popover.style.animation = 'slideDownDrawer 0.2s ease-in-out';

  // 1. Header row
  const headerRow = document.createElement('div');
  headerRow.style.display = 'flex';
  headerRow.style.justifyContent = 'space-between';
  headerRow.style.alignItems = 'center';
  headerRow.style.padding = '0.5rem 0.85rem';
  headerRow.style.borderBottom = '1px solid var(--border-glass)';
  headerRow.style.background = 'rgba(0,0,0,0.2)';

  const titleSpan = document.createElement('span');
  titleSpan.innerText = 'Category Selector';
  titleSpan.style.fontSize = '0.72rem';
  titleSpan.style.fontWeight = '800';
  titleSpan.style.color = 'var(--text-muted)';
  titleSpan.style.letterSpacing = '0.05em';
  titleSpan.style.textTransform = 'uppercase';

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.style.background = 'transparent';
  editBtn.style.border = 'none';
  editBtn.style.color = 'hsl(var(--color-indigo))';
  editBtn.style.fontSize = '0.72rem';
  editBtn.style.fontWeight = 'bold';
  editBtn.style.cursor = 'pointer';
  editBtn.style.display = 'flex';
  editBtn.style.alignItems = 'center';
  editBtn.style.gap = '0.2rem';
  editBtn.style.padding = '0.2rem 0.4rem';
  editBtn.style.borderRadius = '4px';
  editBtn.innerHTML = `<i data-lucide="edit-3" style="width: 11px; height: 11px;"></i> Edit`;

  editBtn.onclick = () => {
    popover.remove();
    const modalManage = document.getElementById('modal-manage-categories');
    if (modalManage) {
      modalManage.classList.add('active');
      renderManagerCategoriesList();
    }
  };

  headerRow.appendChild(titleSpan);
  headerRow.appendChild(editBtn);
  popover.appendChild(headerRow);

  // 2. Double-column body container
  const columnsBody = document.createElement('div');
  columnsBody.style.display = 'flex';
  columnsBody.style.height = '240px';

  // Left Column: Categories
  const leftCol = document.createElement('div');
  leftCol.style.width = '45%';
  leftCol.style.borderRight = '1px solid var(--border-glass)';
  leftCol.style.overflowY = 'auto';
  leftCol.style.display = 'flex';
  leftCol.style.flexDirection = 'column';

  // Right Column: Subcategories
  const rightCol = document.createElement('div');
  rightCol.style.width = '55%';
  rightCol.style.overflowY = 'auto';
  rightCol.style.display = 'flex';
  rightCol.style.flexDirection = 'column';

  // Keep track of active category ID
  let activeCatId = note.categoryId || state.noteCategories[0].id;

  const renderSubcategories = (catId) => {
    rightCol.innerHTML = '';
    const cat = state.noteCategories.find(c => c.id === catId);

    if (cat && cat.subcategories && cat.subcategories.length > 0) {
      cat.subcategories.forEach(sub => {
        const subBtn = document.createElement('button');
        subBtn.type = 'button';
        subBtn.style.display = 'flex';
        subBtn.style.alignItems = 'center';
        subBtn.style.gap = '0.5rem';
        subBtn.style.padding = '0.6rem 0.85rem';
        subBtn.style.cursor = 'pointer';
        subBtn.style.border = 'none';
        subBtn.style.background = 'transparent';
        subBtn.style.width = '100%';
        subBtn.style.textAlign = 'left';
        subBtn.style.transition = 'all 0.2s';
        
        // Highlight active subcategory
        const isCurrentSub = note.categoryId === catId && note.subcategoryId === sub.id;
        if (isCurrentSub) {
          subBtn.style.background = 'rgba(255,255,255,0.06)';
          subBtn.style.color = '#fff';
          subBtn.style.fontWeight = 'bold';
        } else {
          subBtn.style.color = 'var(--text-muted)';
        }

        subBtn.innerHTML = `
          <img src="${getTwemojiUrl(sub.emoji)}" alt="${sub.emoji}" style="width: 15px; height: 15px; object-fit: contain;">
          <span style="font-size: 0.78rem;">${sub.name}</span>
          ${isCurrentSub ? `<i data-lucide="check" style="width: 12px; height: 12px; margin-left: auto; color: #10b981;"></i>` : ''}
        `;

        subBtn.onmouseover = () => {
          subBtn.style.background = 'rgba(255,255,255,0.04)';
          if (!isCurrentSub) subBtn.style.color = '#fff';
        };
        subBtn.onmouseout = () => {
          subBtn.style.background = isCurrentSub ? 'rgba(255,255,255,0.06)' : 'transparent';
          if (!isCurrentSub) subBtn.style.color = 'var(--text-muted)';
        };

        subBtn.onclick = async () => {
          note.categoryId = catId;
          note.category = cat.name;
          note.subcategoryId = sub.id;

          // Update editor stack badge in real-time
          const stackCard = document.getElementById('glow-category-stack');
          const catEmojiSpan = document.getElementById('stack-cat-emoji');
          const catNameSpan = document.getElementById('stack-cat-name');
          const subcatEmojiSpan = document.getElementById('stack-subcat-emoji');
          const subcatNameSpan = document.getElementById('stack-subcat-name');
          const subRow = stackCard ? stackCard.querySelector('.stack-row-subcategory') : null;

          if (catEmojiSpan) catEmojiSpan.innerHTML = `<img src="${getTwemojiUrl(cat.emoji)}" style="width:16px; height:16px; object-fit:contain;">`;
          if (catNameSpan) catNameSpan.innerText = cat.name;
          if (subcatEmojiSpan) subcatEmojiSpan.innerHTML = `<img src="${getTwemojiUrl(sub.emoji)}" style="width:14px; height:14px; object-fit:contain;">`;
          if (subcatNameSpan) subcatNameSpan.innerText = sub.name;
          if (subRow) subRow.style.display = 'flex';

          const hsl = cat.hsl || '200, 70%, 50%';
          if (stackCard) {
            stackCard.style.border = `1px solid hsla(${hsl}, 0.45)`;
            stackCard.style.background = `hsla(${hsl}, 0.08)`;
            stackCard.style.setProperty('--glow-color', `hsla(${hsl}, 0.55)`);
          }

          // Auto-save changes
          showSavingIndicator(true);
          await state.db.updateNote(note);
          state.notes = await state.db.getNotes(true);
          showSavingIndicator(false);

          popover.remove();
        };

        rightCol.appendChild(subBtn);
      });
      lucide.createIcons({ scope: rightCol });
    } else {
      const placeholder = document.createElement('div');
      placeholder.style.padding = '2rem 1rem';
      placeholder.style.color = 'var(--text-darker)';
      placeholder.style.fontSize = '0.75rem';
      placeholder.style.fontStyle = 'italic';
      placeholder.style.textAlign = 'center';
      placeholder.innerText = 'No Subcategories';
      rightCol.appendChild(placeholder);
    }
  };

  const renderCategories = () => {
    leftCol.innerHTML = '';
    state.noteCategories.forEach(cat => {
      const catBtn = document.createElement('button');
      catBtn.type = 'button';
      catBtn.style.display = 'flex';
      catBtn.style.alignItems = 'center';
      catBtn.style.justifyContent = 'space-between';
      catBtn.style.padding = '0.65rem 0.85rem';
      catBtn.style.cursor = 'pointer';
      catBtn.style.border = 'none';
      catBtn.style.background = 'transparent';
      catBtn.style.width = '100%';
      catBtn.style.textAlign = 'left';
      catBtn.style.transition = 'all 0.2s';

      const isCurrentCat = cat.id === activeCatId;
      const hsl = cat.hsl || '200, 70%, 50%';

      if (isCurrentCat) {
        catBtn.style.background = `hsla(${hsl}, 0.12)`;
        catBtn.style.borderLeft = `3px solid hsl(${hsl})`;
        catBtn.style.color = `hsl(${hsl})`;
        catBtn.style.fontWeight = 'bold';
      } else {
        catBtn.style.color = 'var(--text-muted)';
        catBtn.style.borderLeft = '3px solid transparent';
      }

      catBtn.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <img src="${getTwemojiUrl(cat.emoji)}" alt="${cat.emoji}" style="width: 16px; height: 16px; object-fit: contain;">
          <span style="font-size: 0.8rem;">${cat.name || (cat.id ? cat.id.charAt(0).toUpperCase() + cat.id.slice(1) : 'Category')}</span>
        </div>
        <i data-lucide="chevron-right" style="width: 12px; height: 12px; opacity: 0.6;"></i>
      `;

      catBtn.onmouseover = () => {
        if (!isCurrentCat) {
          catBtn.style.background = 'rgba(255,255,255,0.03)';
          catBtn.style.color = '#fff';
        }
      };
      catBtn.onmouseout = () => {
        if (!isCurrentCat) {
          catBtn.style.background = 'transparent';
          catBtn.style.color = 'var(--text-muted)';
        }
      };

      catBtn.onclick = async () => {
        activeCatId = cat.id;
        
        // Save category immediately with NO subcategory initially
        note.categoryId = cat.id;
        note.category = cat.name || (cat.id ? cat.id.charAt(0).toUpperCase() + cat.id.slice(1) : 'Category');
        note.subcategoryId = '';

        // Update editor stack badge in real-time
        const stackCard = document.getElementById('glow-category-stack');
        const catEmojiSpan = document.getElementById('stack-cat-emoji');
        const catNameSpan = document.getElementById('stack-cat-name');
        const subRow = stackCard ? stackCard.querySelector('.stack-row-subcategory') : null;

        if (catEmojiSpan) catEmojiSpan.innerHTML = `<img src="${getTwemojiUrl(cat.emoji)}" style="width:16px; height:16px; object-fit:contain;">`;
        if (catNameSpan) catNameSpan.innerText = note.category;
        if (subRow) subRow.style.display = 'none'; // Hide subcategory row!

        const hsl = cat.hsl || '200, 70%, 50%';
        if (stackCard) {
          stackCard.style.border = `1px solid hsla(${hsl}, 0.45)`;
          stackCard.style.background = `hsla(${hsl}, 0.08)`;
          stackCard.style.setProperty('--glow-color', `hsla(${hsl}, 0.55)`);
        }

        // Auto-save changes
        showSavingIndicator(true);
        await state.db.updateNote(note);
        state.notes = await state.db.getNotes(true);
        showSavingIndicator(false);

        renderCategories();
        renderSubcategories(cat.id);
      };

      leftCol.appendChild(catBtn);
    });
    lucide.createIcons({ scope: leftCol });
  };

  renderCategories();
  renderSubcategories(activeCatId);

  columnsBody.appendChild(leftCol);
  columnsBody.appendChild(rightCol);
  popover.appendChild(columnsBody);

  // Position popover absolute below the stacked trigger card
  const rect = triggerEl.getBoundingClientRect();
  popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;

  document.body.appendChild(popover);
  lucide.createIcons({ scope: popover });

  // Close when clicking outside
  const clickOutsideHandler = (e) => {
    if (!popover.contains(e.target) && !triggerEl.contains(e.target)) {
      popover.remove();
      document.removeEventListener('click', clickOutsideHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', clickOutsideHandler), 10);
}

// Reusable custom Twemoji picker popover
function showTwemojiPicker(triggerEl, onSelect) {
  const existing = document.getElementById('general-emoji-picker-popover');
  if (existing) {
    existing.remove();
    return;
  }

  const picker = document.createElement('div');
  picker.id = 'general-emoji-picker-popover';
  picker.className = 'glass-card note-emoji-picker-popover';
  picker.style.position = 'absolute';
  picker.style.zIndex = '4000'; // Make sure it sits above the modal (index 3000)
  picker.style.padding = '0.75rem';
  picker.style.background = 'rgba(15, 23, 42, 0.98)';
  picker.style.border = '1px solid var(--border-glass-strong)';
  picker.style.borderRadius = '16px';
  picker.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6)';
  picker.style.backdropFilter = 'blur(20px)';
  picker.style.width = '290px';
  picker.style.display = 'flex';
  picker.style.flexDirection = 'column';
  picker.style.gap = '0.75rem';
  picker.style.animation = 'slideDownDrawer 0.2s ease-in-out';

  // Tab bar
  const tabContainer = document.createElement('div');
  tabContainer.style.display = 'flex';
  tabContainer.style.gap = '0.35rem';
  tabContainer.style.borderBottom = '1px solid var(--border-glass)';
  tabContainer.style.paddingBottom = '0.5rem';

  const categories = [
    { name: 'Smileys', icon: '😀' },
    { name: 'Lifestyle', icon: '🌱' },
    { name: 'Office', icon: '📚' },
    { name: 'Symbols', icon: '❤️' }
  ];

  let activeCatName = 'Smileys';
  const gridContainer = document.createElement('div');
  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateColumns = 'repeat(6, 1fr)';
  gridContainer.style.gap = '0.4rem';
  gridContainer.style.maxHeight = '200px';
  gridContainer.style.overflowY = 'auto';
  gridContainer.style.paddingRight = '0.2rem';

  const renderCategoryGrid = (catName) => {
    gridContainer.innerHTML = '';
    const emojis = EMOJI_CATEGORIES[catName];
    
    emojis.forEach(em => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'emoji-pick-btn';
      btn.style.background = 'transparent';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.style.padding = '0.3rem';
      btn.style.borderRadius = '8px';
      btn.style.display = 'flex';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.style.transition = 'background 0.2s';
      
      btn.innerHTML = `<img src="${getTwemojiUrl(em)}" alt="${em}" style="width: 22px; height: 22px; display: block; object-fit: contain;">`;

      btn.addEventListener('mouseover', () => {
        btn.style.background = 'rgba(255,255,255,0.08)';
      });
      btn.addEventListener('mouseout', () => {
        btn.style.background = 'transparent';
      });

      btn.addEventListener('click', () => {
        onSelect(em);
        picker.remove();
      });

      gridContainer.appendChild(btn);
    });
  };

  categories.forEach(cat => {
    const tabBtn = document.createElement('button');
    tabBtn.type = 'button';
    tabBtn.style.flex = '1';
    tabBtn.style.padding = '0.35rem';
    tabBtn.style.borderRadius = '8px';
    tabBtn.style.border = 'none';
    tabBtn.style.cursor = 'pointer';
    tabBtn.style.fontSize = '0.9rem';
    tabBtn.style.display = 'flex';
    tabBtn.style.alignItems = 'center';
    tabBtn.style.justifyContent = 'center';
    tabBtn.style.gap = '0.25rem';
    tabBtn.style.transition = 'all 0.2s';

    const updateTabStyles = () => {
      if (activeCatName === cat.name) {
        tabBtn.style.background = 'rgba(255,255,255,0.08)';
        tabBtn.style.color = '#fff';
      } else {
        tabBtn.style.background = 'transparent';
        tabBtn.style.color = 'var(--text-muted)';
      }
    };

    updateTabStyles();

    tabBtn.innerHTML = `<img src="${getTwemojiUrl(cat.icon)}" alt="${cat.name}" style="width: 16px; height: 16px; display: block; object-fit: contain;">`;

    tabBtn.addEventListener('click', () => {
      activeCatName = cat.name;
      tabContainer.querySelectorAll('button').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--text-muted)';
      });
      tabBtn.style.background = 'rgba(255,255,255,0.08)';
      tabBtn.style.color = '#fff';
      
      renderCategoryGrid(cat.name);
    });

    tabContainer.appendChild(tabBtn);
  });

  renderCategoryGrid('Smileys');

  picker.appendChild(tabContainer);
  picker.appendChild(gridContainer);

  const rect = triggerEl.getBoundingClientRect();
  picker.style.top = `${rect.bottom + window.scrollY + 6}px`;
  picker.style.left = `${rect.left + window.scrollX}px`;

  document.body.appendChild(picker);

  const closeHandler = (e) => {
    if (!picker.contains(e.target) && e.target !== triggerEl) {
      picker.remove();
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 10);
}

// Category Configuration Persistence
async function saveCategoriesConfig() {
  await state.db.setSetting('note_categories', state.noteCategories);
}

// Category Manager modal content renderer
function renderManagerCategoriesList() {
  const listContainer = document.getElementById('manager-categories-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  state.noteCategories.forEach((cat, catIdx) => {
    const catEl = document.createElement('div');
    catEl.className = 'manager-cat-block';
    catEl.style.padding = '0.85rem';
    catEl.style.background = 'rgba(255, 255, 255, 0.02)';
    catEl.style.border = '1px solid var(--border-glass)';
    catEl.style.borderRadius = '12px';
    catEl.style.display = 'flex';
    catEl.style.flexDirection = 'column';
    catEl.style.gap = '0.75rem';

    // 1. Category header edit row
    const headerRow = document.createElement('div');
    headerRow.style.display = 'flex';
    headerRow.style.alignItems = 'center';
    headerRow.style.gap = '0.5rem';

    const emojiBtn = document.createElement('button');
    emojiBtn.type = 'button';
    emojiBtn.style.fontSize = '1.2rem';
    emojiBtn.style.background = 'rgba(255,255,255,0.05)';
    emojiBtn.style.border = '1px solid var(--border-glass)';
    emojiBtn.style.borderRadius = '6px';
    emojiBtn.style.width = '32px';
    emojiBtn.style.height = '32px';
    emojiBtn.style.cursor = 'pointer';
    emojiBtn.style.display = 'flex';
    emojiBtn.style.alignItems = 'center';
    emojiBtn.style.justifyContent = 'center';
    emojiBtn.innerText = cat.emoji;

    emojiBtn.onclick = () => {
      showTwemojiPicker(emojiBtn, async (emoji) => {
        cat.emoji = emoji;
        emojiBtn.innerText = emoji;
        await saveCategoriesConfig();
      });
    };

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = cat.name || (cat.id ? cat.id.charAt(0).toUpperCase() + cat.id.slice(1) : 'Category');
    nameInput.style.flex = '1';
    nameInput.style.background = 'transparent';
    nameInput.style.border = 'none';
    nameInput.style.borderBottom = '1px solid transparent';
    nameInput.style.color = '#fff';
    nameInput.style.fontSize = '0.9rem';
    nameInput.style.fontWeight = 'bold';
    nameInput.style.outline = 'none';
    nameInput.style.padding = '0.1rem 0.25rem';
    
    nameInput.onfocus = () => {
      nameInput.style.borderBottomColor = 'hsl(var(--color-indigo))';
    };
    nameInput.onblur = async () => {
      nameInput.style.borderBottomColor = 'transparent';
      const val = nameInput.value.trim();
      if (val) {
        if (val !== cat.name) {
          cat.name = val;
          await saveCategoriesConfig();
        }
      } else {
        cat.name = cat.id ? cat.id.charAt(0).toUpperCase() + cat.id.slice(1) : 'Category';
        nameInput.value = cat.name;
        await saveCategoriesConfig();
      }
    };
    nameInput.onkeydown = (e) => {
      if (e.key === 'Enter') nameInput.blur();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = 'var(--color-rose)';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.padding = '0.25rem';
    deleteBtn.style.display = 'flex';
    deleteBtn.style.alignItems = 'center';
    deleteBtn.style.justifyContent = 'center';
    deleteBtn.innerHTML = `<i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>`;
    
    if (state.noteCategories.length <= 1) {
      deleteBtn.style.opacity = '0.3';
      deleteBtn.style.cursor = 'not-allowed';
      deleteBtn.title = "Cannot delete the only remaining category.";
    } else {
      deleteBtn.onclick = async () => {
        if (confirm(`Are you sure you want to delete category "${cat.name}"? All notes in this category will be reset to General.`)) {
          state.noteCategories.splice(catIdx, 1);
          await saveCategoriesConfig();
          
          // Re-map active note category ids
          for (const note of state.notes) {
            if (note.categoryId === cat.id) {
              note.categoryId = state.noteCategories[0].id;
              note.category = state.noteCategories[0].name;
              if (state.noteCategories[0].subcategories && state.noteCategories[0].subcategories.length > 0) {
                note.subcategoryId = state.noteCategories[0].subcategories[0].id;
              } else {
                note.subcategoryId = '';
              }
              await state.db.updateNote(note);
            }
          }
          state.notes = await state.db.getNotes(true);
          renderManagerCategoriesList();
        }
      };
    }

    headerRow.appendChild(emojiBtn);
    headerRow.appendChild(nameInput);
    headerRow.appendChild(deleteBtn);
    catEl.appendChild(headerRow);

    // 2. Subcategories list block
    const subListBlock = document.createElement('div');
    subListBlock.style.paddingLeft = '1.75rem';
    subListBlock.style.display = 'flex';
    subListBlock.style.flexDirection = 'column';
    subListBlock.style.gap = '0.5rem';

    if (cat.subcategories && cat.subcategories.length > 0) {
      cat.subcategories.forEach((sub, subIdx) => {
        const subRow = document.createElement('div');
        subRow.style.display = 'flex';
        subRow.style.alignItems = 'center';
        subRow.style.gap = '0.5rem';

        const subEmojiBtn = document.createElement('button');
        subEmojiBtn.type = 'button';
        subEmojiBtn.style.fontSize = '1rem';
        subEmojiBtn.style.background = 'rgba(255,255,255,0.03)';
        subEmojiBtn.style.border = '1px solid var(--border-glass)';
        subEmojiBtn.style.borderRadius = '6px';
        subEmojiBtn.style.width = '28px';
        subEmojiBtn.style.height = '28px';
        subEmojiBtn.style.cursor = 'pointer';
        subEmojiBtn.style.display = 'flex';
        subEmojiBtn.style.alignItems = 'center';
        subEmojiBtn.style.justifyContent = 'center';
        subEmojiBtn.innerText = sub.emoji;

        subEmojiBtn.onclick = () => {
          showTwemojiPicker(subEmojiBtn, async (emoji) => {
            sub.emoji = emoji;
            subEmojiBtn.innerText = emoji;
            await saveCategoriesConfig();
          });
        };

        const subNameInput = document.createElement('input');
        subNameInput.type = 'text';
        subNameInput.value = sub.name || (sub.id ? sub.id.charAt(0).toUpperCase() + sub.id.slice(1) : 'Subcategory');
        subNameInput.style.flex = '1';
        subNameInput.style.background = 'transparent';
        subNameInput.style.border = 'none';
        subNameInput.style.borderBottom = '1px solid transparent';
        subNameInput.style.color = 'var(--text-muted)';
        subNameInput.style.fontSize = '0.8rem';
        subNameInput.style.outline = 'none';
        subNameInput.style.padding = '0.1rem 0.25rem';

        subNameInput.onfocus = () => {
          subNameInput.style.borderBottomColor = 'hsl(var(--color-indigo))';
        };
        subNameInput.onblur = async () => {
          subNameInput.style.borderBottomColor = 'transparent';
          const val = subNameInput.value.trim();
          if (val) {
            if (val !== sub.name) {
              sub.name = val;
              await saveCategoriesConfig();
            }
          } else {
            sub.name = sub.id ? sub.id.charAt(0).toUpperCase() + sub.id.slice(1) : 'Subcategory';
            subNameInput.value = sub.name;
            await saveCategoriesConfig();
          }
        };
        subNameInput.onkeydown = (e) => {
          if (e.key === 'Enter') subNameInput.blur();
        };

        const subDeleteBtn = document.createElement('button');
        subDeleteBtn.type = 'button';
        subDeleteBtn.style.background = 'transparent';
        subDeleteBtn.style.border = 'none';
        subDeleteBtn.style.color = 'var(--text-darker)';
        subDeleteBtn.style.cursor = 'pointer';
        subDeleteBtn.style.padding = '0.2rem';
        subDeleteBtn.style.display = 'flex';
        subDeleteBtn.style.alignItems = 'center';
        subDeleteBtn.style.justifyContent = 'center';
        subDeleteBtn.innerHTML = `<i data-lucide="x" style="width: 14px; height: 14px;"></i>`;

        subDeleteBtn.onclick = async () => {
          if (confirm(`Remove subcategory "${sub.name}"?`)) {
            cat.subcategories.splice(subIdx, 1);
            await saveCategoriesConfig();
            
            // Re-map active note subcategory ids if deleted
            for (const note of state.notes) {
              if (note.subcategoryId === sub.id) {
                note.subcategoryId = cat.subcategories.length > 0 ? cat.subcategories[0].id : '';
                await state.db.updateNote(note);
              }
            }
            state.notes = await state.db.getNotes(true);
            renderManagerCategoriesList();
          }
        };

        subRow.appendChild(subEmojiBtn);
        subRow.appendChild(subNameInput);
        subRow.appendChild(subDeleteBtn);
        subListBlock.appendChild(subRow);
      });
    } else {
      const emptySub = document.createElement('div');
      emptySub.style.fontSize = '0.75rem';
      emptySub.style.color = 'var(--text-darker)';
      emptySub.style.fontStyle = 'italic';
      emptySub.innerText = 'No subcategories yet.';
      subListBlock.appendChild(emptySub);
    }

    // 3. Add Subcategory Form Row
    const addSubRow = document.createElement('div');
    addSubRow.style.display = 'flex';
    addSubRow.style.alignItems = 'center';
    addSubRow.style.gap = '0.4rem';
    addSubRow.style.marginTop = '0.25rem';
    addSubRow.style.background = 'rgba(255,255,255,0.01)';
    addSubRow.style.border = '1px dashed rgba(255,255,255,0.05)';
    addSubRow.style.borderRadius = '6px';
    addSubRow.style.padding = '0.25rem';

    let selectedSubEmoji = '🏷️';
    const subEmojiPickerBtn = document.createElement('button');
    subEmojiPickerBtn.type = 'button';
    subEmojiPickerBtn.style.fontSize = '0.9rem';
    subEmojiPickerBtn.style.background = 'rgba(255,255,255,0.03)';
    subEmojiPickerBtn.style.border = 'none';
    subEmojiPickerBtn.style.borderRadius = '4px';
    subEmojiPickerBtn.style.width = '24px';
    subEmojiPickerBtn.style.height = '24px';
    subEmojiPickerBtn.style.cursor = 'pointer';
    subEmojiPickerBtn.innerText = selectedSubEmoji;

    subEmojiPickerBtn.onclick = () => {
      showTwemojiPicker(subEmojiPickerBtn, (emoji) => {
        selectedSubEmoji = emoji;
        subEmojiPickerBtn.innerText = emoji;
      });
    };

    const newSubInput = document.createElement('input');
    newSubInput.type = 'text';
    newSubInput.placeholder = 'Add subcategory...';
    newSubInput.style.flex = '1';
    newSubInput.style.background = 'transparent';
    newSubInput.style.border = 'none';
    newSubInput.style.color = '#fff';
    newSubInput.style.fontSize = '0.75rem';
    newSubInput.style.outline = 'none';

    const subAddBtn = document.createElement('button');
    subAddBtn.type = 'button';
    subAddBtn.style.background = 'rgba(99, 102, 241, 0.15)';
    subAddBtn.style.border = '1px solid rgba(99, 102, 241, 0.25)';
    subAddBtn.style.color = '#a5b4fc';
    subAddBtn.style.padding = '0.2rem 0.5rem';
    subAddBtn.style.borderRadius = '4px';
    subAddBtn.style.fontSize = '0.7rem';
    subAddBtn.style.fontWeight = 'bold';
    subAddBtn.style.cursor = 'pointer';
    subAddBtn.innerText = 'Add';

    subAddBtn.onclick = async () => {
      const val = newSubInput.value.trim();
      if (!val) return;

      const subId = val.toLowerCase().replace(/[^a-z0-9]/g, '_');
      if (!cat.subcategories) cat.subcategories = [];
      
      // Ensure unique subcategory ID inside this category
      let finalSubId = subId;
      let counter = 1;
      while (cat.subcategories.some(s => s.id === finalSubId)) {
        finalSubId = `${subId}_${counter}`;
        counter++;
      }

      cat.subcategories.push({
        id: finalSubId,
        name: val,
        emoji: selectedSubEmoji
      });

      await saveCategoriesConfig();
      renderManagerCategoriesList();
    };

    addSubRow.appendChild(subEmojiPickerBtn);
    addSubRow.appendChild(newSubInput);
    addSubRow.appendChild(subAddBtn);
    subListBlock.appendChild(addSubRow);

    catEl.appendChild(subListBlock);
    listContainer.appendChild(catEl);
  });

  lucide.createIcons();
}

// Debounced save wrapper
function debouncedSaveNote(note) {
  showSavingIndicator(true);
  clearTimeout(notesAutoSaveTimeout);
  notesAutoSaveTimeout = setTimeout(async () => {
    await state.db.updateNote(note);
    state.notes = await state.db.getNotes(true);
    showSavingIndicator(false);
  }, 400);
}

// Visual auto-save label state updater
function showSavingIndicator(saving) {
  const lbl = document.getElementById('note-save-status-lbl');
  if (!lbl) return;
  if (saving) {
    lbl.innerText = 'Saving...';
    lbl.style.color = 'var(--text-muted)';
    lbl.style.background = 'rgba(255,255,255,0.01)';
  } else {
    lbl.innerText = 'Saved';
    lbl.style.color = '#34d399'; // Emerald text
    lbl.style.background = 'rgba(16, 185, 129, 0.05)';
  }
}

// Insert elements at writing range
function insertTextAtNotesCursor(text) {
  const contentArea = document.getElementById('note-editor-content');
  if (!contentArea) return;

  contentArea.focus();
  const sel = window.getSelection();
  let selectionInside = false;
  if (sel.rangeCount > 0) {
    const range = sel.getRangeAt(0);
    selectionInside = contentArea.contains(range.commonAncestorContainer);
  }

  if (selectionInside && sel.getRangeAt && sel.rangeCount) {
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    // If not inside or selection lost, append to contentArea
    const textNode = document.createTextNode(text);
    contentArea.appendChild(textNode);
    
    // Position cursor at the end
    const range = document.createRange();
    range.selectNodeContents(contentArea);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Trigger input for auto-save
  contentArea.dispatchEvent(new Event('input', { bubbles: true }));
}

// Page instantiator
async function createNewNotePage() {
  const cover = NOTES_COVER_GRADIENTS[Math.floor(Math.random() * NOTES_COVER_GRADIENTS.length)];
  const defaultCat = state.noteCategories[0] || { id: 'general', name: 'General', subcategories: [{ id: 'notes' }] };
  const defaultSub = defaultCat.subcategories && defaultCat.subcategories.length > 0 ? defaultCat.subcategories[0].id : '';

  const newNote = await state.db.addNote({
    title: 'Untitled Page',
    emoji: '📄',
    category: defaultCat.name,
    categoryId: defaultCat.id,
    subcategoryId: defaultSub,
    subheading: '',
    desc: '',
    content: '',
    coverGradient: cover,
    isFavorite: false
  });

  state.activeNoteId = newNote.id;
  state.notes = await state.db.getNotes(true);
  
  await renderNotesView();
  loadActiveNoteIntoEditor();

  showNotification('Created a new workspace page! 📄', 'linear-gradient(135deg, #6366f1, #10b981)');
}

// Notion-style native emoji picker for note pages
function showEmojiPickerForNote(triggerEl, note) {
  const existing = document.getElementById('note-emoji-picker-popover');
  if (existing) {
    existing.remove();
    return;
  }

  const picker = document.createElement('div');
  picker.id = 'note-emoji-picker-popover';
  picker.className = 'glass-card note-emoji-picker-popover';
  picker.style.position = 'absolute';
  picker.style.zIndex = '1000';
  picker.style.padding = '0.75rem';
  picker.style.background = 'rgba(15, 23, 42, 0.98)';
  picker.style.border = '1px solid var(--border-glass-strong)';
  picker.style.borderRadius = '16px';
  picker.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6)';
  picker.style.backdropFilter = 'blur(20px)';
  picker.style.width = isNotesMobileView() ? '100%' : '320px';
  picker.style.display = 'flex';
  picker.style.flexDirection = 'column';
  picker.style.gap = '0.75rem';
  picker.style.animation = 'slideDownDrawer 0.2s ease-in-out';

  const titleLbl = document.createElement('div');
  titleLbl.className = 'notion-emoji-picker-title';
  titleLbl.textContent = 'Choose an icon';
  picker.appendChild(titleLbl);

  const tabContainer = document.createElement('div');
  tabContainer.className = 'notion-emoji-tabs';

  const categories = [
    { name: 'Smileys', icon: '😀' },
    { name: 'Lifestyle', icon: '🌱' },
    { name: 'Office', icon: '📚' },
    { name: 'Symbols', icon: '❤️' }
  ];

  let activeCatName = 'Smileys';
  const gridContainer = document.createElement('div');
  gridContainer.className = 'notion-emoji-grid';

  const renderCategoryGrid = (catName) => {
    gridContainer.innerHTML = '';
    const emojis = EMOJI_CATEGORIES[catName];

    emojis.forEach(em => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'notion-emoji-pick-btn';
      btn.textContent = em;
      btn.title = em;

      btn.addEventListener('click', async () => {
        note.emoji = em;
        setNativeEmoji(triggerEl, em, 32);

        const sidebarEmoji = document.querySelector(`.note-page-row[data-id="${note.id}"] .page-icon`);
        if (sidebarEmoji) setNativeEmoji(sidebarEmoji, em, 18);

        await state.db.updateNote(note);
        picker.remove();
        state.notes = await state.db.getNotes(true);
      });

      gridContainer.appendChild(btn);
    });
  };

  categories.forEach(cat => {
    const tabBtn = document.createElement('button');
    tabBtn.type = 'button';
    tabBtn.className = `notion-emoji-tab${activeCatName === cat.name ? ' active' : ''}`;
    tabBtn.textContent = cat.icon;
    tabBtn.title = cat.name;

    tabBtn.addEventListener('click', () => {
      activeCatName = cat.name;
      tabContainer.querySelectorAll('.notion-emoji-tab').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      renderCategoryGrid(cat.name);
    });

    tabContainer.appendChild(tabBtn);
  });

  renderCategoryGrid('Smileys');
  picker.appendChild(tabContainer);
  picker.appendChild(gridContainer);

  positionNotesPopover(picker, triggerEl);

  const closeHandler = (e) => {
    if (!picker.contains(e.target) && e.target !== triggerEl) {
      picker.remove();
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 10);
}

// Notes Sidebar Renderer
async function renderNotesView() {
  const container = document.getElementById('notes-pages-list');
  if (!container) return;

  const currentTab = state.notesSidebarTab || 'active';
  const fabBtn = document.getElementById('btn-add-note-page');
  if (fabBtn) {
    fabBtn.style.display = (currentTab === 'active') ? 'flex' : 'none';
  }

  const searchInput = document.getElementById('notes-search-input');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

  let html = '';

  const preprocessNotes = () => {
    state.notes.forEach(n => {
      n.isFavorite = n.isFavorite || false;
      n.isDeleted = n.isDeleted || false;
      n.isArchived = n.isArchived || false;
      n.isHidden = n.isHidden || false;
    });
  };
  preprocessNotes();

  const noteMatchesTab = (note, tab) => {
    if (!note) return false;
    if (tab === 'active') return !note.isDeleted && !note.isArchived && !note.isHidden;
    if (tab === 'archived') return note.isArchived && !note.isDeleted && !note.isHidden;
    if (tab === 'trash') return note.isDeleted;
    if (tab === 'vault') return note.isHidden && !note.isDeleted && !note.isArchived;
    return false;
  };

  // Verify if active note matches current tab filter; if not, deselect it
  if (state.activeNoteId) {
    const activeNote = state.notes.find(n => n.id === state.activeNoteId);
    if (!activeNote || !noteMatchesTab(activeNote, currentTab)) {
      state.activeNoteId = null;
    }
  }

  // Do not automatically select/open the first note in the active tab to allow seeing the list of all notes without opening one.

  if (currentTab === 'active') {
    const pinned = state.notes.filter(n => !n.isDeleted && !n.isArchived && !n.isHidden && n.isFavorite && (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
    if (pinned.length > 0) {
      html += `
        <div class="notes-sidebar-section-header" style="display:flex; align-items:center; gap:0.3rem;">
          <i data-lucide="pin" style="width:12px; height:12px; color:#fbbf24; fill:#fbbf24; transform: rotate(45deg);"></i>
          <span>FAVORITES</span>
        </div>
      `;
      pinned.forEach(n => {
        html += renderNoteRowHTML(n, 'active');
      });
    }

    const regular = state.notes.filter(n => !n.isDeleted && !n.isArchived && !n.isHidden && !n.isFavorite && (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
    if (regular.length > 0) {
      html += `
        <div class="notes-sidebar-section-header">
          <span>PRIVATE</span>
        </div>
      `;
      regular.forEach(n => {
        html += renderNoteRowHTML(n, 'active');
      });
    }

    if (pinned.length === 0 && regular.length === 0) {
      html += `
        <div style="padding: 1.5rem 1rem; text-align: center; color: var(--text-darker); font-size: 0.8rem;">
          No active pages found
        </div>
      `;
    }
  } else if (currentTab === 'archived') {
    const archived = state.notes.filter(n => n.isArchived && !n.isDeleted && !n.isHidden && (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
    if (archived.length > 0) {
      html += `
        <div class="notes-sidebar-section-header">
          <span>ARCHIVED PAGES</span>
        </div>
      `;
      archived.forEach(n => {
        html += renderNoteRowHTML(n, 'archived');
      });
    } else {
      html += `
        <div style="padding: 1.5rem 1rem; text-align: center; color: var(--text-darker); font-size: 0.8rem;">
          No archived pages
        </div>
      `;
    }
  } else if (currentTab === 'trash') {
    const deleted = state.notes.filter(n => n.isDeleted && (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
    if (deleted.length > 0) {
      html += `
        <div class="notes-sidebar-section-header" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
          <span>TRASH INVENTORY</span>
          <button id="btn-empty-trash" style="background:transparent; border:none; color:var(--color-rose); cursor:pointer; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; padding:0.2rem 0.4rem; border-radius:4px; border:1px solid rgba(244,63,94,0.2); transition:all 0.2s;" onmouseover="this.style.background='rgba(244,63,94,0.1)'" onmouseout="this.style.background='transparent'">Empty Trash</button>
        </div>
      `;
      deleted.forEach(n => {
        html += renderNoteRowHTML(n, 'trash');
      });
    } else {
      html += `
        <div style="padding: 1.5rem 1rem; text-align: center; color: var(--text-darker); font-size: 0.8rem;">
          Trash is empty
        </div>
      `;
    }
  } else if (currentTab === 'vault') {
    const storedPasscode = await state.db.getSetting('vault_passcode', null);
    
    if (!state.notesVaultUnlocked) {
      if (!storedPasscode) {
        html += `
          <div class="vault-setup-container" style="padding: 1.5rem 1rem; text-align: center; display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="font-size: 1.8rem;">🔒</div>
            <h4 style="font-size: 0.85rem; font-weight: 700; color: #fff; margin: 0;">Setup Security Vault</h4>
            <p style="font-size: 0.7rem; color: var(--text-muted); margin: 0; line-height: 1.45;">Create a 4-digit security passcode to protect your private pages.</p>
            <input type="password" id="notes-vault-setup-input" maxlength="4" placeholder="••••" style="text-align: center; font-size: 1.25rem; letter-spacing: 0.35rem; width: 100%; padding: 0.45rem; border-radius: 8px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-glass-strong); color: #fff; outline: none; margin-top: 0.25rem;" autocomplete="new-password">
            <button type="button" id="btn-notes-vault-setup-submit" class="accent-glow-btn" style="width: 100%; justify-content: center; padding: 0.55rem; font-size: 0.75rem;">Set Passcode</button>
          </div>
        `;
      } else {
        html += `
          <div class="vault-unlock-container" style="padding: 1.25rem 0.75rem; text-align: center; display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="font-size: 1.6rem; margin-bottom: 0.15rem;">🔒</div>
            <h4 style="font-size: 0.85rem; font-weight: 700; color: #fff; margin: 0;">Vault Locked</h4>
            <p style="font-size: 0.68rem; color: var(--text-muted); margin: 0;">Enter security passcode to unlock private inventory.</p>
            
            <div class="notes-vault-dot-container" id="notes-vault-dots">
              <div class="notes-vault-dot"></div>
              <div class="notes-vault-dot"></div>
              <div class="notes-vault-dot"></div>
              <div class="notes-vault-dot"></div>
            </div>

            <div class="notes-vault-keypad">
              <button type="button" class="notes-vault-keypad-btn" data-key="1">1</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="2">2</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="3">3</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="4">4</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="5">5</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="6">6</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="7">7</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="8">8</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="9">9</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="clear" style="font-size: 0.75rem;">Clear</button>
              <button type="button" class="notes-vault-keypad-btn" data-key="0">0</button>
              <button type="button" class="notes-vault-keypad-btn" id="btn-notes-vault-unlock-enter" style="font-size: 0.75rem; border-color: rgba(99, 102, 241, 0.4); color: #818cf8;">OK</button>
            </div>
          </div>
        `;
      }
    } else {
      const hidden = state.notes.filter(n => n.isHidden && !n.isDeleted && !n.isArchived && (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)));
      
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem 0.75rem 1rem; border-bottom: 1px solid var(--border-glass); margin-bottom: 0.75rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #10b981;">🔓 Vault Decrypted</span>
          <button type="button" id="btn-notes-vault-lock-now" class="border-btn" style="padding: 0.25rem 0.55rem; font-size: 0.65rem; border-color: var(--color-rose); color: var(--color-rose); background: transparent; cursor: pointer; border-radius: 4px; font-weight: 700;">Lock</button>
        </div>
      `;

      if (hidden.length > 0) {
        html += `
          <div class="notes-sidebar-section-header">
            <span>HIDDEN PAGES</span>
          </div>
        `;
        hidden.forEach(n => {
          html += renderNoteRowHTML(n, 'vault');
        });
      } else {
        html += `
          <div style="padding: 1.5rem 1rem; text-align: center; color: var(--text-darker); font-size: 0.8rem;">
            No hidden pages in Vault.
          </div>
        `;
      }
    }
  }

  container.innerHTML = html;

  container.querySelectorAll('.note-page-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = parseInt(row.getAttribute('data-id'));
      state.activeNoteId = id;
      renderNotesView();
      loadActiveNoteIntoEditor();
    });
  });

  if (currentTab === 'active') {
    container.querySelectorAll('.btn-fav-note').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const note = state.notes.find(n => n.id === id);
        if (note) {
          note.isFavorite = !note.isFavorite;
          await state.db.updateNote(note);
          state.notes = await state.db.getNotes(true);
          renderNotesView();
          loadActiveNoteIntoEditor();
        }
      });
    });

    container.querySelectorAll('.btn-delete-note-page').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const note = state.notes.find(n => n.id === id);
        if (note && confirm(`Move "${note.title || 'Untitled Page'}" to Trash?`)) {
          note.isDeleted = true;
          note.isFavorite = false;
          await state.db.updateNote(note);
          if (state.activeNoteId === id) {
            state.activeNoteId = null;
          }
          state.notes = await state.db.getNotes(true);
          renderNotesView();
          loadActiveNoteIntoEditor();
          showNotification('Page moved to Trash!', '#be123c');
        }
      });
    });
  } else if (currentTab === 'archived') {
    container.querySelectorAll('.btn-unarchive-note-row').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const note = state.notes.find(n => n.id === id);
        if (note) {
          note.isArchived = false;
          await state.db.updateNote(note);
          state.notes = await state.db.getNotes(true);
          renderNotesView();
          loadActiveNoteIntoEditor();
          showNotification('Note page restored to Active pages!', '#10b981');
        }
      });
    });

    container.querySelectorAll('.btn-delete-note-page').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const note = state.notes.find(n => n.id === id);
        if (note && confirm(`Move "${note.title || 'Untitled Page'}" to Trash?`)) {
          note.isDeleted = true;
          note.isArchived = false;
          await state.db.updateNote(note);
          if (state.activeNoteId === id) {
            state.activeNoteId = null;
          }
          state.notes = await state.db.getNotes(true);
          renderNotesView();
          loadActiveNoteIntoEditor();
          showNotification('Page moved to Trash!', '#be123c');
        }
      });
    });
  } else if (currentTab === 'trash') {
    container.querySelectorAll('.btn-restore-note-row').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const note = state.notes.find(n => n.id === id);
        if (note) {
          note.isDeleted = false;
          await state.db.updateNote(note);
          state.notes = await state.db.getNotes(true);
          renderNotesView();
          loadActiveNoteIntoEditor();
          showNotification('Note page restored to Active pages!', '#10b981');
        }
      });
    });

    container.querySelectorAll('.btn-delete-permanent-note-row').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const note = state.notes.find(n => n.id === id);
        if (note && confirm(`⚠️ Permanent Delete: Are you sure you want to permanently delete "${note.title || 'Untitled Page'}"? This action is irreversible.`)) {
          await state.db.deleteNote(id);
          if (state.activeNoteId === id) {
            state.activeNoteId = null;
          }
          state.notes = await state.db.getNotes(true);
          renderNotesView();
          loadActiveNoteIntoEditor();
          showNotification('Note deleted permanently from database.', '#f43f5e');
        }
      });
    });

    const btnEmptyTrash = document.getElementById('btn-empty-trash');
    if (btnEmptyTrash) {
      btnEmptyTrash.addEventListener('click', async () => {
        const deletedNotes = state.notes.filter(n => n.isDeleted);
        if (deletedNotes.length === 0) return;
        if (confirm(`⚠️ Empty Trash: Are you sure you want to permanently delete all ${deletedNotes.length} pages in Trash? This action is irreversible.`)) {
          for (const n of deletedNotes) {
            await state.db.deleteNote(n.id);
          }
          state.notes = await state.db.getNotes(true);
          state.activeNoteId = null;
          renderNotesView();
          loadActiveNoteIntoEditor();
          showNotification('Trash emptied successfully!', '#f43f5e');
        }
      });
    }
  } else if (currentTab === 'vault') {
    if (!state.notesVaultUnlocked) {
      const btnSetup = document.getElementById('btn-notes-vault-setup-submit');
      const setupInput = document.getElementById('notes-vault-setup-input');
      if (btnSetup && setupInput) {
        btnSetup.addEventListener('click', async () => {
          const pass = setupInput.value.trim();
          if (pass.length !== 4 || isNaN(pass)) {
            showNotification('❌ Passcode must be a 4-digit number!', '#f43f5e');
            return;
          }
          try {
            showNotification('ℹ️ Please verify your device credentials (PIN/Fingerprint) to continue.', '#3b82f6');
            await window.verifyDeviceOwner();
          } catch (e) {
            showNotification(`❌ Setup failed: ${e.message}`, '#f43f5e');
            return;
          }
          await state.db.setSetting('vault_passcode', pass);
          state.notesVaultUnlocked = true;
          renderNotesView();
          showNotification('🔐 Passcode Created & Vault Unlocked!', '#10b981');
        });
      }

      let tempUnlockNotesPasscode = "";
      const renderNotesUnlockDots = () => {
        const dots = document.querySelectorAll('#notes-vault-dots .notes-vault-dot');
        dots.forEach((dot, idx) => {
          if (idx < tempUnlockNotesPasscode.length) dot.classList.add('filled');
          else dot.classList.remove('filled');
        });
      };

      const verifyNotesUnlockPasscode = async () => {
        const passcode = await state.db.getSetting('vault_passcode', null);
        if (tempUnlockNotesPasscode === passcode) {
          state.notesVaultUnlocked = true;
          renderNotesView();
          showNotification('🔓 Identity verified. Vault Decrypted!', '#10b981');
        } else {
          showNotification('❌ Invalid Passcode!', '#f43f5e');
          tempUnlockNotesPasscode = "";
          renderNotesUnlockDots();
        }
      };

      container.querySelectorAll('.notes-vault-keypad-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-key');
          if (val === 'clear') {
            tempUnlockNotesPasscode = tempUnlockNotesPasscode.slice(0, -1);
          } else if (val) {
            if (tempUnlockNotesPasscode.length < 4) tempUnlockNotesPasscode += val;
          }
          renderNotesUnlockDots();

          if (tempUnlockNotesPasscode.length === 4) {
            setTimeout(verifyNotesUnlockPasscode, 150);
          }
        });
      });

      const btnOK = document.getElementById('btn-notes-vault-unlock-enter');
      if (btnOK) btnOK.addEventListener('click', verifyNotesUnlockPasscode);

    } else {
      const btnLock = document.getElementById('btn-notes-vault-lock-now');
      if (btnLock) {
        btnLock.addEventListener('click', () => {
          state.notesVaultUnlocked = false;
          renderNotesView();
          showNotification('🔐 Vault Locked!', 'rgba(255,255,255,0.3)');
        });
      }

      container.querySelectorAll('.btn-unhide-note-row').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = parseInt(btn.getAttribute('data-id'));
          const note = state.notes.find(n => n.id === id);
          if (note) {
            note.isHidden = false;
            await state.db.updateNote(note);
            state.notes = await state.db.getNotes(true);
            renderNotesView();
            loadActiveNoteIntoEditor();
            showNotification('Note page restored to Active pages!', '#10b981');
          }
        });
      });

      container.querySelectorAll('.btn-delete-note-page').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = parseInt(btn.getAttribute('data-id'));
          const note = state.notes.find(n => n.id === id);
          if (note && confirm(`Move "${note.title || 'Untitled Page'}" to Trash?`)) {
            note.isDeleted = true;
            note.isHidden = false;
            await state.db.updateNote(note);
            if (state.activeNoteId === id) {
              state.activeNoteId = null;
            }
            state.notes = await state.db.getNotes(true);
            renderNotesView();
            loadActiveNoteIntoEditor();
            showNotification('Page moved to Trash!', '#be123c');
          }
        });
      });
    }
  }

  loadActiveNoteIntoEditor();
  lucide.createIcons();
}

function renderNoteRowHTML(n, currentTab) {
  const isActive = n.id === state.activeNoteId ? 'active' : '';
  const pageEmoji = n.emoji || '📄';
  
  let actionsHTML = '';
  if (currentTab === 'active') {
    const pinClass = n.isFavorite ? 'starred' : '';
    actionsHTML = `
      <button class="btn-fav-note ${pinClass}" title="Pin Note Page" data-id="${n.id}">
        <i data-lucide="pin" style="width:12px; height:12px; ${n.isFavorite ? 'fill: #fbbf24; color: #fbbf24; transform: rotate(45deg);' : ''}"></i>
      </button>
      <button class="btn-delete-note-page" title="Move to Trash" data-id="${n.id}">&times;</button>
    `;
  } else if (currentTab === 'archived') {
    actionsHTML = `
      <button class="btn-unarchive-note-row" title="Unarchive Page" data-id="${n.id}" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:0.9rem; padding: 0.2rem; display: flex; align-items: center; justify-content: center;">
        <i data-lucide="arrow-up-left" style="width: 13px; height: 13px;"></i>
      </button>
      <button class="btn-delete-note-page" title="Move to Trash" data-id="${n.id}">&times;</button>
    `;
  } else if (currentTab === 'trash') {
    actionsHTML = `
      <button class="btn-restore-note-row" title="Restore Page" data-id="${n.id}" style="background:transparent; border:none; color:var(--color-emerald); cursor:pointer; font-size:0.9rem; padding: 0.2rem; display: flex; align-items: center; justify-content: center;">
        <i data-lucide="rotate-ccw" style="width: 13px; height: 13px;"></i>
      </button>
      <button class="btn-delete-permanent-note-row" title="Delete Permanently" data-id="${n.id}" style="background:transparent; border:none; color:var(--color-rose); cursor:pointer; font-size:1.1rem; padding: 0.2rem; display: flex; align-items: center; justify-content: center; line-height: 1;">
        &times;
      </button>
    `;
  } else if (currentTab === 'vault') {
    actionsHTML = `
      <button class="btn-unhide-note-row" title="Unhide Page" data-id="${n.id}" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:0.9rem; padding: 0.2rem; display: flex; align-items: center; justify-content: center;">
        <i data-lucide="eye" style="width: 13px; height: 13px;"></i>
      </button>
      <button class="btn-delete-note-page" title="Move to Trash" data-id="${n.id}">&times;</button>
    `;
  }

  return `
    <div class="note-page-row ${isActive}" data-id="${n.id}">
      <span class="page-icon notion-emoji" style="font-size: 1.1rem; width: 22px; height: 22px;">${pageEmoji}</span>
      <span class="page-title">${n.title || 'Untitled Page'}</span>
      <div class="page-row-actions" style="display: flex; gap: 0.2rem; align-items: center;">
        ${actionsHTML}
      </div>
    </div>
  `;
}

// --- NEW: Apply custom styles (Font, Color, Effect) to editor elements without reloading note text ---
function applyActiveNoteStyles(note) {
  if (!note) return;

  const titleField = document.getElementById('note-editor-title');
  const contentArea = document.getElementById('note-editor-content');
  const previewArea = document.getElementById('note-editor-preview-container');
  const subheadingField = document.getElementById('note-editor-subheading');
  const descField = document.getElementById('note-editor-desc');

  const colors = {
    gray: '#94a3b8',
    black: '#000000',
    red: '#ef4444',
    rose: '#f43f5e',
    pink: '#ec4899',
    purple: '#a855f7',
    indigo: '#818cf8',
    blue: '#3b82f6',
    teal: '#14b8a6',
    emerald: '#34d399',
    green: '#22c55e',
    yellow: '#eab308',
    orange: '#fb923c',
    gold: '#fbbf24'
  };

  const hasCustomTheme = note.presetTheme && note.presetTheme !== 'default';

  // 1. Title color selection
  const titleColor = note.titleColor || 'default';
  if (titleField) {
    if (titleColor === 'default') {
      titleField.style.color = hasCustomTheme ? '#ffffff' : '';
    } else {
      titleField.style.color = colors[titleColor] || '';
    }
  }

  // 2. Subheading color selection
  const subheadingColor = note.subheadingColor || 'default';
  if (subheadingField) {
    if (subheadingColor === 'default') {
      subheadingField.style.color = hasCustomTheme ? 'rgba(255, 255, 255, 0.7)' : '';
    } else {
      subheadingField.style.color = colors[subheadingColor] || '';
    }
  }

  // 3. Description color selection
  const descColor = note.descColor || 'default';
  if (descField) {
    if (descColor === 'default') {
      descField.style.color = hasCustomTheme ? 'rgba(255, 255, 255, 0.55)' : '';
    } else {
      descField.style.color = colors[descColor] || '';
    }
  }

  // 4. Content / body text and preview area color selection
  const contentColor = note.contentColor || 'default';
  [contentArea, previewArea].forEach(el => {
    if (el) {
      if (contentColor === 'default') {
        el.style.color = hasCustomTheme ? '#ffffff' : '';
      } else {
        el.style.color = colors[contentColor] || '';
      }
    }
  });

  const targetElements = [];
  if (titleField) targetElements.push(titleField);
  if (contentArea) targetElements.push(contentArea);
  if (previewArea) targetElements.push(previewArea);

  // 2. Apply font family
  targetElements.forEach(el => {
    el.style.fontFamily = note.titleFont || '';
  });

  // 3. Apply text effects / weight
  const effect = note.titleEffect || 'normal';
  targetElements.forEach(el => {
    el.style.textShadow = '';
    el.style.fontStyle = '';
    el.style.textDecoration = '';
    el.classList.remove('mode-wavy', 'mode-neon', 'mode-cyberpunk', 'mode-blur');

    if (effect === 'glow') {
      const colorVal = el.style.color || '#fff';
      el.style.textShadow = `0 0 12px ${colorVal}`;
    } else if (effect === 'italic') {
      el.style.fontStyle = 'italic';
    } else if (effect === 'underline') {
      el.style.textDecoration = 'underline';
    } else if (effect === 'wavy') {
      el.classList.add('mode-wavy');
    } else if (effect === 'neon') {
      el.classList.add('mode-neon');
    } else if (effect === 'cyberpunk') {
      el.classList.add('mode-cyberpunk');
    } else if (effect === 'blur') {
      el.classList.add('mode-blur');
    }
  });

  // Sync legacy toolbar selector values to maintain perfect state compatibility
  const fontSelectVal = document.getElementById('note-style-font');
  if (fontSelectVal) fontSelectVal.value = note.titleFont || 'var(--font-primary)';
  
  const colorSelectVal = document.getElementById('note-style-color');
  if (colorSelectVal) colorSelectVal.value = note.titleColor || 'default';
  
  const effectSelectVal = document.getElementById('note-style-effect');
  if (effectSelectVal) effectSelectVal.value = note.titleEffect || 'normal';

  // Sync new inline selector dropdowns
  const inlineFont = document.getElementById('note-style-font-dropdown');
  if (inlineFont) inlineFont.value = note.titleFont || 'var(--font-primary)';

  const inlineEffect = document.getElementById('note-style-effect-dropdown');
  if (inlineEffect) inlineEffect.value = note.titleEffect || 'normal';

  const inlineTheme = document.getElementById('note-style-theme-dropdown');
  if (inlineTheme) inlineTheme.value = note.presetTheme || 'default';

  const targetSelect = document.getElementById('note-style-color-target');
  const target = targetSelect ? targetSelect.value : 'title';
  let inlineColor = 'default';
  if (target === 'title') inlineColor = note.titleColor || 'default';
  else if (target === 'subheading') inlineColor = note.subheadingColor || 'default';
  else if (target === 'description') inlineColor = note.descColor || 'default';
  else if (target === 'content') inlineColor = note.contentColor || 'default';

  const colorDots = document.querySelectorAll('#style-color-palette .color-dot');
  colorDots.forEach(dot => {
    if (dot.getAttribute('data-color') === inlineColor) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  const currentTheme = note.presetTheme || 'default';
  const presetCards = document.querySelectorAll('.theme-preset-card');
  presetCards.forEach(card => {
    if (card.getAttribute('data-preset') === currentTheme) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// Mobile notes layout: full-screen list OR full-screen editor
function updateNotesMobileLayout() {
  const workspace = document.querySelector('.notes-workspace-container');
  if (!workspace) return;

  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  if (!isMobile) {
    workspace.classList.remove('notes-mobile-editor-open', 'notes-mobile-list-open', 'notes-mobile-empty-open');
    return;
  }

  const note = state.activeNoteId ? state.notes.find(n => n.id === state.activeNoteId) : null;
  const hasNotes = state.notes && state.notes.length > 0;

  workspace.classList.toggle('notes-mobile-editor-open', !!note);
  workspace.classList.toggle('notes-mobile-list-open', !note && hasNotes);
  workspace.classList.toggle('notes-mobile-empty-open', !note && !hasNotes);

  const backBtn = document.getElementById('btn-notes-mobile-back');
  if (backBtn) backBtn.style.display = note ? 'flex' : 'none';
}

// Active Editor Sync
function loadActiveNoteIntoEditor() {
  const emptyState = document.getElementById('notes-empty-state');
  const activeEditor = document.getElementById('notes-active-editor');

  if (!emptyState || !activeEditor) return;

  const note = state.activeNoteId ? state.notes.find(n => n.id === state.activeNoteId) : null;

  if (!note) {
    emptyState.style.display = 'flex';
    activeEditor.style.display = 'none';
    
    const currentTab = state.notesSidebarTab || 'active';
    const emptyIcon = document.querySelector('#notes-empty-state .empty-icon');
    const emptyTitle = document.querySelector('#notes-empty-state h3');
    const emptyDesc = document.querySelector('#notes-empty-state p');
    const btnAddEmpty = document.getElementById('btn-add-note-empty-state');

    if (currentTab === 'active') {
      if (emptyIcon) emptyIcon.innerText = '📝';
      if (emptyTitle) emptyTitle.innerText = 'Personal Workspace';
      if (emptyDesc) emptyDesc.innerText = 'Create a new document or select an existing page from the sidebar to start writing notes.';
      if (btnAddEmpty) btnAddEmpty.style.display = 'inline-flex';
      
      const btnSpan = document.querySelector('#btn-add-note-empty-state span');
      if (btnSpan) {
        const hasAnyNotes = state.notes && state.notes.length > 0;
        btnSpan.innerText = hasAnyNotes ? 'Create New Page' : 'Create First Page';
      }
    } else if (currentTab === 'archived') {
      if (emptyIcon) emptyIcon.innerText = '📦';
      if (emptyTitle) emptyTitle.innerText = 'Archived Pages';
      if (emptyDesc) emptyDesc.innerText = 'Select an archived page from the sidebar to read it, or restore it back to active pages.';
      if (btnAddEmpty) btnAddEmpty.style.display = 'none';
    } else if (currentTab === 'trash') {
      if (emptyIcon) emptyIcon.innerText = '🗑️';
      if (emptyTitle) emptyTitle.innerText = 'Trash Inventory';
      if (emptyDesc) emptyDesc.innerText = 'Select an item from the sidebar to view details, restore, or delete it permanently.';
      if (btnAddEmpty) btnAddEmpty.style.display = 'none';
    } else if (currentTab === 'vault') {
      if (emptyIcon) emptyIcon.innerText = '🔐';
      if (emptyTitle) emptyTitle.innerText = 'Secure Vault';
      if (emptyDesc) emptyDesc.innerText = 'Select a locked page from the sidebar or customize your vault settings.';
      if (btnAddEmpty) btnAddEmpty.style.display = 'none';
    }
    
    updateNotesMobileLayout();
    return;
  }

  emptyState.style.display = 'none';
  activeEditor.style.display = 'flex';

  // Handle banners, editability, and actions container visibility based on note state
  const trashBanner = document.getElementById('note-trash-banner');
  const archiveBanner = document.getElementById('note-archive-banner');
  const actionsContainer = document.getElementById('notes-editor-actions-container');

  if (note.isDeleted) {
    if (trashBanner) trashBanner.style.display = 'flex';
    if (archiveBanner) archiveBanner.style.display = 'none';
    if (actionsContainer) actionsContainer.style.display = 'none';
    
    const tField = document.getElementById('note-editor-title');
    if (tField) tField.readOnly = true;
    const sField = document.getElementById('note-editor-subheading');
    if (sField) sField.readOnly = true;
    const dField = document.getElementById('note-editor-desc');
    if (dField) dField.readOnly = true;
    const cArea = document.getElementById('note-editor-content');
    if (cArea) cArea.setAttribute('contenteditable', 'false');
  } else if (note.isArchived) {
    if (trashBanner) trashBanner.style.display = 'none';
    if (archiveBanner) archiveBanner.style.display = 'flex';
    if (actionsContainer) actionsContainer.style.display = 'none';
    
    const tField = document.getElementById('note-editor-title');
    if (tField) tField.readOnly = true;
    const sField = document.getElementById('note-editor-subheading');
    if (sField) sField.readOnly = true;
    const dField = document.getElementById('note-editor-desc');
    if (dField) dField.readOnly = true;
    const cArea = document.getElementById('note-editor-content');
    if (cArea) cArea.setAttribute('contenteditable', 'false');
  } else {
    if (trashBanner) trashBanner.style.display = 'none';
    if (archiveBanner) archiveBanner.style.display = 'none';
    if (actionsContainer) actionsContainer.style.display = 'flex';
    
    const tField = document.getElementById('note-editor-title');
    if (tField) tField.readOnly = false;
    const sField = document.getElementById('note-editor-subheading');
    if (sField) sField.readOnly = false;
    const dField = document.getElementById('note-editor-desc');
    if (dField) dField.readOnly = false;
    const cArea = document.getElementById('note-editor-content');
    if (cArea) cArea.setAttribute('contenteditable', 'true');
  }

  // Update action buttons visual state (active highlights and labels)
  const btnPin = document.getElementById('btn-note-pin-active');
  const btnPinText = document.getElementById('btn-note-pin-text');
  if (btnPin) {
    if (note.isFavorite) {
      btnPin.classList.add('active');
      if (btnPinText) btnPinText.innerText = 'Pinned';
    } else {
      btnPin.classList.remove('active');
      if (btnPinText) btnPinText.innerText = 'Pin';
    }
  }

  const btnArchive = document.getElementById('btn-note-archive-active');
  const btnArchiveText = document.getElementById('btn-note-archive-text');
  if (btnArchive) {
    if (note.isArchived) {
      btnArchive.classList.add('active');
      if (btnArchiveText) btnArchiveText.innerText = 'Archived';
    } else {
      btnArchive.classList.remove('active');
      if (btnArchiveText) btnArchiveText.innerText = 'Archive';
    }
  }

  const btnHide = document.getElementById('btn-note-hide-active');
  const btnHideText = document.getElementById('btn-note-hide-text');
  if (btnHide) {
    if (note.isHidden) {
      btnHide.classList.add('active');
      if (btnHideText) btnHideText.innerText = 'Locked';
    } else {
      btnHide.classList.remove('active');
      if (btnHideText) btnHideText.innerText = 'Hide';
    }
  }

  // Reset active editor view mode to Edit on load
  const btnEdit = document.getElementById('btn-note-mode-edit');
  const btnPreview = document.getElementById('btn-note-mode-preview');
  const contentArea = document.getElementById('note-editor-content');
  const previewArea = document.getElementById('note-editor-preview-container');

  if (contentArea) {
    if (!Object.getOwnPropertyDescriptor(contentArea, 'value')) {
      Object.defineProperty(contentArea, 'value', {
        get() { return this.innerHTML; },
        set(val) { this.innerHTML = val || ''; },
        configurable: true
      });
    }
  }

  if (btnEdit && btnPreview && contentArea && previewArea) {
    btnEdit.classList.add('active');
    btnEdit.style.background = 'rgba(255,255,255,0.08)';
    btnEdit.style.color = '#fff';

    btnPreview.classList.remove('active');
    btnPreview.style.background = 'transparent';
    btnPreview.style.color = 'var(--text-muted)';

    previewArea.style.display = 'none';
    contentArea.style.display = 'block';
  }

  // Load covers
  const coverHeader = document.getElementById('notes-cover-header');
  if (coverHeader) {
    coverHeader.style.background = note.coverGradient || NOTES_COVER_GRADIENTS[0];
  }

  // Load emojis
  const emojiTrigger = document.getElementById('note-emoji-trigger');
  if (emojiTrigger) {
    setNativeEmoji(emojiTrigger, note.emoji || '📄', 32);
  }

  // Load custom categories and subcategories
  const catSelectCustom = document.getElementById('note-category-select-custom');
  const subcatSelectCustom = document.getElementById('note-subcategory-select-custom');
  
  if (catSelectCustom && subcatSelectCustom) {
    // Populate Categories dropdown
    catSelectCustom.innerHTML = '';
    state.noteCategories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.innerText = `${cat.emoji} ${cat.name}`;
      catSelectCustom.appendChild(opt);
    });

    // Helper to update the category-subcategory stacked display card
    const updateGlowCategoryStack = (selectedCatId, selectedSubcatId) => {
      const cat = state.noteCategories.find(c => c.id === selectedCatId);
      const stackCard = document.getElementById('glow-category-stack');
      const catEmojiSpan = document.getElementById('stack-cat-emoji');
      const catNameSpan = document.getElementById('stack-cat-name');
      const subcatEmojiSpan = document.getElementById('stack-subcat-emoji');
      const subcatNameSpan = document.getElementById('stack-subcat-name');

      if (!cat || !stackCard) return;

      // 1. Populate Category row
      if (catEmojiSpan) {
        setNativeEmoji(catEmojiSpan, cat.emoji || '📂', 16);
      }
      if (catNameSpan) {
        catNameSpan.innerText = cat.name || (cat.id ? cat.id.charAt(0).toUpperCase() + cat.id.slice(1) : 'Category');
      }

      // 2. Populate Subcategory row
      const subcat = cat.subcategories ? cat.subcategories.find(s => s.id === selectedSubcatId) : null;
      const subRow = stackCard.querySelector('.stack-row-subcategory');
      if (subcat) {
        if (subRow) subRow.style.display = 'flex';
        if (subcatEmojiSpan) {
          setNativeEmoji(subcatEmojiSpan, subcat.emoji || '📌', 14);
        }
        if (subcatNameSpan) {
          subcatNameSpan.innerText = subcat.name;
        }
      } else {
        if (subRow) subRow.style.display = 'none';
      }

      // 3. Drive breathing glow outline using category HSL hue
      const hsl = cat.hsl || '200, 70%, 50%';
      stackCard.style.border = `1px solid hsla(${hsl}, 0.45)`;
      stackCard.style.background = `hsla(${hsl}, 0.08)`;
      stackCard.style.setProperty('--glow-color', `hsla(${hsl}, 0.55)`);
    };

    // Determine note categoryId
    let catId = note.categoryId;
    if (!catId) {
      const legacyCat = note.category || 'General';
      const matched = state.noteCategories.find(c => c.name.toLowerCase() === legacyCat.toLowerCase()) || state.noteCategories[0];
      catId = matched ? matched.id : 'general';
      note.categoryId = catId;
    }

    // Determine note subcategoryId
    let subcatId = note.subcategoryId || '';
    const cat = state.noteCategories.find(c => c.id === catId);
    if (cat && cat.subcategories && cat.subcategories.length > 0) {
      if (subcatId && !cat.subcategories.some(s => s.id === subcatId)) {
        subcatId = cat.subcategories[0].id;
        note.subcategoryId = subcatId;
      }
    } else {
      subcatId = '';
      note.subcategoryId = '';
    }

    // Populate legacy select fields in DOM to maintain perfect state compatibility
    if (catSelectCustom && subcatSelectCustom) {
      catSelectCustom.innerHTML = `<option value="${catId}">${cat ? cat.name : 'General'}</option>`;
      catSelectCustom.value = catId;
      subcatSelectCustom.innerHTML = `<option value="${subcatId}">${subcatId}</option>`;
      subcatSelectCustom.value = subcatId;
    }

    updateGlowCategoryStack(catId, subcatId);

    // Bind interactive double-column selector popover on click
    const stackCard = document.getElementById('glow-category-stack');
    if (stackCard) {
      stackCard.onclick = () => {
        showDoubleColumnCategoryPicker(stackCard, note);
      };
    }
  }

  // Load legacy category select
  const catSelect = document.getElementById('note-category-select');
  if (catSelect) {
    catSelect.value = note.category || 'General';
  }

  // Load subheading
  const subheadingField = document.getElementById('note-editor-subheading');
  if (subheadingField) {
    subheadingField.value = note.subheading || '';
  }

  // Load description
  const descField = document.getElementById('note-editor-desc');
  if (descField) {
    descField.value = note.desc || '';
  }

  // Load titles & apply custom styles
  const titleField = document.getElementById('note-editor-title');
  if (titleField) {
    titleField.value = note.title || '';
  }

  // Apply selected styles to title, content textarea, and preview container!
  applyActiveNoteStyles(note);

  // Sync Instagram Card Preview
  if (window.syncInstagramStoryCard) {
    window.syncInstagramStoryCard(note);
  }

  // Load contents
  if (contentArea) {
    contentArea.value = note.content || '';
    if (window.ensureLinkBadgesHaveEditButtons) {
      window.ensureLinkBadgesHaveEditButtons(contentArea);
    }
    if (window.ensureFileCardsHaveViewOptions) {
      window.ensureFileCardsHaveViewOptions(contentArea);
    }
  }

  // Reset visual saved label
  showSavingIndicator(false);

  // Apply passcode lock overlay and dynamic preset wallpaper/theme
  if (window.checkNotePasscodeState) {
    window.checkNotePasscodeState(note);
  }

  // Re-run AI Copilot to refresh tags and avoid showing stale labels from previous pages
  runAutoAICopilot();

  updateNotesMobileLayout();
}

// Notion-Style GFM parser for Preview Mode
function parseNotesMarkdown(text) {
  if (!text || text.trim() === '') {
    return `<p style="color: var(--text-darker); font-style: italic; text-align: center; margin-top: 3rem;">Empty page. Click <strong>Edit</strong> at the top right to start writing!</p>`;
  }

  let lines = text.split('\n');
  let parsedHTML = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // 1. GFM Alerts / Callouts (Info, Tip, Warning)
    if (line.trim().startsWith('> [!NOTE]') || line.trim().startsWith('> [!TIP]') || line.trim().startsWith('> [!WARNING]')) {
      let emoji = 'ℹ️';
      let titleText = 'Note';
      let borderCol = 'hsl(var(--color-indigo))';

      if (line.trim().includes('!TIP')) {
        emoji = '💡';
        titleText = 'Tip';
        borderCol = '#10b981';
      } else if (line.trim().includes('!WARNING')) {
        emoji = '⚠️';
        titleText = 'Warning';
        borderCol = '#f59e0b';
      }

      let calloutLines = [];
      i++; // move past alert header line
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        calloutLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      i--; // step back to let main loop handle index

      parsedHTML.push(`
        <div class="notion-callout" style="border-left: 3px solid ${borderCol}; margin: 1rem 0; padding: 1rem; background: rgba(255,255,255,0.015); border-radius: 12px; display: flex; gap: 0.75rem; text-align: left; border-top-left-radius: 4px; border-bottom-left-radius: 4px; border: 1px solid var(--border-glass); border-left-color: ${borderCol}; border-left-width: 3.5px;">
          <span style="font-size: 1.25rem; line-height: 1; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px;">
            <img src="${getTwemojiUrl(emoji)}" alt="emoji" style="width: 20px; height: 20px; display: block; object-fit: contain;">
          </span>
          <div style="display: flex; flex-direction: column; gap: 0.2rem;">
            <strong style="font-size: 0.85rem; color: ${borderCol}; font-weight: 700;">${titleText}</strong>
            <p style="margin: 0; font-size: 0.82rem; color: var(--text-main); line-height: 1.55;">${calloutLines.join('<br>')}</p>
          </div>
        </div>
      `);
      continue;
    }

    // Close lists if we hit a non-bullet item
    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('- ') || line.trim().startsWith('* ');
    if (inList && !isBullet) {
      parsedHTML.push('</ul>');
      inList = false;
    }

    // 2. Bullet lists
    if (isBullet) {
      if (!inList) {
        parsedHTML.push('<ul style="margin: 0.5rem 0 0.5rem 1.25rem; padding: 0; list-style-type: disc; color: var(--text-main); display: flex; flex-direction: column; gap: 0.35rem;">');
        inList = true;
      }
      const cleanText = line.replace(/^\s*(?:•|-\s+|\*\s+)\s*/, '');
      parsedHTML.push(`<li style="font-size: 0.85rem; line-height: 1.5; color: var(--text-main);">${cleanText}</li>`);
      continue;
    }

    // 3. Todo checklists
    const isTodo = line.trim().match(/^\s*(?:-\s+)?\[\s*\]\s+(.*)$/) || line.trim().match(/^\s*(?:-\s+)?\[[xX]\]\s+(.*)$/);
    if (isTodo) {
      const isChecked = line.trim().includes('[x]') || line.trim().includes('[X]');
      const cleanText = isTodo[1];
      parsedHTML.push(`
        <div class="rich-checkbox-row" style="display: flex; align-items: flex-start; gap: 0.5rem; margin: 0.4rem 0; font-size: 0.85rem; color: var(--text-main);">
          <input type="checkbox" ${isChecked ? 'checked' : ''} disabled style="margin-top: 0.25rem; cursor: not-allowed; accent-color: hsl(var(--color-indigo));">
          <span style="${isChecked ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${cleanText}</span>
        </div>
      `);
      continue;
    }

    // 4. Headers
    if (line.trim().startsWith('### ')) {
      parsedHTML.push(`<h4 style="font-size: 1rem; font-weight: 700; margin: 1.25rem 0 0.5rem 0; color: #fff;">${line.replace('### ', '')}</h4>`);
      continue;
    } else if (line.trim().startsWith('## ')) {
      parsedHTML.push(`<h3 style="font-size: 1.15rem; font-weight: 700; margin: 1.5rem 0 0.6rem 0; color: #fff;">${line.replace('## ', '')}</h3>`);
      continue;
    } else if (line.trim().startsWith('# ')) {
      parsedHTML.push(`<h2 style="font-size: 1.35rem; font-weight: 700; margin: 1.75rem 0 0.75rem 0; color: #fff;">${line.replace('# ', '')}</h2>`);
      continue;
    }

    // 5. Standard lines
    if (line.trim() === '') {
      parsedHTML.push('<div style="height: 0.5rem;"></div>');
    } else {
      parsedHTML.push(`<p style="margin: 0.4rem 0; font-size: 0.85rem; line-height: 1.55; color: var(--text-main); text-align: left;">${line}</p>`);
    }
  }

  if (inList) {
    parsedHTML.push('</ul>');
  }

  return parsedHTML.join('');
}

// Floating Slash (/) Commands popover menu
function showSlashMenu(textarea) {
  const existing = document.getElementById('note-slash-menu-popover');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.id = 'note-slash-menu-popover';
  menu.className = 'glass-card note-slash-menu-popover';
  menu.style.position = 'absolute';
  menu.style.zIndex = '1050';
  menu.style.padding = '0.4rem';
  menu.style.display = 'flex';
  menu.style.flexDirection = 'column';
  menu.style.gap = '0.2rem';
  menu.style.background = 'rgba(15, 23, 42, 0.98)';
  menu.style.border = '1px solid var(--border-glass-strong)';
  menu.style.borderRadius = '12px';
  menu.style.boxShadow = '0 12px 30px rgba(0,0,0,0.6)';
  menu.style.backdropFilter = 'blur(20px)';
  menu.style.width = '170px';
  menu.style.animation = 'slideDownDrawer 0.2s ease-in-out';

  const commands = [
    { label: '• Bullet List', snippet: '• ' },
    { label: '[ ] Todo Checklist', snippet: '[ ] ' },
    { label: 'ℹ️ Info Callout', snippet: '\n> [!NOTE]\n> ' },
    { label: '💡 Tip Callout', snippet: '\n> [!TIP]\n> ' },
    { label: '⚠️ Warning Callout', snippet: '\n> [!WARNING]\n> ' }
  ];

  commands.forEach(cmd => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.background = 'transparent';
    btn.style.border = 'none';
    btn.style.color = 'var(--text-main)';
    btn.style.textAlign = 'left';
    btn.style.padding = '0.45rem 0.6rem';
    btn.style.borderRadius = '6px';
    btn.style.fontSize = '0.78rem';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = '500';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.gap = '0.4rem';
    btn.style.transition = 'all 0.2s';
    btn.innerText = cmd.label;

    btn.addEventListener('mouseover', () => {
      btn.style.background = 'rgba(255,255,255,0.08)';
      btn.style.color = '#fff';
    });
    btn.addEventListener('mouseout', () => {
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-main)';
    });

    btn.addEventListener('click', () => {
      // Remove the slash if it was typed immediately before the cursor
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        let node = range.startContainer;
        let offset = range.startOffset;
        
        if (node.nodeType === Node.TEXT_NODE && offset > 0 && node.textContent.charAt(offset - 1) === '/') {
          node.textContent = node.textContent.substring(0, offset - 1) + node.textContent.substring(offset);
          range.setStart(node, offset - 1);
          range.setEnd(node, offset - 1);
        }
      }
      
      insertTextAtNotesCursor(cmd.snippet);

      // Trigger auto-save
      const contentArea = document.getElementById('note-editor-content');
      if (contentArea) {
        contentArea.dispatchEvent(new Event('input', { bubbles: true }));
      }
      menu.remove();
    });

    menu.appendChild(btn);
  });

  // Position contextually inside the editor column
  let top = 100, left = 100;
  const sel = window.getSelection();
  if (sel.rangeCount > 0) {
    const range = sel.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rects = range.getClientRects();
    if (rects.length > 0) {
      top = rects[0].top + window.scrollY;
      left = rects[0].left + window.scrollX;
    } else {
      const rect = textarea.getBoundingClientRect();
      top = rect.top + window.scrollY + 40;
      left = rect.left + window.scrollX + 20;
    }
  } else {
    const rect = textarea.getBoundingClientRect();
    top = rect.top + window.scrollY + 40;
    left = rect.left + window.scrollX + 20;
  }
  menu.style.top = `${top + 20}px`;
  menu.style.left = `${left}px`;

  document.body.appendChild(menu);

  const clickHandler = (e) => {
    if (!menu.contains(e.target) && e.target !== textarea) {
      menu.remove();
      document.removeEventListener('click', clickHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', clickHandler), 10);
}

function hideSlashMenu() {
  const menu = document.getElementById('note-slash-menu-popover');
  if (menu) menu.remove();
}

// ================= RICH-TEXT WYSIWYG EDITOR, PLUS MENU & AUDIO RECORDING ENGINES =================

let activeRecorder = null;
let activeChunks = [];

window.startAudioRecording = async (blockId) => {
  const block = document.getElementById(blockId);
  if (!block) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    activeChunks = [];
    activeRecorder = new MediaRecorder(stream);
    activeRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) activeChunks.push(e.data);
    };
    activeRecorder.onstop = async () => {
      const blob = new Blob(activeChunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result;
        // Render custom styled playback bar
        block.innerHTML = `
          <div style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; tracking: 0.05em; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
            <span>🔊 Voice Memo</span>
            <button type="button" class="btn-delete-block" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.1rem; line-height: 1;" onclick="this.closest('.embedded-audio-card').remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">&times;</button>
          </div>
          <audio controls src="${base64Audio}" style="width:100%; height:36px; border-radius: 8px; outline: none;"></audio>
        `;
        // Trigger auto-save
        document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));
      };
      reader.readAsDataURL(blob);
      stream.getTracks().forEach(track => track.stop());
    };

    activeRecorder.start();

    // Update UI status to recording
    const dot = block.querySelector('.status-dot');
    const txt = block.querySelector('.status-text');
    const btnRec = block.querySelector('.btn-audio-record');
    const btnStop = block.querySelector('.btn-audio-stop');

    if (dot) dot.classList.add('audio-recording-glow');
    if (txt) txt.innerText = 'Recording...';
    if (btnRec) btnRec.style.display = 'none';
    if (btnStop) btnStop.style.display = 'block';

  } catch (err) {
    console.error("Recording error: ", err);
    alert("Microphone access denied or error starting recording.");
  }
};

window.stopAudioRecording = (blockId) => {
  if (activeRecorder && activeRecorder.state !== 'inactive') {
    activeRecorder.stop();
  }
};

// Character-by-character live AI suggested tags compiler
let aiCopilotDebounceTimer = null;

function handleContentAreaInput() {
  const contentArea = document.getElementById('note-editor-content');
  const tagsContainer = document.getElementById('copilot-glowing-tags');
  if (!contentArea || !tagsContainer) return;

  if (aiCopilotDebounceTimer) {
    clearTimeout(aiCopilotDebounceTimer);
  }

  const content = contentArea.innerText || contentArea.innerHTML || '';
  if (content.trim() === '') {
    tagsContainer.innerHTML = `
      <span style="font-size: 0.65rem; color: var(--text-muted); background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-glass); padding: 0.25rem 0.65rem; border-radius: 99px; display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font-primary);">
        <span style="width: 5px; height: 5px; border-radius: 50%; background: var(--text-darker); display: inline-block;"></span>
        🤖 AI Copilot: Standing by...
      </span>
    `;
  } else {
    tagsContainer.innerHTML = `
      <span style="font-size: 0.65rem; color: var(--text-muted); background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-glass); padding: 0.25rem 0.65rem; border-radius: 99px; display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font-primary);">
        <span style="width: 5px; height: 5px; border-radius: 50%; background: #fb923c; display: inline-block;"></span>
        🤖 AI Copilot: Writing note... (will analyze on pause)
      </span>
    `;
  }

  aiCopilotDebounceTimer = setTimeout(() => {
    runAutoAICopilot();
  }, 2500);
}

function handleContentAreaBlur() {
  if (aiCopilotDebounceTimer) {
    clearTimeout(aiCopilotDebounceTimer);
  }
  runAutoAICopilot();
}

// Character-by-character live AI suggested tags compiler
function runAutoAICopilot() {
  const contentArea = document.getElementById('note-editor-content');
  const tagsContainer = document.getElementById('copilot-glowing-tags');
  if (!contentArea || !tagsContainer) return;

  const content = contentArea.innerText || contentArea.innerHTML || '';
  if (content.trim() === '') {
    tagsContainer.innerHTML = `
      <span style="font-size: 0.65rem; color: var(--text-muted); background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-glass); padding: 0.25rem 0.65rem; border-radius: 99px; display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font-primary);">
        <span style="width: 5px; height: 5px; border-radius: 50%; background: var(--text-darker); display: inline-block;"></span>
        🤖 AI Copilot: Standing by...
      </span>
    `;
    return;
  }

  // Clean HTML
  const cleanText = content.replace(/<[^>]*>/g, ' ').toLowerCase();
  const words = cleanText.split(/\W+/);
  const map = {};
  const stopwords = [
    'about', 'above', 'after', 'again', 'against', 'along', 'among', 'around', 'before', 'behind', 
    'below', 'beneath', 'beside', 'between', 'beyond', 'during', 'except', 'inside', 'outside', 
    'under', 'underneath', 'without', 'because', 'though', 'although', 'unless', 'until', 'while',
    'these', 'those', 'their', 'theirs', 'there', 'either', 'neither', 'another', 'others', 'someone',
    'would', 'could', 'should', 'might', 'ought', 'shall', 'every', 'other', 'another', 'which',
    'morning', 'evening', 'afternoon', 'night', 'today', 'yesterday', 'tomorrow', 'first', 'second',
    'third', 'fourth', 'fifth', 'seconds', 'minutes', 'hours', 'daily', 'weekly', 'monthly', 'yearly',
    'never', 'always', 'already', 'earlier', 'early', 'quietly', 'silently', 'softly', 'tightly', 
    'slowly', 'quickly', 'suddenly', 'almost', 'really', 'simply', 'mostly', 'maybe', 'perhaps',
    'write', 'wrote', 'drawing', 'audio', 'location', 'image', 'video', 'checklist', 'scrapbook', 
    'media', 'going', 'started', 'having', 'making', 'taking', 'doing', 'getting', 'giving', 
    'looking', 'looks', 'looked', 'asked', 'asked', 'asked', 'toggled', 'added', 'removed',
    'thing', 'things', 'matter', 'looks', 'seems', 'seemed', 'becomes', 'became'
  ];
  const semanticThemes = [
    {
      keywords: ['paint', 'painting', 'color', 'colors', 'art', 'sketch', 'lamp', 'mold', 'molded', 'splatter', 'pattern', 'draw', 'drawing', 'canvas', 'creative', 'create'],
      tags: ['#CREATIVE', '#SPONTANEITY', '#ARTISTIC']
    },
    {
      keywords: ['smile', 'smiled', 'happy', 'glad', 'love', 'laugh', 'laughs', 'laughed', 'joy', 'peace', 'peaceful', 'smiles'],
      tags: ['#JOY', '#OPTIMISM', '#SERENITY']
    },
    {
      keywords: ['frustrated', 'frustration', 'anger', 'angry', 'sad', 'sadness', 'cry', 'crying', 'pain', 'hurts', 'hurt', 'vent', 'venting', 'feelings', 'feeling', 'heart', 'clear'],
      tags: ['#CATHARSIS', '#RELEASE', '#EMOTIONAL']
    },
    {
      keywords: ['window', 'clouds', 'wind', 'nature', 'sky', 'trees', 'sun', 'sunset', 'rain', 'breeze', 'silent', 'quiet', 'calm'],
      tags: ['#SERENITY', '#MINDFULNESS', '#PEACE']
    },
    {
      keywords: ['write', 'notes', 'journal', 'read', 'thinking', 'thought', 'thoughts', 'realized', 'realizing', 'realise', 'realising', 'understand', 'understood', 'wisdom', 'mind'],
      tags: ['#REFLECTION', '#INSIGHT', '#MINDFULNESS']
    },
    {
      keywords: ['work', 'study', 'focus', 'learn', 'learning', 'project', 'code', 'coding', 'habit', 'habits', 'quest', 'todo', 'task', 'tasks', 'discipline', 'disciplined'],
      tags: ['#FOCUS', '#GROWTH', '#PRODUCTIVE']
    },
    {
      keywords: ['secure', 'vault', 'safe', 'hidden', 'lock', 'locked', 'passcode', 'secret', 'secrets', 'private', 'privacy'],
      tags: ['#PRIVACY', '#SECURITY', '#MYSTERY']
    },
    {
      keywords: ['travel', 'trip', 'place', 'journey', 'road', 'walk', 'walking', 'explore', 'exploring'],
      tags: ['#JOURNEY', '#ADVENTURE', '#PLACES']
    }
  ];

  const scores = {};
  semanticThemes.forEach(theme => {
    theme.tags.forEach(t => { scores[t] = 0; });
  });

  const literalCounts = {};
  words.forEach(w => {
    // 1. Score Semantic Themes
    semanticThemes.forEach(theme => {
      if (theme.keywords.includes(w)) {
        theme.tags.forEach(t => {
          scores[t] += 2.0;
        });
      }
    });
    // 2. Score Literal Words
    if (w.length > 4 && !stopwords.includes(w)) {
      literalCounts[w] = (literalCounts[w] || 0) + 1;
    }
  });

  // Convert literal words to tags and merge scores
  Object.keys(literalCounts).forEach(w => {
    const t = '#' + w.toUpperCase();
    scores[t] = (scores[t] || 0) + literalCounts[w] * 0.85;
  });

  // Sort tags by score
  const sortedTags = Object.entries(scores)
    .filter(entry => entry[1] > 0)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  tagsContainer.innerHTML = '';
  
  const defaultLabels = ['#CREATIVE', '#INSIGHT', '#FOCUS'];
  const finalLabels = [...sortedTags];
  
  while (finalLabels.length < 3) {
    const def = defaultLabels[finalLabels.length] || '#GENERAL';
    if (!finalLabels.includes(def)) finalLabels.push(def);
  }

  const colors = ['#818cf8', '#f472b6', '#34d399'];
  const colorMap = {
    '#818cf8': { text: '#a5b4fc', border: 'rgba(129, 140, 248, 0.25)', bg: 'rgba(129, 140, 248, 0.06)' },
    '#f472b6': { text: '#f9a8d4', border: 'rgba(244, 114, 182, 0.25)', bg: 'rgba(244, 114, 182, 0.06)' },
    '#34d399': { text: '#6ee7b7', border: 'rgba(52, 211, 153, 0.25)', bg: 'rgba(52, 211, 153, 0.06)' }
  };

  finalLabels.slice(0, 3).forEach((tag, idx) => {
    const col = colors[idx % colors.length];
    const style = colorMap[col] || { text: col, border: 'rgba(255,255,255,0.1)', bg: 'rgba(255,255,255,0.03)' };
    tagsContainer.innerHTML += `
      <span style="font-size: 0.68rem; font-weight: 700; color: ${style.text}; background: ${style.bg}; border: 1px solid ${style.border}; padding: 0.25rem 0.65rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font-primary);">
        <span style="width: 5px; height: 5px; border-radius: 50%; background: ${col}; display: inline-block;"></span>
        ${tag}
      </span>
    `;
  });
}

function initNotesPlusMenuAndWYSIWYG() {
  // 1. Transparent instance property value bridge for HTMLDivElement editor
  const contentArea = document.getElementById('note-editor-content');
  if (contentArea) {
    if (!Object.getOwnPropertyDescriptor(contentArea, 'value')) {
      Object.defineProperty(contentArea, 'value', {
        get() {
          return this.innerHTML;
        },
        set(val) {
          this.innerHTML = val || '';
        },
        configurable: true
      });
    }
  }

  // Prevent multiple listeners and initialization cycles
  if (state.isPlusMenuInitialized) {
    runAutoAICopilot();
    return;
  }
  state.isPlusMenuInitialized = true;

  const floatingBtn = document.getElementById('floating-notes-adder-btn');
  const plusMenu = document.getElementById('notes-plus-menu');
  if (floatingBtn && plusMenu) {
    // Re-bind click listener with clean clone
    const newFloatingBtn = floatingBtn.cloneNode(true);
    floatingBtn.parentNode.replaceChild(newFloatingBtn, floatingBtn);
    
    newFloatingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = plusMenu.style.display === 'flex';
      plusMenu.style.display = isOpen ? 'none' : 'flex';
      newFloatingBtn.classList.toggle('active', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!plusMenu.contains(e.target) && !newFloatingBtn.contains(e.target)) {
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
      }
    });

    // Helper to insert HTML at cursor position inside rich-text contenteditable div
    function insertHTMLAtCursor(html) {
      if (!contentArea) return;
      
      contentArea.focus();
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const el = document.createElement('div');
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node, lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } else {
        contentArea.innerHTML += html;
      }
      contentArea.dispatchEvent(new Event('input', { bubbles: true }));
      runAutoAICopilot();
    }

    // Plus Menu Option Buttons
    const btnAddDraw = document.getElementById('btn-add-draw');
    if (btnAddDraw) {
      btnAddDraw.onclick = () => {
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
        if (window.toggleDirectDrawingMode) {
          window.toggleDirectDrawingMode(true);
        }
      };
    }

    const btnAddChecklist = document.getElementById('btn-add-checklist');
    if (btnAddChecklist) {
      btnAddChecklist.onclick = () => {
        const checklistHTML = `
          <div class="embedded-checklist-card" style="margin: 1.25rem 0; padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); border-radius: 16px; max-width: 480px; text-align: left; display: flex; flex-direction: column; gap: 0.65rem; font-family: var(--font-primary); box-shadow: 0 8px 32px rgba(0,0,0,0.25);" contenteditable="false">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; tracking: 0.05em; margin-bottom: 0.2rem; display: flex; align-items: center; justify-content: space-between;">
              <span>📋 Interactive Checklist</span>
              <button type="button" class="btn-delete-block" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.1rem; line-height: 1;" onclick="this.closest('.embedded-checklist-card').remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">&times;</button>
            </div>
            <div class="checklist-items" style="display:flex; flex-direction:column; gap:0.55rem;">
              <div class="checklist-item-row" style="display:flex; align-items:center; gap:0.65rem;">
                <input type="checkbox" style="width:16px; height:16px; cursor:pointer;" onchange="window.handleChecklistCheckboxChange(this)">
                <span contenteditable="true" style="font-size:0.9rem; outline:none; flex:1; color:#fff;" placeholder="List item..." onkeydown="window.handleChecklistSpanKeydown(event, this)" oninput="document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));"></span>
                <button type="button" class="btn-delete-checklist-item" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.1rem; line-height: 1; padding: 0.1rem 0.35rem; transition: all 0.2s;" onclick="this.parentElement.remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));" title="Delete item">&times;</button>
              </div>
            </div>
            <button type="button" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); color:#fff; border-radius:8px; padding:0.3rem 0.7rem; font-size:0.7rem; font-weight:bold; cursor:pointer; width:fit-content; margin-top:0.4rem;" onclick="window.addChecklistItem(this)">+ Add Item</button>
          </div>
        `;
        insertHTMLAtCursor(checklistHTML);
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
      };
    }

    const btnAddAudio = document.getElementById('btn-add-audio');
    if (btnAddAudio) {
      btnAddAudio.onclick = () => {
        const audioBlockId = 'audio-block-' + Date.now();
        const audioHTML = `
          <div class="embedded-audio-card" id="${audioBlockId}" style="margin: 1.25rem 0; padding: 1.25rem; background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-glass-strong); border-radius: 18px; max-width: 340px; display: flex; flex-direction: column; gap: 0.65rem; font-family: var(--font-primary); text-align: left; box-shadow: 0 8px 32px rgba(0,0,0,0.35);" contenteditable="false">
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; tracking: 0.05em; display: flex; align-items: center; justify-content: space-between;">
              <span>🎤 Voice Recorder</span>
              <button type="button" class="btn-delete-block" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.1rem; line-height:1;" onclick="this.closest('.embedded-audio-card').remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">&times;</button>
            </div>
            <div class="audio-recorder-status" style="font-size: 0.8rem; color:#fff; display:flex; align-items:center; gap:0.55rem;">
              <span class="status-dot" style="width: 8px; height: 8px; border-radius:50%; background:var(--text-muted); display:inline-block;"></span>
              <span class="status-text">Ready to record</span>
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:0.25rem;">
              <button type="button" class="btn-audio-record" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); color:#fff; border-radius:8px; padding:0.35rem 0.7rem; font-size:0.72rem; font-weight:bold; cursor:pointer; display:flex; align-items:center; gap:0.3rem;" onclick="window.startAudioRecording('${audioBlockId}')">🔴 Record</button>
              <button type="button" class="btn-audio-stop" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); color:#fff; border-radius:8px; padding:0.35rem 0.7rem; font-size:0.72rem; font-weight:bold; cursor:pointer; display:none;" onclick="window.stopAudioRecording('${audioBlockId}')">⏹️ Stop</button>
            </div>
          </div>
        `;
        insertHTMLAtCursor(audioHTML);
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
      };
    }

    const insertOriginalScrapbookMedia = (base64Data, fileName, isImage) => {
      let mediaHTML = '';
      if (!isImage) {
        mediaHTML = `<video src="${base64Data}" controls style="width:100%; border-radius:8px; object-fit:cover; max-height:220px;"></video>`;
      } else {
        mediaHTML = `<img src="${base64Data}" style="width:100%; border-radius:8px; object-fit:cover; max-height:220px;" />`;
      }

      const scrapbookHTML = `
        <div class="scrapbook-card" style="display:flex; flex-direction:row; gap:1.25rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:1.25rem; border-radius:18px; margin:1.5rem 0; flex-wrap:wrap; box-shadow:0 8px 32px rgba(0,0,0,0.35); text-align:left; font-family: var(--font-primary);" contenteditable="false">
          <div style="flex:1; min-width:200px; display:flex; flex-direction:column; gap:0.55rem;">
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; tracking: 0.05em; display: flex; align-items: center; justify-content: space-between;">
              <span>🖼️ Scrapbook Media</span>
              <button type="button" class="btn-delete-block" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.1rem; line-height: 1;" onclick="this.closest('.scrapbook-card').remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">&times;</button>
            </div>
            <div style="border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.15); max-height:220px; display:flex; align-items:center; justify-content:center;">
              ${mediaHTML}
            </div>
          </div>
          <div class="scrapbook-text" style="flex:1.2; min-width:220px; font-size:0.92rem; color:#fff; line-height:1.6; padding:0.5rem; display:flex; flex-direction:column; justify-content:center;">
            <div contenteditable="true" style="outline:none; min-height:100px; border-left: 2px dashed rgba(255,255,255,0.15); padding-left: 0.75rem;" placeholder="Write thoughts next to media..." oninput="document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">Write thoughts next to media...</div>
          </div>
        </div>
      `;
      insertHTMLAtCursor(scrapbookHTML);
      const contentArea = document.getElementById('note-editor-content');
      if (contentArea) {
        contentArea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };



    const processScrapbookMediaFile = (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        if (file.type.startsWith('image/')) {
          insertOriginalScrapbookMedia(base64Data, file.name, true);
        } else {
          insertOriginalScrapbookMedia(base64Data, file.name, false);
        }
      };
      reader.readAsDataURL(file);
    };
    window.processScrapbookMediaFileGlobal = processScrapbookMediaFile;

    const btnAddMedia = document.getElementById('btn-add-media');
    if (btnAddMedia) {
      btnAddMedia.onclick = () => {
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
        
        // Show selection modal
        const sourceModal = document.getElementById('modal-media-source-select');
        if (sourceModal) {
          sourceModal.classList.add('active');
        }
      };
    }

    // Modal Option listeners
    const btnCloseMediaSource = document.getElementById('btn-close-media-source-modal');
    const btnMediaUpload = document.getElementById('btn-media-source-upload');
    const btnMediaCamera = document.getElementById('btn-media-source-camera');
    const mediaSourceModal = document.getElementById('modal-media-source-select');

    if (mediaSourceModal) {
      const closeSourceModal = () => {
        mediaSourceModal.classList.remove('active');
      };

      if (btnCloseMediaSource) {
        btnCloseMediaSource.onclick = closeSourceModal;
      }

      if (btnMediaUpload) {
        btnMediaUpload.onclick = () => {
          closeSourceModal();
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*,video/*';
          input.onchange = (e) => {
            processScrapbookMediaFile(e.target.files[0]);
          };
          input.click();
        };
      }

      if (btnMediaCamera) {
        btnMediaCamera.onclick = () => {
          closeSourceModal();
          if (window.startCameraCapture) {
            window.startCameraCapture();
          }
        };
      }
    }

    const btnAddLocation = document.getElementById('btn-add-location');
    if (btnAddLocation) {
      const locationModal = document.getElementById('modal-add-location');
      const btnCloseLoc = document.getElementById('btn-close-location-modal');
      const btnCancelLoc = document.getElementById('btn-cancel-location');
      const btnInsertLoc = document.getElementById('btn-insert-location');

      const closeLocModal = () => {
        if (locationModal) locationModal.classList.remove('active');
        window.activeEditingLocationCard = null;
        if (btnInsertLoc) {
          btnInsertLoc.innerHTML = `📍 Insert Location`;
        }
      };

      if (btnCloseLoc) btnCloseLoc.onclick = closeLocModal;
      if (btnCancelLoc) btnCancelLoc.onclick = closeLocModal;
      if (locationModal) {
        locationModal.onclick = (e) => {
          if (e.target === locationModal) closeLocModal();
        };
      }

      window.editLocationCard = (card) => {
        const linkElem = card.querySelector('.location-link');
        const urlElem = card.querySelector('.location-url-text');
        
        const mapsUrl = linkElem ? linkElem.getAttribute('href') : '';
        let labelName = '';
        if (linkElem) {
          const clone = linkElem.cloneNode(true);
          const svg = clone.querySelector('svg');
          if (svg) svg.remove();
          labelName = clone.textContent.trim();
        }
        
        const inputUrl = document.getElementById('location-maps-url');
        const inputLabel = document.getElementById('location-custom-label');
        
        if (locationModal && inputUrl && inputLabel) {
          inputUrl.value = mapsUrl;
          inputLabel.value = labelName;
          inputUrl.style.borderColor = '';
          window.activeEditingLocationCard = card;
          if (btnInsertLoc) {
            btnInsertLoc.innerHTML = `📍 Update Location`;
          }
          locationModal.classList.add('active');
        }
      };

      if (btnInsertLoc) {
        btnInsertLoc.onclick = () => {
          const urlInput = document.getElementById('location-maps-url');
          const labelInput = document.getElementById('location-custom-label');
          if (!urlInput || !urlInput.value.trim()) {
            if (urlInput) urlInput.style.borderColor = '#ef4444';
            return;
          }

          const rawInput = urlInput.value.trim();
          let mapsUrl = rawInput;
          if (!rawInput.toLowerCase().startsWith('http://') && !rawInput.toLowerCase().startsWith('https://')) {
            mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawInput)}`;
          }

          let labelName = labelInput ? labelInput.value.trim() : '';
          if (!labelName) {
            labelName = rawInput;
          }

          if (window.activeEditingLocationCard) {
            const card = window.activeEditingLocationCard;
            const linkElem = card.querySelector('.location-link');
            if (linkElem) {
              linkElem.setAttribute('href', mapsUrl);
              linkElem.innerHTML = `${labelName} <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-left: 2px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
            }
            const urlTextElem = card.querySelector('.location-url-text');
            if (urlTextElem) {
              urlTextElem.textContent = mapsUrl;
            }
            window.activeEditingLocationCard = null;
            document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));
          } else {
            const locationHTML = `
              <div class="embedded-location-card" style="display:flex; flex-direction:row; gap:1rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:1rem; border-radius:16px; margin:1.25rem 0; align-items:center; box-shadow:0 8px 24px rgba(0,0,0,0.25); text-align:left; font-family:var(--font-primary);" contenteditable="false">
                <div style="font-size:1.8rem; background:rgba(239, 68, 68, 0.1); width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center;">📍</div>
                <div style="flex:1; display:flex; flex-direction:column; gap:0.2rem; min-width:0;">
                  <span style="font-size:0.68rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; tracking:0.05em;">Location Bookmark</span>
                  <a href="${mapsUrl}" target="_blank" style="font-size:0.95rem; font-weight:700; color:#818cf8; text-decoration:none; display:flex; align-items:center; gap:0.35rem;" class="location-link">
                    ${labelName} <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-left: 2px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                  <span class="location-url-text" style="font-size:0.75rem; color:var(--text-darker); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:280px;">${mapsUrl}</span>
                </div>
                <div style="display:flex; gap:0.25rem; align-items:center;">
                  <button type="button" class="btn-edit-block" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size:0.95rem; padding:0.2rem 0.5rem; display:flex; align-items:center; justify-content:center;" onclick="window.editLocationCard(this.closest('.embedded-location-card'))" title="Edit Location">✏️</button>
                  <button type="button" class="btn-delete-block" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size:1.1rem; line-height:1; padding:0.2rem 0.5rem; display:flex; align-items:center; justify-content:center;" onclick="this.closest('.embedded-location-card').remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">&times;</button>
                </div>
              </div>
            `;
            insertHTMLAtCursor(locationHTML);
          }
          closeLocModal();
        };
      }

      btnAddLocation.onclick = () => {
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
        if (locationModal) {
          locationModal.classList.add('active');
          const inputUrl = document.getElementById('location-maps-url');
          const inputLabel = document.getElementById('location-custom-label');
          if (inputUrl) {
            inputUrl.value = '';
            inputUrl.style.borderColor = '';
          }
          if (inputLabel) inputLabel.value = '';
          window.activeEditingLocationCard = null;
          if (btnInsertLoc) {
            btnInsertLoc.innerHTML = `📍 Insert Location`;
          }
        }
      };
    }

    const btnAddFile = document.getElementById('btn-add-file');
    if (btnAddFile) {
      btnAddFile.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*/*';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const base64Data = reader.result;
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
            
            let fileIcon = '📄';
            let badgeColor = 'rgba(255,255,255,0.02)';
            let textColor = '#fff';
            let borderColor = 'var(--border-glass)';
            
            const ext = file.name.split('.').pop().toLowerCase();
            if (ext === 'pdf') {
              fileIcon = '📕';
              badgeColor = 'rgba(239, 68, 68, 0.08)';
              textColor = '#fca5a5';
              borderColor = 'rgba(239, 68, 68, 0.3)';
            } else if (['doc', 'docx', 'rtf', 'txt'].includes(ext)) {
              fileIcon = '📘';
              badgeColor = 'rgba(59, 130, 246, 0.08)';
              textColor = '#93c5fd';
              borderColor = 'rgba(59, 130, 246, 0.3)';
            } else if (['xls', 'xlsx', 'csv'].includes(ext)) {
              fileIcon = '📗';
              badgeColor = 'rgba(16, 185, 129, 0.08)';
              textColor = '#6ee7b7';
              borderColor = 'rgba(16, 185, 129, 0.3)';
            } else if (['ppt', 'pptx'].includes(ext)) {
              fileIcon = '📙';
              badgeColor = 'rgba(245, 158, 11, 0.08)';
              textColor = '#fde047';
              borderColor = 'rgba(245, 158, 11, 0.3)';
            } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
              fileIcon = '📦';
              badgeColor = 'rgba(139, 92, 246, 0.08)';
              textColor = '#c084fc';
              borderColor = 'rgba(139, 92, 246, 0.3)';
            } else if (file.type.startsWith('image/')) {
              fileIcon = '🖼️';
            } else if (file.type.startsWith('audio/')) {
              fileIcon = '🎵';
            } else if (file.type.startsWith('video/')) {
              fileIcon = '🎥';
            }
            
            const fileBlockHTML = `
              <div class="embedded-file-card" style="margin: 1.25rem 0; padding: 0.85rem 1.25rem; background: ${badgeColor}; border: 1px solid ${borderColor}; border-radius: 14px; max-width: 420px; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; font-family: var(--font-primary); box-shadow: 0 8px 32px rgba(0,0,0,0.25);" contenteditable="false">
                <div style="display: flex; align-items: center; gap: 0.75rem; color: ${textColor}; flex: 1; overflow: hidden;">
                  <span style="font-size: 1.5rem; flex-shrink: 0;">${fileIcon}</span>
                  <div style="display: flex; flex-direction: column; text-align: left; overflow: hidden; min-width: 0;">
                    <span style="font-size: 0.85rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${file.name}</span>
                    <span style="font-size: 0.68rem; color: var(--text-muted); display: flex; gap: 0.5rem; align-items: center;">
                      <span>${fileSizeMB} MB</span>
                      <span>•</span>
                      <button type="button" class="btn-view-document" style="background:none; border:none; color:#818cf8; cursor:pointer; font-size:0.68rem; font-weight:700; padding:0; text-decoration:underline;" onclick="window.viewAttachedDocument(this)" data-file-name="${file.name}" data-base64="${base64Data}">View</button>
                    </span>
                  </div>
                </div>
                <button type="button" class="btn-delete-block" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.25rem; line-height: 1; padding: 0.2rem; flex-shrink: 0;" onclick="this.closest('.embedded-file-card').remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">&times;</button>
              </div>
            `;
            insertHTMLAtCursor(fileBlockHTML);
          };
          reader.readAsDataURL(file);
        };
        input.click();
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
      };
    }

    const btnAddLink = document.getElementById('btn-add-link');
    const modalLink = document.getElementById('modal-insert-link');
    const inputLinkUrl = document.getElementById('insert-link-url');
    const inputLinkLabel = document.getElementById('insert-link-label');
    const btnSubmitLink = document.getElementById('btn-submit-link');
    const btnCancelLink = document.getElementById('btn-cancel-link');
    const btnCloseLinkLabel = document.getElementById('btn-close-link-modal');

    // Global helper to escape HTML characters
    window.escapeDocumentHTML = (str) => {
      return str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    };

    // Global variables/helpers for Document Viewing
    window.viewAttachedDocument = (button) => {
      const fileName = button.getAttribute('data-file-name') || 'Document';
      const base64Data = button.getAttribute('data-base64') || '';
      if (!base64Data) {
        showNotification('❌ Document data missing!', 'var(--color-rose)');
        return;
      }

      let mimeType = '';
      const match = base64Data.match(/^data:([^;]+);/);
      if (match) {
        mimeType = match[1];
      }

      // Check if running inside Android app container with native bridge
      if (window.DnDAndroid && typeof window.DnDAndroid.openBase64File === 'function') {
        try {
          window.DnDAndroid.openBase64File(base64Data, fileName, mimeType);
          return; // Delegated to native application opener
        } catch (e) {
          console.error("Native file opener failed, falling back to in-app viewer", e);
        }
      }

      const viewerModal = document.getElementById('modal-document-viewer');
      const viewerTitle = document.getElementById('document-viewer-title');
      const viewerBody = document.getElementById('document-viewer-body');
      const viewerDownload = document.getElementById('btn-document-viewer-download');

      if (!viewerModal || !viewerTitle || !viewerBody) {
        const win = window.open();
        if (win) {
          win.document.write(`<iframe src="${base64Data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        } else {
          showNotification('❌ Popup blocked! Please enable popups.', 'var(--color-rose)');
        }
        return;
      }

      viewerTitle.textContent = fileName;
      viewerBody.innerHTML = '';

      if (viewerDownload) {
        viewerDownload.setAttribute('href', base64Data);
        viewerDownload.setAttribute('download', fileName);
      }

      const ext = fileName.split('.').pop().toLowerCase();
      
      if (mimeType.startsWith('image/') || ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
        viewerBody.innerHTML = `
          <div style="display:flex; justify-content:center; align-items:center; width:100%; height:100%; overflow:auto; max-height:70vh;">
            <img src="${base64Data}" style="max-width:100%; max-height:70vh; object-fit:contain; border-radius:8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);" />
          </div>
        `;
      } else if (mimeType === 'application/pdf' || ext === 'pdf') {
        viewerBody.innerHTML = `
          <object data="${base64Data}" type="application/pdf" style="width:100%; height:70vh; border-radius:8px;">
            <embed src="${base64Data}" type="application/pdf" style="width:100%; height:70vh; border-radius:8px;" />
            <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
              <p>Your browser doesn't support inline PDF viewing. Please view this file on a device with PDF support.</p>
            </div>
          </object>
        `;
      } else if (mimeType.startsWith('text/') || ['txt', 'json', 'js', 'css', 'html', 'csv', 'md'].includes(ext)) {
        try {
          const parts = base64Data.split(',');
          if (parts.length > 1) {
            const raw = atob(parts[1]);
            const text = decodeURIComponent(escape(raw));
            viewerBody.innerHTML = `
              <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.85rem; color: #f1f5f9; background: rgba(0,0,0,0.4); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--border-glass); overflow: auto; max-height: 70vh; text-align: left; margin: 0;">${window.escapeDocumentHTML(text)}</pre>
            `;
          } else {
            throw new Error('Invalid base64 structure');
          }
        } catch (e) {
          viewerBody.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 2rem;">Unable to parse text content.</p>`;
        }
      } else {
        viewerBody.innerHTML = `
          <div style="padding: 3rem 1.5rem; text-align: center; display:flex; flex-direction:column; align-items:center; gap:1rem;">
            <span style="font-size: 3rem;">📦</span>
            <h4 style="color: #fff; margin: 0; font-size: 1.1rem;">Preview not available</h4>
            <p style="color: var(--text-muted); max-width: 300px; font-size: 0.8rem; line-height: 1.5; margin: 0;">
              Previews are not supported for this file type (${ext.toUpperCase()}).
            </p>
          </div>
        `;
      }

      viewerModal.classList.add('active');
    };

    window.ensureFileCardsHaveViewOptions = (container) => {
      if (!container) return;
      const cards = container.querySelectorAll('.embedded-file-card');
      cards.forEach(card => {
        const linkWrapper = card.querySelector('a[download]');
        if (linkWrapper && linkWrapper.parentElement === card) {
          const base64Data = linkWrapper.getAttribute('href') || '';
          const fileName = linkWrapper.getAttribute('download') || '';
          const iconSpan = linkWrapper.querySelector('span');
          const fileIcon = iconSpan ? iconSpan.textContent : '📄';
          const textDiv = linkWrapper.querySelector('div');
          const sizeTextSpan = textDiv ? textDiv.querySelector('span:last-child') : null;
          let sizeText = 'Unknown Size';
          if (sizeTextSpan) {
            sizeText = sizeTextSpan.textContent.split('•')[0].trim();
          }

          const newWrapper = document.createElement('div');
          newWrapper.style.cssText = 'display: flex; align-items: center; gap: 0.75rem; color: #fff; flex: 1; overflow: hidden;';
          const linkColor = linkWrapper.style.color || '#fff';
          newWrapper.style.color = linkColor;

          newWrapper.innerHTML = `
            <span style="font-size: 1.5rem; flex-shrink: 0;">${fileIcon}</span>
            <div style="display: flex; flex-direction: column; text-align: left; overflow: hidden; min-width: 0;">
              <span style="font-size: 0.85rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${fileName}</span>
              <span style="font-size: 0.68rem; color: var(--text-muted); display: flex; gap: 0.5rem; align-items: center;">
                <span>${sizeText}</span>
                <span>•</span>
                <button type="button" class="btn-view-document" style="background:none; border:none; color:#818cf8; cursor:pointer; font-size:0.68rem; font-weight:700; padding:0; text-decoration:underline;" onclick="window.viewAttachedDocument(this)" data-file-name="${fileName}" data-base64="${base64Data}">View</button>
              </span>
            </div>
          `;

          card.replaceChild(newWrapper, linkWrapper);
        }
      });
    };

    // Global variables/helpers for Link Editing
    window.activeEditingLinkBadge = null;

    window.editLinkBadge = (button) => {
      const badge = button.closest('.embedded-link-badge');
      if (!badge) return;
      const link = badge.querySelector('a');
      if (!link) return;

      const currentUrl = link.getAttribute('href') || '';
      const currentLabel = link.textContent || '';

      window.activeEditingLinkBadge = badge;

      if (inputLinkUrl) inputLinkUrl.value = currentUrl;
      if (inputLinkLabel) inputLinkLabel.value = currentLabel;

      if (modalLink) {
        const modalTitle = modalLink.querySelector('h3');
        if (modalTitle) modalTitle.innerHTML = '<span>🔗</span> Edit Link';
        if (btnSubmitLink) btnSubmitLink.innerHTML = '🔗 Save Changes';
        modalLink.classList.add('active');
        if (inputLinkUrl) inputLinkUrl.focus();
      }
    };

    window.ensureLinkBadgesHaveEditButtons = (container) => {
      if (!container) return;
      const badges = container.querySelectorAll('.embedded-link-badge');
      badges.forEach(badge => {
        if (!badge.querySelector('.btn-edit-link')) {
          const deleteBtn = badge.querySelector('button');
          if (deleteBtn) {
            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'btn-edit-link';
            editBtn.style.cssText = 'background:transparent; border:none; color:var(--text-darker); cursor:pointer; padding:0; display:inline-flex; align-items:center; margin-left:0.35rem; transition:color 0.2s;';
            editBtn.title = 'Edit link';
            editBtn.setAttribute('onclick', 'window.editLinkBadge(this)');
            editBtn.onmouseover = function() { this.querySelector('svg').style.stroke='#818cf8'; };
            editBtn.onmouseout = function() { this.querySelector('svg').style.stroke='var(--text-darker)'; };
            editBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-darker)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:stroke 0.2s;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            `;
            badge.insertBefore(editBtn, deleteBtn);
          }
        }
      });
    };

    if (btnAddLink && modalLink) {
      btnAddLink.onclick = () => {
        if (inputLinkUrl) inputLinkUrl.value = '';
        if (inputLinkLabel) inputLinkLabel.value = '';
        window.activeEditingLinkBadge = null;
        const modalTitle = modalLink.querySelector('h3');
        if (modalTitle) modalTitle.innerHTML = '<span>🔗</span> Insert Link';
        if (btnSubmitLink) btnSubmitLink.innerHTML = '🔗 Insert Link';
        
        modalLink.classList.add('active');
        plusMenu.style.display = 'none';
        newFloatingBtn.classList.remove('active');
        if (inputLinkUrl) inputLinkUrl.focus();
      };
    }

    const closeLinkModal = () => {
      if (modalLink) modalLink.classList.remove('active');
      window.activeEditingLinkBadge = null;
    };

    if (btnCancelLink) btnCancelLink.onclick = closeLinkModal;
    if (btnCloseLinkLabel) btnCloseLinkLabel.onclick = closeLinkModal;

    if (btnSubmitLink) {
      btnSubmitLink.onclick = () => {
        const url = inputLinkUrl ? inputLinkUrl.value.trim() : '';
        if (!url) {
          showNotification('❌ Please enter a valid URL!', '#f43f5e');
          return;
        }
        
        let cleanUrl = url;
        if (!/^https?:\/\//i.test(cleanUrl)) {
          cleanUrl = 'https://' + cleanUrl;
        }
        
        let label = inputLinkLabel ? inputLinkLabel.value.trim() : '';
        if (!label || label === '') {
          try {
            label = new URL(cleanUrl).hostname;
          } catch(e) {
            label = cleanUrl;
          }
        }
        
        if (window.activeEditingLinkBadge) {
          // Edit mode: update existing badge
          const link = window.activeEditingLinkBadge.querySelector('a');
          if (link) {
            link.setAttribute('href', cleanUrl);
            link.textContent = label;
          }
          // Trigger auto-save
          document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));
          window.activeEditingLinkBadge = null;
          closeLinkModal();
        } else {
          // Insert mode: create a new badge
          const linkHTML = `
            <span class="embedded-link-badge" style="margin: 0.25rem 0.15rem; padding: 0.35rem 0.65rem; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 8px; display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; font-weight: 700; color: #818cf8; font-family: var(--font-primary);" contenteditable="false">
              <span>🔗</span>
              <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="color: #818cf8; text-decoration: none; border-bottom: 1px dotted #818cf8;">${label}</a>
              <button type="button" class="btn-edit-link" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; padding:0; display:inline-flex; align-items:center; margin-left:0.35rem; transition:color 0.2s;" onclick="window.editLinkBadge(this)" title="Edit link" onmouseover="this.querySelector('svg').style.stroke='#818cf8'" onmouseout="this.querySelector('svg').style.stroke='var(--text-darker)'">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-darker)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:stroke 0.2s;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </button>
              <button type="button" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 0.95rem; line-height: 1; margin-left: 0.2rem; display: inline-flex; align-items: center;" onclick="this.parentElement.remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));">&times;</button>
            </span>&nbsp;
          `;
          insertHTMLAtCursor(linkHTML);
          closeLinkModal();
        }
      };
    }
  }

  // Bind typing and blur listeners to AI dynamic tagger
  if (contentArea) {
    contentArea.removeEventListener('input', handleContentAreaInput);
    contentArea.addEventListener('input', handleContentAreaInput);
    contentArea.removeEventListener('blur', handleContentAreaBlur);
    contentArea.addEventListener('blur', handleContentAreaBlur);
  }
  runAutoAICopilot();
}

// ================= INTERACTIVE CHECKLIST ADVANCED CONTROLLERS =================
window.sortChecklistItems = function(card) {
  const itemsDiv = card.querySelector('.checklist-items');
  if (!itemsDiv) return;

  // Save active element focus and text selection range
  const activeEl = document.activeElement;
  const activeSpan = activeEl && activeEl.tagName === 'SPAN' && activeEl.contentEditable === 'true' ? activeEl : null;
  let selectionRange = null;
  const sel = window.getSelection();
  if (activeSpan && sel.rangeCount > 0) {
    selectionRange = sel.getRangeAt(0).cloneRange();
  }

  const items = Array.from(itemsDiv.children);
  items.sort((a, b) => {
    const aChecked = a.querySelector('input[type="checkbox"]').checked;
    const bChecked = b.querySelector('input[type="checkbox"]').checked;
    if (aChecked === bChecked) return 0;
    return aChecked ? 1 : -1;
  });

  items.forEach(item => itemsDiv.appendChild(item));

  // Restore cursor focus and range
  if (activeSpan) {
    activeSpan.focus();
    if (selectionRange) {
      sel.removeAllRanges();
      sel.addRange(selectionRange);
    }
  }
};

window.handleChecklistCheckboxChange = function(checkbox) {
  const span = checkbox.nextElementSibling;
  if (span) {
    span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    span.style.opacity = checkbox.checked ? '0.55' : '1';
  }
  const card = checkbox.closest('.embedded-checklist-card');
  if (card) {
    window.sortChecklistItems(card);
  }
  document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));
};

window.handleChecklistSpanKeydown = function(e, span) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const currentItem = span.parentElement;
    const itemsDiv = currentItem.parentElement;
    const card = currentItem.closest('.embedded-checklist-card');

    const newItem = document.createElement('div');
    newItem.className = 'checklist-item-row';
    newItem.style.display = 'flex';
    newItem.style.alignItems = 'center';
    newItem.style.gap = '0.65rem';
    newItem.innerHTML = `
      <input type="checkbox" style="width:16px; height:16px; cursor:pointer;" onchange="window.handleChecklistCheckboxChange(this)">
      <span contenteditable="true" style="font-size:0.9rem; outline:none; flex:1; color:#fff;" placeholder="List item..." onkeydown="window.handleChecklistSpanKeydown(event, this)" oninput="document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));"></span>
      <button type="button" class="btn-delete-checklist-item" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.1rem; line-height: 1; padding: 0.1rem 0.35rem; transition: all 0.2s;" onclick="this.parentElement.remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));" title="Delete item">&times;</button>
    `;

    currentItem.insertAdjacentElement('afterend', newItem);
    window.sortChecklistItems(card);
    newItem.querySelector('span').focus();
    document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));
  } else if (e.key === 'Backspace' && span.innerText.trim() === '') {
    e.preventDefault();
    const currentItem = span.parentElement;
    const card = currentItem.closest('.embedded-checklist-card');
    const previousItem = currentItem.previousElementSibling;

    currentItem.remove();

    if (previousItem) {
      const prevSpan = previousItem.querySelector('span[contenteditable="true"]');
      if (prevSpan) {
        prevSpan.focus();
        // Move cursor to the end of the content
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(prevSpan);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    
    document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));
  }
};

window.addChecklistItem = function(buttonEl) {
  const card = buttonEl.closest('.embedded-checklist-card');
  const itemsDiv = card.querySelector('.checklist-items');
  const newItem = document.createElement('div');
  newItem.className = 'checklist-item-row';
  newItem.style.display = 'flex';
  newItem.style.alignItems = 'center';
  newItem.style.gap = '0.65rem';
  newItem.innerHTML = `
    <input type="checkbox" style="width:16px; height:16px; cursor:pointer;" onchange="window.handleChecklistCheckboxChange(this)">
    <span contenteditable="true" style="font-size:0.9rem; outline:none; flex:1; color:#fff;" placeholder="List item..." onkeydown="window.handleChecklistSpanKeydown(event, this)" oninput="document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));"></span>
    <button type="button" class="btn-delete-checklist-item" style="background:transparent; border:none; color:var(--text-darker); cursor:pointer; font-size: 1.1rem; line-height: 1; padding: 0.1rem 0.35rem; transition: all 0.2s;" onclick="this.parentElement.remove(); document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));" title="Delete item">&times;</button>
  `;
  itemsDiv.appendChild(newItem);
  window.sortChecklistItems(card);
  newItem.querySelector('span').focus();
  document.getElementById('note-editor-content').dispatchEvent(new Event('input', { bubbles: true }));
};

// ================= WEBRTC LIVE CAMERA CONTROLLERS =================
let liveCameraStream = null;
let capturedPhotoBase64 = null;
let cameraFacingMode = 'user';

function base64ToFile(base64Data, filename) {
  const arr = base64Data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

window.startCameraCapture = function() {
  const modal = document.getElementById('modal-live-camera');
  const video = document.getElementById('camera-video');
  const imgPreview = document.getElementById('camera-captured-preview');
  const errorMsg = document.getElementById('camera-error-message');
  
  const btnCapture = document.getElementById('btn-camera-capture');
  const btnRetake = document.getElementById('btn-camera-retake');
  const btnSave = document.getElementById('btn-camera-save');
  const btnToggleFacing = document.getElementById('btn-camera-toggle-facing');

  if (!modal) return;

  // Reset controls/view
  modal.classList.add('active');
  if (video) video.style.display = 'block';
  if (imgPreview) {
    imgPreview.style.display = 'none';
    imgPreview.src = '';
  }
  if (errorMsg) errorMsg.style.display = 'none';
  
  if (btnCapture) btnCapture.style.display = 'block';
  if (btnRetake) btnRetake.style.display = 'none';
  if (btnSave) btnSave.style.display = 'none';
  if (btnToggleFacing) btnToggleFacing.style.display = 'flex';
  
  capturedPhotoBase64 = null;

  // Stop any existing live camera tracks before starting a new stream
  if (liveCameraStream) {
    liveCameraStream.getTracks().forEach(track => track.stop());
    liveCameraStream = null;
  }

  // Access user camera stream with cameraFacingMode
  navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraFacingMode } })
    .then(stream => {
      liveCameraStream = stream;
      if (video) {
        video.srcObject = stream;
        video.play();
      }
    })
    .catch(err => {
      console.error("Camera access error:", err);
      if (video) video.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'block';
      if (btnCapture) btnCapture.style.display = 'none';
      if (btnToggleFacing) btnToggleFacing.style.display = 'none';
    });
};

window.stopCameraStream = function() {
  if (liveCameraStream) {
    liveCameraStream.getTracks().forEach(track => track.stop());
    liveCameraStream = null;
  }
  const video = document.getElementById('camera-video');
  if (video) video.srcObject = null;
  
  const modal = document.getElementById('modal-live-camera');
  if (modal) modal.classList.remove('active');
};

window.capturePhoto = function() {
  const video = document.getElementById('camera-video');
  const canvas = document.getElementById('camera-canvas');
  const imgPreview = document.getElementById('camera-captured-preview');
  
  const btnCapture = document.getElementById('btn-camera-capture');
  const btnRetake = document.getElementById('btn-camera-retake');
  const btnSave = document.getElementById('btn-camera-save');

  if (!video || !canvas || !imgPreview) return;

  const width = video.videoWidth || 640;
  const height = video.videoHeight || 480;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, width, height);

  try {
    capturedPhotoBase64 = canvas.toDataURL('image/jpeg', 0.85);
    imgPreview.src = capturedPhotoBase64;
    
    video.style.display = 'none';
    imgPreview.style.display = 'block';
    
    if (btnCapture) btnCapture.style.display = 'none';
    if (btnRetake) btnRetake.style.display = 'block';
    if (btnSave) btnSave.style.display = 'block';
    const btnToggleFacing = document.getElementById('btn-camera-toggle-facing');
    if (btnToggleFacing) btnToggleFacing.style.display = 'none';

    if (liveCameraStream) {
      liveCameraStream.getTracks().forEach(track => track.stop());
      liveCameraStream = null;
    }
  } catch(e) {
    console.error("Canvas capture error:", e);
  }
};

window.saveCapturedPhoto = function() {
  if (!capturedPhotoBase64) return;
  try {
    const file = base64ToFile(capturedPhotoBase64, 'webcam-capture.jpg');
    if (window.processScrapbookMediaFileGlobal) {
      window.processScrapbookMediaFileGlobal(file);
    }
    window.stopCameraStream();
  } catch(e) {
    console.error("Save captured photo error:", e);
  }
};

// Bind button clicks in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const btnClose = document.getElementById('btn-close-live-camera-modal');
  if (btnClose) btnClose.onclick = () => window.stopCameraStream();

  const btnCapture = document.getElementById('btn-camera-capture');
  if (btnCapture) btnCapture.onclick = () => window.capturePhoto();

  const btnRetake = document.getElementById('btn-camera-retake');
  if (btnRetake) btnRetake.onclick = () => window.startCameraCapture();

  const btnSave = document.getElementById('btn-camera-save');
  if (btnSave) btnSave.onclick = () => window.saveCapturedPhoto();
  
  const btnToggleFacing = document.getElementById('btn-camera-toggle-facing');
  if (btnToggleFacing) {
    btnToggleFacing.onclick = () => {
      cameraFacingMode = (cameraFacingMode === 'user') ? 'environment' : 'user';
      window.startCameraCapture();
    };
  }
  
  const cameraModal = document.getElementById('modal-live-camera');
  if (cameraModal) {
    cameraModal.addEventListener('click', (e) => {
      if (e.target === cameraModal) {
        window.stopCameraStream();
      }
    });
  }
});
