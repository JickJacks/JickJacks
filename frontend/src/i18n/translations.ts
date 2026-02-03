// src/i18n/translations.ts

export type Language = "it" | "en" | "es" | "fr";

export const translations = {
  // ─── HEADER ───
  header_search_placeholder: {
    it: "Cerca il tuo gioco...",
    en: "Search for your game...",
    es: "Busca tu juego...",
    fr: "Recherche votre jeu...",
  },
  header_search_label: {
    it: "Cerca gioco",
    en: "Search game",
    es: "Buscar juego",
    fr: "Rechercher jeu",
  },
  header_clear_search: {
    it: "Cancella ricerca",
    en: "Clear search",
    es: "Limpiar búsqueda",
    fr: "Effacer la recherche",
  },
  header_open_filters: {
    it: "Apri filtri",
    en: "Open filters",
    es: "Abrir filtros",
    fr: "Ouvrir les filtres",
  },
  header_wishlist: {
    it: "Wishlist",
    en: "Wishlist",
    es: "Lista de deseos",
    fr: "Liste de souhaits",
  },

  // ─── HOME PAGE ───
  home_error_loading: {
    it: "Errore nel caricamento dei dati.",
    en: "Error loading data.",
    es: "Error al cargar los datos.",
    fr: "Erreur lors du chargement des données.",
  },
  home_retry: {
    it: "Riprova",
    en: "Try again",
    es: "Intentar de nuevo",
    fr: "Réessayer",
  },
  home_showing_games: {
    it: "Mostrando {shown} di {total} giochi",
    en: "Showing {shown} of {total} games",
    es: "Mostrando {shown} de {total} juegos",
    fr: "Affichage de {shown} sur {total} jeux",
  },
  home_no_games_found: {
    it: "Nessun gioco trovato. Prova con un'altra ricerca.",
    en: "No games found. Try a different search.",
    es: "No se encontraron juegos. Intenta otra búsqueda.",
    fr: "Aucun jeu trouvé. Essayez une autre recherche.",
  },
  home_load_more: {
    it: "Carica altri",
    en: "Load more",
    es: "Cargar más",
    fr: "Charger plus",
  },
  home_load_more_label: {
    it: "Carica altri giochi",
    en: "Load more games",
    es: "Cargar más juegos",
    fr: "Charger plus de jeux",
  },

  // ─── PROFILE PAGE — HEADER CARD ───
  profile_games_in_wishlist: {
    it: "giochi in wishlist",
    en: "games in wishlist",
    es: "juegos en lista de deseos",
    fr: "jeux dans la liste de souhaits",
  },
  profile_active_alerts: {
    it: "alert attivi",
    en: "active alerts",
    es: "alertas activas",
    fr: "alertes actives",
  },

  // ─── PROFILE PAGE — TABS ───
  tab_price_alerts: {
    it: "Price Alerts",
    en: "Price Alerts",
    es: "Alertas de precio",
    fr: "Alertes prix",
  },
  tab_wishlist: {
    it: "Wishlist",
    en: "Wishlist",
    es: "Lista de deseos",
    fr: "Liste de souhaits",
  },
  tab_settings: {
    it: "Settings",
    en: "Settings",
    es: "Configuración",
    fr: "Paramètres",
  },

  // ─── PRICE ALERTS TAB ───
  alerts_new_alert: {
    it: "New Alert",
    en: "New Alert",
    es: "Nueva alerta",
    fr: "Nouvelle alerte",
  },
  alerts_empty_title: {
    it: "Nessun alert attivo",
    en: "No active alerts",
    es: "Sin alertas activas",
    fr: "Aucune alerte active",
  },
  alerts_empty_subtitle: {
    it: "Aggiungi un alert per essere notificato sui cali di prezzo.",
    en: "Add an alert to be notified about price drops.",
    es: "Agrega una alerta para ser notificado sobre caídas de precio.",
    fr: "Ajoutez une alerte pour être notifié des baissez de prix.",
  },
  alerts_add_first: {
    it: "Aggiungi il primo alert",
    en: "Add your first alert",
    es: "Agregar primera alerta",
    fr: "Ajouter la première alerte",
  },
  alerts_target: {
    it: "Target:",
    en: "Target:",
    es: "Objetivo:",
    fr: "Cible :",
  },
  alerts_current: {
    it: "Attuale:",
    en: "Current:",
    es: "Actual:",
    fr: "Actuel :",
  },
  alerts_percent_of_target: {
    it: "% del target",
    en: "% of target",
    es: "% del objetivo",
    fr: "% de la cible",
  },
  alerts_price_reached: {
    it: "🎉 Prezzo raggiunto!",
    en: "🎉 Price reached!",
    es: "🎉 ¡Precio alcanzado!",
    fr: "🎉 Prix atteint !",
  },
  alerts_edit: {
    it: "Modifica",
    en: "Edit",
    es: "Editar",
    fr: "Modifier",
  },
  alerts_are_you_sure: {
    it: "Sei sicuro?",
    en: "Are you sure?",
    es: "¿Estás seguro?",
    fr: "Êtes-vous sûr ?",
  },
  alerts_yes: {
    it: "Sì",
    en: "Yes",
    es: "Sí",
    fr: "Oui",
  },
  alerts_no: {
    it: "No",
    en: "No",
    es: "No",
    fr: "Non",
  },
  alerts_deleted_toast: {
    it: "Alert eliminato",
    en: "Alert deleted",
    es: "Alerta eliminada",
    fr: "Alerte supprimée",
  },

  // ─── ALERT MODAL ───
  modal_edit_alert: {
    it: "Modifica alert",
    en: "Edit alert",
    es: "Editar alerta",
    fr: "Modifier l'alerte",
  },
  modal_create_alert: {
    it: "Crea nuovo alert",
    en: "Create new alert",
    es: "Crear nueva alerta",
    fr: "Créer nouvelle alerte",
  },
  modal_search_game: {
    it: "Cerca gioco",
    en: "Search game",
    es: "Buscar juego",
    fr: "Rechercher jeu",
  },
  modal_search_by_title: {
    it: "Cerca per titolo...",
    en: "Search by title...",
    es: "Buscar por título...",
    fr: "Rechercher par titre...",
  },
  modal_target_price: {
    it: "Target price",
    en: "Target price",
    es: "Precio objetivo",
    fr: "Prix cible",
  },
  modal_stores: {
    it: "Stores",
    en: "Stores",
    es: "Tiendas",
    fr: "Magasins",
  },
  modal_cancel: {
    it: "Cancel",
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
  },
  modal_save_alert: {
    it: "Save Alert",
    en: "Save Alert",
    es: "Guardar alerta",
    fr: "Sauvegarder l'alerte",
  },
  modal_alert_updated_toast: {
    it: "Alert aggiornato ✓",
    en: "Alert updated ✓",
    es: "Alerta actualizada ✓",
    fr: "Alerte mise à jour ✓",
  },
  modal_alert_created_toast: {
    it: "Alert creato ✓",
    en: "Alert created ✓",
    es: "Alerta creada ✓",
    fr: "Alerte créée ✓",
  },
  modal_select_game_and_price: {
    it: "Seleziona un gioco e inserisci un prezzo target.",
    en: "Select a game and enter a target price.",
    es: "Selecciona un juego e ingresa un precio objetivo.",
    fr: "Sélectionnez un jeu et entrez un prix cible.",
  },

  // ─── WISHLIST TAB ───
  wishlist_sort_by: {
    it: "Sort by:",
    en: "Sort by:",
    es: "Ordenar por:",
    fr: "Trier par :",
  },
  wishlist_sort_name: {
    it: "Nome",
    en: "Name",
    es: "Nombre",
    fr: "Nom",
  },
  wishlist_sort_price_asc: {
    it: "Prezzo ↑",
    en: "Price ↑",
    es: "Precio ↑",
    fr: "Prix ↑",
  },
  wishlist_sort_price_desc: {
    it: "Prezzo ↓",
    en: "Price ↓",
    es: "Precio ↓",
    fr: "Prix ↓",
  },
  wishlist_sort_recent: {
    it: "Aggiunto recentemente",
    en: "Recently added",
    es: "Añadido recientemente",
    fr: "Ajouté récemment",
  },
  wishlist_empty_title: {
    it: "La tua wishlist è vuota",
    en: "Your wishlist is empty",
    es: "Tu lista de deseos está vacía",
    fr: "Votre liste de souhaits est vide",
  },
  wishlist_empty_subtitle: {
    it: "Aggiungi giochi dalla homepage usando il cuore ♥",
    en: "Add games from the homepage using the heart ♥",
    es: "Agrega juegos desde la página principal usando el corazón ♥",
    fr: "Ajoutez des jeux depuis la page principale en utilisant le cœur ♥",
  },
  wishlist_browse_games: {
    it: "Sfoglia giochi",
    en: "Browse games",
    es: "Explorar juegos",
    fr: "Parcourir les jeux",
  },
  wishlist_remove_label: {
    it: "Remove from wishlist",
    en: "Remove from wishlist",
    es: "Eliminar de lista de deseos",
    fr: "Supprimer de la liste de souhaits",
  },

  // ─── SETTINGS — PROFILO ───
  settings_profile: {
    it: "Profilo",
    en: "Profile",
    es: "Perfil",
    fr: "Profil",
  },
  settings_username: {
    it: "Nome utente",
    en: "Username",
    es: "Nombre de usuario",
    fr: "Nom d'utilisateur",
  },
  settings_email: {
    it: "Email",
    en: "Email",
    es: "Correo electrónico",
    fr: "Email",
  },
  settings_save: {
    it: "Salva",
    en: "Save",
    es: "Guardar",
    fr: "Sauvegarder",
  },
  settings_change_photo: {
    it: "Cambia foto",
    en: "Change photo",
    es: "Cambiar foto",
    fr: "Changer photo",
  },
  settings_saved_toast: {
    it: "Impostazioni salvate ✓",
    en: "Settings saved ✓",
    es: "Configuración guardada ✓",
    fr: "Paramètres sauvegardés ✓",
  },

  // ─── SETTINGS — NOTIFICHE ───
  settings_notifications: {
    it: "Notifiche",
    en: "Notifications",
    es: "Notificaciones",
    fr: "Notifications",
  },
  settings_email_notifications: {
    it: "Notifiche email",
    en: "Email notifications",
    es: "Notificaciones por correo",
    fr: "Notifications par email",
  },
  settings_email_notifications_desc: {
    it: "Ricevi notifiche quando un prezzo raggiunge il tuo target",
    en: "Receive notifications when a price reaches your target",
    es: "Recibe notificaciones cuando un precio alcanza tu objetivo",
    fr: "Recevez des notifications quand un prix atteint votre cible",
  },
  settings_push_notifications: {
    it: "Notifica instantanea",
    en: "Push notifications",
    es: "Notificaciones instantáneas",
    fr: "Notifications instantanées",
  },
  settings_push_notifications_desc: {
    it: "Notifiche dirette nel browser",
    en: "Direct browser notifications",
    es: "Notificaciones directas en el navegador",
    fr: "Notifications directes dans le navigateur",
  },
  settings_notification_frequency: {
    it: "Frequenza notifiche",
    en: "Notification frequency",
    es: "Frecuencia de notificaciones",
    fr: "Fréquence des notifications",
  },
  settings_freq_every_time: {
    it: "Ogni volta",
    en: "Every time",
    es: "Cada vez",
    fr: "Chaque fois",
  },
  settings_freq_once_day: {
    it: "Una volta al giorno",
    en: "Once a day",
    es: "Una vez al día",
    fr: "Une fois par jour",
  },
  settings_freq_once_week: {
    it: "Una volta a settimana",
    en: "Once a week",
    es: "Una vez a la semana",
    fr: "Une fois par semaine",
  },

  // ─── SETTINGS — ALERT PREFERENCES ───
  settings_alert_preferences: {
    it: "Alert preferences",
    en: "Alert preferences",
    es: "Preferencias de alertas",
    fr: "Préférences alertes",
  },
  settings_min_discount: {
    it: "Sconto minimo per alert",
    en: "Minimum discount for alert",
    es: "Descuento mínimo para alerta",
    fr: "Remise minimale pour alerte",
  },
  settings_min_discount_desc: {
    it: "Ricevi alert solo se lo sconto supera questa soglia",
    en: "Receive alerts only if the discount exceeds this threshold",
    es: "Recibe alertas solo si el descuento supera este umbral",
    fr: "Recevez des alertes uniquement si la remise dépasse ce seuil",
  },
  settings_min_price: {
    it: "Prezzo minimo per alert",
    en: "Minimum price for alert",
    es: "Precio mínimo para alerta",
    fr: "Prix minimum pour alerte",
  },
  settings_min_price_desc: {
    it: "Non ricevere alert per giochi sotto questo prezzo",
    en: "Don't receive alerts for games below this price",
    es: "No recibir alertas por juegos por debajo de este precio",
    fr: "Ne pas recevoir d'alertes pour des jeux en dessous de ce prix",
  },
  settings_save_preferences: {
    it: "Salva preferenze",
    en: "Save preferences",
    es: "Guardar preferencias",
    fr: "Sauvegarder préférences",
  },

  // ─── SETTINGS — PIATTAFORME ───
  settings_preferred_platforms: {
    it: "Piattaforme preferite",
    en: "Preferred platforms",
    es: "Plataformas preferidas",
    fr: "Plateformes préférées",
  },
  settings_preferred_platforms_desc: {
    it: "Filtra automaticamente i giochi per queste piattaforme",
    en: "Automatically filter games by these platforms",
    es: "Filtrar automáticamente los juegos por estas plataformas",
    fr: "Filtrer automatiquement les jeux par ces plateformes",
  },

  // ─── SETTINGS — STORE ───
  settings_preferred_stores: {
    it: "Store preferiti",
    en: "Preferred stores",
    es: "Tiendas preferidas",
    fr: "Magasins préférés",
  },
  settings_preferred_stores_desc: {
    it: "Mostra preferenzialmente questi store nei confronti prezzi",
    en: "Preferentially show these stores in price comparisons",
    es: "Mostrar preferentemente estas tiendas en comparaciones de precios",
    fr: "Afficher préférentiellement ces magasins dans les comparaisons de prix",
  },

  // ─── SETTINGS — APPARENZA ───
  settings_appearance: {
    it: "Apparenza",
    en: "Appearance",
    es: "Apariencia",
    fr: "Apparence",
  },
  settings_dark: {
    it: "🌙 Scuro",
    en: "🌙 Dark",
    es: "🌙 Oscuro",
    fr: "🌙 Sombre",
  },
  settings_light: {
    it: "☀️ Chiaro",
    en: "☀️ Light",
    es: "☀️ Claro",
    fr: "☀️ Clair",
  },
  settings_language: {
    it: "Lingua",
    en: "Language",
    es: "Idioma",
    fr: "Langue",
  },

  // ─── SETTINGS — ACCOUNT & SICUREZZA ───
  settings_account_security: {
    it: "Account & sicurezza",
    en: "Account & security",
    es: "Cuenta y seguridad",
    fr: "Compte & sécurité",
  },
  settings_change_password: {
    it: "Cambia password",
    en: "Change password",
    es: "Cambiar contraseña",
    fr: "Changer mot de passe",
  },
  settings_active_sessions: {
    it: "Sessioni attive",
    en: "Active sessions",
    es: "Sesiones activas",
    fr: "Sessions actives",
  },
  settings_disconnect_sessions: {
    it: "Disconnetti tutte le altre sessioni",
    en: "Disconnect all other sessions",
    es: "Desconectar todas las otras sesiones",
    fr: "Déconnecter toutes les autres sessions",
  },
  settings_danger_zone: {
    it: "Zona pericolo",
    en: "Danger zone",
    es: "Zona peligrosa",
    fr: "Zone dangereuse",
  },
  settings_danger_zone_desc: {
    it: "Questa azione non può essere annullata",
    en: "This action cannot be undone",
    es: "Esta acción no se puede deshacer",
    fr: "Cette action ne peut pas être annulée",
  },
  settings_delete_account: {
    it: "Elimina account",
    en: "Delete account",
    es: "Eliminar cuenta",
    fr: "Supprimer compte",
  },

  // ─── PASSWORD MODAL ───
  password_current: {
    it: "Password attuale",
    en: "Current password",
    es: "Contraseña actual",
    fr: "Mot de passe actuel",
  },
  password_new: {
    it: "Nuova password",
    en: "New password",
    es: "Nueva contraseña",
    fr: "Nouveau mot de passe",
  },
  password_confirm: {
    it: "Conferma nuova password",
    en: "Confirm new password",
    es: "Confirmar nueva contraseña",
    fr: "Confirmer nouveau mot de passe",
  },
  password_cancel: {
    it: "Cancella",
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
  },
  password_updated_toast: {
    it: "Password aggiornata ✓",
    en: "Password updated ✓",
    es: "Contraseña actualizada ✓",
    fr: "Mot de passe mis à jour ✓",
  },

  // ─── DELETE ACCOUNT MODAL ───
  delete_sure: {
    it: "Questa azione non può essere annullata. Sei sicuro di voler eliminare l'account?",
    en: "This action cannot be undone. Are you sure you want to delete your account?",
    es: "Esta acción no se puede deshacer. ¿Estás seguro de querer eliminar tu cuenta?",
    fr: "Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir supprimer votre compte ?",
  },
  delete_annulla: {
    it: "Annulla",
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
  },
  delete_account_toast: {
    it: "Account eliminato",
    en: "Account deleted",
    es: "Cuenta eliminada",
    fr: "Compte supprimé",
  },
};

export type TranslationKey = keyof typeof translations;
