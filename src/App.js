import React, { useState, useEffect, useRef } from "react";

// ─── LANGUAGES ───────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code:"fr", flag:"🇫🇷", name:"Français" },
  { code:"en", flag:"🇬🇧", name:"English" },
  { code:"es", flag:"🇪🇸", name:"Español" },
  { code:"ar", flag:"🇸🇦", name:"العربية", rtl:true },
  { code:"zh", flag:"🇨🇳", name:"中文" },
];


const THEMES = {
  terracotta: {
    primary:"#C8603A", secondary:"#3A5A40", bg:"#FDF6EC", card:"#FFFDF9",
    accent:"#F5E6C8", text:"#2C2416", muted:"#8A7A6A", name:"Terracotta",
    headerBg:"linear-gradient(135deg,#C8603A,#9B4428)",
    shadow:"rgba(44,36,22,0.07)", border:"rgba(200,96,58,0.08)",
  },
  minuit: {
    primary:"#E8C547", secondary:"#7C9E8A", bg:"#0F0F13", card:"#1A1A22",
    accent:"#252530", text:"#F0EDE8", muted:"#8A8A9A", name:"Minuit",
    headerBg:"linear-gradient(135deg,#1A1A22,#252530)",
    shadow:"rgba(0,0,0,0.3)", border:"rgba(232,197,71,0.15)",
  },
  ocean: {
    primary:"#2E7BC4", secondary:"#1AA89A", bg:"#F4F8FD", card:"#FFFFFF",
    accent:"#E0EEF8", text:"#1A2B3C", muted:"#6A8AAA", name:"Océan",
    headerBg:"linear-gradient(135deg,#2E7BC4,#1AA89A)",
    shadow:"rgba(26,43,60,0.07)", border:"rgba(46,123,196,0.1)",
  },
  safran: {
    primary:"#C8921A", secondary:"#8A3A2A", bg:"#FDFAF2", card:"#FFFDF8",
    accent:"#F5EDD0", text:"#2A1E08", muted:"#8A7A50", name:"Safran",
    headerBg:"linear-gradient(135deg,#C8921A,#8A3A2A)",
    shadow:"rgba(42,30,8,0.07)", border:"rgba(200,146,26,0.1)",
  },
};

const T = {
  fr:{
    appTagline:"Recettes simples, belles et savoureuses",
    tabGenerate:"Générer",tabIngredients:"Ingrédients",tabShopping:"Liste",
    tabHistory:"Historique",tabSurprise:"Surprise",
    generateTitle:"Générer une recette",mealTypeLabel:"Type de plat",
    prepTimeLabel:"Temps de préparation",servingsLabel:"Nombre de personnes",
    dietaryLabel:"Préférence alimentaire",dietaryPlaceholder:"végétarien, sans gluten...",
    budgetLabel:"Budget max",currencyLabel:"Devise",ageLabel:"Âge du convive",
    generateBtn:"Générer ma recette",generating:"Génération...",
    ingredientsTitle:"Quels ingrédients avez-vous ?",
    ingredientsSubtitle:"Entrez vos ingrédients et l'IA créera une recette adaptée.",
    ingredientPlaceholder:"tomates, pâtes, oignons...",addBtn:"Ajouter",
    searchBtn:"Trouver une recette",searching:"Recherche...",clearAll:"Effacer tout",
    shoppingTitle:"Ma liste de courses",shoppingEmpty:"Votre liste est vide.",
    shoppingEmptySub:"Générez une recette et cliquez sur  + à côté de chaque ingrédient !",
    deleteChecked:"Supprimer les cochés",clearList:"Vider la liste",
    addAll:"Tout ajouter",added:"Ajouté",addOne:"+",
    historyTitle:"Mes recettes sauvegardées",historyEmpty:"Aucune recette sauvegardée.",
    historyEmptySub:"Générez une recette, elle apparaîtra ici automatiquement !",
    deleteHistory:"Supprimer",viewRecipe:"Voir la recette",backBtn:"← Retour",
    surpriseTitle:"Mode Surprise",surpriseSubtitle:"Laissez l'IA vous surprendre avec une recette aléatoire !",
    surpriseBtn:"Surprends-moi",generating2:"Chargement...",
    sectionIngredients:"Ingrédients",sectionPrep:"Préparation",
    sectionDeco:"Décoration & Présentation",sectionTip:"Astuce du chef",
    sectionVariants:"Variantes",sectionAntiWaste:"Anti-gaspi",
    sectionAllergens:"Allergènes",premiumBadge:"PREMIUM",
    shareBtn:"Partager",shareCopied:"Copié !",
    saveBtn:"Sauvegarder",saved:"Sauvegardé",
    timerStart:"▶",timerPause:"⏸",timerReset:"↺",timerDone:"Terminé",
    spinnerText:"Génération en cours...",
    photoBtn:"Illustrer le plat",photoLoading:"Illustration...",
    errorMsg:"Erreur lors de la génération. Veuillez réessayer.",
    cuisineLabel:"Cuisine du monde",recipePageTitle:"Votre recette",backToForm:"← Modifier",newRecipe:"Nouvelle recette",persons:"personne",personsPlural:"personnes",tabRamadan:"Ramadan",tabFamille:"Famille",ramadanTitle:"Recettes Ramadan",ramadanSubtitle:"Des recettes spéciales pour le ftour et le shour",ramadanFtour:"Ftour",ramadanShour:"Shour",ramadanBtn:"Générer",familleTitle:"Mode Famille",familleSubtitle:"Une recette qui convient à toute la famille",familleAddMember:"Ajouter un membre",familleGenerate:"Générer pour la famille",familleName:"Prénom",familleAge:"Âge",familleRemove:"✕",familleEmpty:"Ajoutez au moins un membre",shareWhatsapp:"WhatsApp",findStore:"Où acheter ?",storeLoading:"Recherche...",storeTitle:"Où trouver les ingrédients",storeClose:"✕ Fermer",storeMarjane:"Marjane / Carrefour",storeBim:"BIM / Aldi",storeSouk:"Souk du quartier",storePharmacy:"Pharmacie / Herboriste",tabProfil:"Profil",profilTitle:"Mon Profil",profilName:"Prénom",profilNamePlaceholder:"Ex: Aymen",profilCity:"Ville",profilCityPlaceholder:"Ex: Casablanca",profilQuartier:"Quartier",profilQuartierPlaceholder:"Ex: Maarif, Hay Hassani...",profilPhone:"Téléphone (WhatsApp)",profilPhonePlaceholder:"06 XX XX XX XX",profilBio:"Préférences alimentaires",profilBioPlaceholder:"Ex: j'aime le piment, pas de porc...",profilSave:"Enregistrer",profilSaved:"Profil sauvegardé !",profilHello:"Bonjour",profilStoreNote:"Les magasins suggérés sont basés sur ta ville.",profilLocBtn:"Détecter ma position",profilLocating:"Localisation...",profilLocated:"Position détectée",
  },
  en:{
    appTagline:"Simple, beautiful and tasty recipes",
    tabGenerate:"Generate",tabIngredients:"Ingredients",tabShopping:"List",
    tabHistory:"History",tabSurprise:"Surprise",
    generateTitle:"Generate a recipe",mealTypeLabel:"Meal type",
    prepTimeLabel:"Prep time",servingsLabel:"Servings",
    dietaryLabel:"Dietary preference",dietaryPlaceholder:"vegetarian, gluten-free...",
    budgetLabel:"Max budget",currencyLabel:"Currency",ageLabel:"Âge du convive",
    generateBtn:"Generate my recipe",generating:"Generating...",
    ingredientsTitle:" What ingredients do you have?",
    ingredientsSubtitle:"Enter ingredients and AI will create an adapted recipe.",
    ingredientPlaceholder:"tomatoes, pasta, onions...",addBtn:"+ Add",
    searchBtn:"Find a recipe",searching:"Searching...",clearAll:"Clear all",
    shoppingTitle:" My shopping list",shoppingEmpty:"Your list is empty.",
    shoppingEmptySub:"Generate a recipe and click  + next to each ingredient!",
    deleteChecked:"Remove checked",clearList:"Clear list",
    addAll:" Add all",added:"Added",addOne:"+",
    historyTitle:"My saved recipes",historyEmpty:"No saved recipes yet.",
    historyEmptySub:"Generate a recipe and it will appear here automatically!",
    deleteHistory:"Delete",viewRecipe:"View recipe",backBtn:"← Back",
    surpriseTitle:"Surprise Mode",surpriseSubtitle:"Let the AI surprise you with a random recipe!",
    surpriseBtn:"Surprise me",generating2:"Loading...",
    sectionIngredients:"Ingredients",sectionPrep:"Preparation",
    sectionDeco:"Decoration & Plating",sectionTip:"Chef's tip",
    sectionVariants:"Variants",sectionAntiWaste:"Zero waste",
    sectionAllergens:"Allergens",premiumBadge:"PREMIUM",
    shareBtn:"Share",shareCopied:"Copied!",
    saveBtn:"Save",saved:"Saved",
    timerStart:"▶",timerPause:"⏸",timerReset:"↺",timerDone:"Done!",
    spinnerText:"AI is preparing your recipe...",
    photoBtn:"Illustrate dish",photoLoading:"Loading...",
    errorMsg:"Error generating recipe. Please try again.",
    cuisineLabel:"Cuisine style",recipePageTitle:"Your recipe",backToForm:"← Edit",newRecipe:"New recipe",persons:"person",personsPlural:"persons",tabRamadan:"Ramadan",tabFamille:"Family",ramadanTitle:"Ramadan Recipes",ramadanSubtitle:"Special recipes for iftar and suhoor",ramadanFtour:"Iftar",ramadanShour:"Suhoor",ramadanBtn:"Generate",familleTitle:"👨‍👩‍👧 Family Mode",familleSubtitle:"A recipe that works for the whole family",familleAddMember:"+ Add member",familleGenerate:"Generate for family",familleName:"Name",familleAge:"Age",familleRemove:"✕",familleEmpty:"Add at least one member",shareWhatsapp:"WhatsApp",findStore:"Where to buy?",storeLoading:"Searching...",storeTitle:"Where to find ingredients",storeClose:"✕ Close",storeMarjane:"Marjane / Carrefour",storeBim:"BIM / Aldi",storeSouk:"Local market",storePharmacy:"Pharmacy / Herbalist",tabProfil:"Profile",profilTitle:"My Profile",profilName:"First name",profilNamePlaceholder:"E.g: Aymen",profilCity:"City",profilCityPlaceholder:"E.g: Casablanca",profilQuartier:"Neighborhood",profilQuartierPlaceholder:"E.g: Maarif, Hay Hassani...",profilPhone:"Phone (WhatsApp)",profilPhonePlaceholder:"06 XX XX XX XX",profilBio:"Food preferences",profilBioPlaceholder:"E.g: I like spicy, no pork...",profilSave:"Save",profilSaved:"Profile saved!",profilHello:"Hello",profilStoreNote:"Suggested stores are based on your city.",profilLocBtn:"Detect my location",profilLocating:"Locating...",profilLocated:"Location detected",
  },
  es:{
    appTagline:"Recetas simples, bonitas y sabrosas",
    tabGenerate:"Generar",tabIngredients:"Ingredientes",tabShopping:"Lista",
    tabHistory:"Historial",tabSurprise:"Sorpresa",
    generateTitle:"Generar una receta",mealTypeLabel:"Tipo de plato",
    prepTimeLabel:"Tiempo prep.",servingsLabel:"Personas",
    dietaryLabel:"Preferencia",dietaryPlaceholder:"vegetariano, sin gluten...",
    budgetLabel:"Presupuesto",currencyLabel:"Moneda",ageLabel:"Edad",
    generateBtn:"Generar receta",generating:"Generando...",
    ingredientsTitle:" ¿Qué ingredientes tienes?",
    ingredientsSubtitle:"Introduce tus ingredientes y la IA creará una receta.",
    ingredientPlaceholder:"tomates, pasta...",addBtn:"+ Añadir",
    searchBtn:"Buscar receta",searching:"Buscando...",clearAll:"Borrar todo",
    shoppingTitle:" Mi lista de compras",shoppingEmpty:"Tu lista está vacía.",
    shoppingEmptySub:"¡Genera una receta y pulsa  + junto a cada ingrediente!",
    deleteChecked:"Eliminar marcados",clearList:"Vaciar lista",
    addAll:"Añadir todo",added:"Añadido",addOne:"+",
    historyTitle:"Mis recetas guardadas",historyEmpty:"No hay recetas guardadas.",
    historyEmptySub:"¡Genera una receta y aparecerá aquí!",
    deleteHistory:"Eliminar",viewRecipe:"Ver receta",backBtn:"← Volver",
    surpriseTitle:"Modo Sorpresa",surpriseSubtitle:"¡Deja que la IA te sorprenda!",
    surpriseBtn:"Sorpréndeme",generating2:"⏳ Preparando...",
    sectionIngredients:"Ingredientes",sectionPrep:"Preparación",
    sectionDeco:"Decoración",sectionTip:"Consejo",
    sectionVariants:"Variantes",sectionAntiWaste:"♻️ Residuos",
    sectionAllergens:"Alérgenos",premiumBadge:"PREMIUM",
    shareBtn:"Compartir",shareCopied:"¡Copiado!",
    saveBtn:"Guardar",saved:"Guardado",
    timerStart:"▶",timerPause:"⏸",timerReset:"↺",timerDone:"⏰ ¡Listo!",
    spinnerText:"La IA prepara tu receta...",
    photoBtn:"Ilustrar plato",photoLoading:"Cargando...",
    errorMsg:"⚠️ Error. Inténtalo de nuevo.",
    cuisineLabel:"Tipo cocina",recipePageTitle:"Tu receta",backToForm:"← Editar",newRecipe:"Nueva receta",persons:"persona",personsPlural:"personas",tabRamadan:"Ramadán",tabFamille:"Familia",ramadanTitle:"Recetas Ramadán",ramadanSubtitle:"Recetas especiales para el iftar y suhoor",ramadanFtour:"Iftar",ramadanShour:"Suhoor",ramadanBtn:"Generar",familleTitle:"👨‍👩‍👧 Modo Familia",familleSubtitle:"Una receta para toda la familia",familleAddMember:"+ Añadir",familleGenerate:"Generar para familia",familleName:"Nombre",familleAge:"Edad",familleRemove:"✕",familleEmpty:"Añade al menos un miembro",shareWhatsapp:"WhatsApp",findStore:"¿Dónde comprar?",storeLoading:"Buscando...",storeTitle:"Dónde encontrar ingredientes",storeClose:"✕ Cerrar",storeMarjane:"Supermercado grande",storeBim:"Tienda descuento",storeSouk:"Mercado local",storePharmacy:"Farmacia / Herbolario",tabProfil:"Perfil",profilTitle:"Mi Perfil",profilName:"Nombre",profilNamePlaceholder:"Ej: Aymen",profilCity:"Ciudad",profilCityPlaceholder:"Ej: Casablanca",profilQuartier:"Barrio",profilQuartierPlaceholder:"Ej: Maarif...",profilPhone:"Teléfono (WhatsApp)",profilPhonePlaceholder:"06 XX XX XX XX",profilBio:"Preferencias",profilBioPlaceholder:"Ej: picante, sin cerdo...",profilSave:"Guardar",profilSaved:"✅ ¡Perfil guardado!",profilHello:"Hola",profilStoreNote:"Las tiendas se basan en tu ciudad.",profilLocBtn:"Detectar ubicación",profilLocating:"Localizando...",profilLocated:"Ubicación detectada",
  },
  ar:{
    appTagline:"وصفات بسيطة وجميلة ولذيذة",
    tabGenerate:"إنشاء",tabIngredients:"المكونات",tabShopping:"القائمة",
    tabHistory:"السجل",tabSurprise:"مفاجأة",
    generateTitle:"إنشاء وصفة",mealTypeLabel:"نوع الطبق",
    prepTimeLabel:"وقت التحضير",servingsLabel:"عدد الأشخاص",
    dietaryLabel:"التفضيل الغذائي",dietaryPlaceholder:"نباتي...",
    budgetLabel:"الميزانية",currencyLabel:"العملة",ageLabel:"العمر",
    generateBtn:"إنشاء وصفتي",generating:"جارٍ الإنشاء...",
    ingredientsTitle:" ما المكونات لديك؟",
    ingredientsSubtitle:"أدخل مكوناتك وستنشئ الذكاء الاصطناعي وصفة.",
    ingredientPlaceholder:"طماطم، معكرونة...",addBtn:"+ إضافة",
    searchBtn:"بحث",searching:"بحث...",clearAll:"مسح الكل",
    shoppingTitle:" قائمة التسوق",shoppingEmpty:"القائمة فارغة.",
    shoppingEmptySub:"أنشئ وصفة وانقر  + بجانب كل مكون!",
    deleteChecked:"حذف المحددة",clearList:"مسح القائمة",
    addAll:"إضافة الكل",added:"مُضاف",addOne:"+",
    historyTitle:"وصفاتي المحفوظة",historyEmpty:"لا توجد وصفات.",
    historyEmptySub:"أنشئ وصفة وستظهر هنا!",
    deleteHistory:"حذف",viewRecipe:"عرض",backBtn:"← رجوع",
    surpriseTitle:"وضع المفاجأة",surpriseSubtitle:"دع الذكاء يفاجئك!",
    surpriseBtn:"فاجئني",generating2:"⏳ تحضير...",
    sectionIngredients:"المكونات",sectionPrep:"التحضير",
    sectionDeco:"الزينة",sectionTip:"نصيحة",
    sectionVariants:"البدائل",sectionAntiWaste:"تقليل الهدر",
    sectionAllergens:"⚠️ الحساسية",premiumBadge:"⭐ مميز",
    shareBtn:"مشاركة",shareCopied:"تم النسخ",
    saveBtn:"حفظ",saved:"محفوظ",
    timerStart:"▶",timerPause:"⏸",timerReset:"↺",timerDone:"انتهى",
    spinnerText:"الذكاء يحضر وصفتك...",
    photoBtn:"رسم الطبق",photoLoading:"جارٍ التحميل...",
    errorMsg:"⚠️ خطأ. حاول مرة أخرى.",
    cuisineLabel:"نوع المطبخ",recipePageTitle:"وصفتك",backToForm:"← تعديل",newRecipe:"وصفة جديدة",persons:"شخص",personsPlural:"أشخاص",tabRamadan:"رمضان",tabFamille:"العائلة",ramadanTitle:"وصفات رمضان",ramadanSubtitle:"وصفات خاصة للفطور والسحور",ramadanFtour:"الفطور",ramadanShour:"السحور",ramadanBtn:"توليد",familleTitle:"👨‍👩‍👧 وضع العائلة",familleSubtitle:"وصفة مناسبة لجميع أفراد العائلة",familleAddMember:"+ إضافة فرد",familleGenerate:"توليد للعائلة",familleName:"الاسم",familleAge:"العمر",familleRemove:"✕",familleEmpty:"أضف فردًا على الأقل",shareWhatsapp:"WhatsApp",findStore:"أين أشتري؟",storeLoading:"بحث...",storeTitle:"أين تجد المكونات",storeClose:"✕ إغلاق",storeMarjane:"مروان / كارفور",storeBim:"بيم / ألدي",storeSouk:"السوق المحلي",storePharmacy:"صيدلية / عطار",tabProfil:"الملف",profilTitle:"ملفي الشخصي",profilName:"الاسم الأول",profilNamePlaceholder:"مثال: أيمن",profilCity:"المدينة",profilCityPlaceholder:"مثال: الدار البيضاء",profilQuartier:"الحي",profilQuartierPlaceholder:"مثال: المعاريف...",profilPhone:"الهاتف (واتساب)",profilPhonePlaceholder:"06 XX XX XX XX",profilBio:"التفضيلات الغذائية",profilBioPlaceholder:"مثال: أحب الحار، لا لحم خنزير...",profilSave:"حفظ",profilSaved:"تم حفظ الملف!",profilHello:"مرحبا",profilStoreNote:"المتاجر المقترحة مبنية على مدينتك.",profilLocBtn:"تحديد موقعي",profilLocating:"تحديد...",profilLocated:"تم تحديد الموقع",
  },
  zh:{
    appTagline:"简单、美观、美味的食谱",
    tabGenerate:"生成",tabIngredients:"食材",tabShopping:"清单",
    tabHistory:"历史",tabSurprise:"惊喜",
    generateTitle:"生成食谱",mealTypeLabel:"菜肴类型",
    prepTimeLabel:"准备时间",servingsLabel:"人数",
    dietaryLabel:"饮食偏好",dietaryPlaceholder:"素食、无麸质...",
    budgetLabel:"最大预算",currencyLabel:"货币",ageLabel:"年龄",
    generateBtn:"生成我的食谱",generating:"生成中...",
    ingredientsTitle:" 您有哪些食材？",
    ingredientsSubtitle:"输入食材，AI将创建适合的食谱。",
    ingredientPlaceholder:"番茄、意面...",addBtn:"+ 添加",
    searchBtn:"查找食谱",searching:"搜索中...",clearAll:"清除全部",
    shoppingTitle:" 购物清单",shoppingEmpty:"清单为空。",
    shoppingEmptySub:"生成食谱后点击食材旁的  +！",
    deleteChecked:"删除已选",clearList:"清空",
    addAll:" 全部添加",added:"已添加",addOne:"+",
    historyTitle:"已保存的食谱",historyEmpty:"暂无保存的食谱。",
    historyEmptySub:"生成食谱后它将自动出现在这里！",
    deleteHistory:"删除",viewRecipe:"查看",backBtn:"← 返回",
    surpriseTitle:"惊喜模式",surpriseSubtitle:"让AI用随机食谱给您惊喜！",
    surpriseBtn:"给我惊喜",generating2:"加载中...",
    sectionIngredients:"食材",sectionPrep:"步骤",
    sectionDeco:"摆盘装饰",sectionTip:"厨师技巧",
    sectionVariants:"变体",sectionAntiWaste:"减少浪费",
    sectionAllergens:"过敏原",premiumBadge:"⭐ 高级",
    shareBtn:"分享",shareCopied:"已复制",
    saveBtn:"保存",saved:"已保存",
    timerStart:"▶",timerPause:"⏸",timerReset:"↺",timerDone:"完成",
    spinnerText:"AI正在准备您的食谱...",
    photoBtn:"生成插图",photoLoading:"加载中...",
    errorMsg:"⚠️ 生成失败，请重试。",
    cuisineLabel:"菜系风格",recipePageTitle:"您的食谱",backToForm:"← 返回",newRecipe:"新食谱",persons:"人",personsPlural:"人",tabRamadan:"斋月",tabFamille:"家庭",ramadanTitle:"斋月食谱",ramadanSubtitle:"开斋饭和封斋饭特别食谱",ramadanFtour:"🌅 开斋饭",ramadanShour:"🌙 封斋饭",ramadanBtn:"生成",familleTitle:"👨‍👩‍👧 家庭模式",familleSubtitle:"适合全家人的食谱",familleAddMember:"+ 添加成员",familleGenerate:"为全家生成",familleName:"姓名",familleAge:"年龄",familleRemove:"✕",familleEmpty:"至少添加一个成员",shareWhatsapp:"WhatsApp",findStore:"哪里买？",storeLoading:"搜索中...",storeTitle:"在哪里找到食材",storeClose:"✕ 关闭",storeMarjane:"大型超市",storeBim:"折扣店",storeSouk:"当地市场",storePharmacy:"药店/草药店",tabProfil:"个人",profilTitle:"我的个人资料",profilName:"名字",profilNamePlaceholder:"例：Aymen",profilCity:"城市",profilCityPlaceholder:"例：卡萨布兰卡",profilQuartier:"街区",profilQuartierPlaceholder:"例：Maarif...",profilPhone:"电话 (WhatsApp)",profilPhonePlaceholder:"06 XX XX XX XX",profilBio:"饮食偏好",profilBioPlaceholder:"例：喜欢辣，不吃猪肉...",profilSave:"保存",profilSaved:"资料已保存！",profilHello:"你好",profilStoreNote:"建议的商店基于您的城市。",profilLocBtn:"检测我的位置",profilLocating:"定位中...",profilLocated:"位置已检测",
  },
};

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CURRENCIES = [
  { code:"MAD", symbol:"DH", flag:"🇲🇦", name:"Dirham" },
  { code:"EUR", symbol:"€",  flag:"🇪🇺", name:"Euro" },
  { code:"USD", symbol:"$",  flag:"🇺🇸", name:"Dollar" },
];

const BUDGET_STEPS = {
  MAD: [
    {amount:20,  label:"20 DH",  tag:"Ultra économique", color:"#3A5A40"},
    {amount:50,  label:"50 DH",  tag:"Petit budget",     color:"#5A8A62"},
    {amount:80,  label:"80 DH",  tag:"Raisonnable",      color:"#C8A03A"},
    {amount:120, label:"120 DH", tag:"Confortable",      color:"#C8603A"},
    {amount:200, label:"200 DH", tag:"Généreux",         color:"#B84A2A"},
    {amount:350, label:"350 DH", tag:"Festif",         color:"#9B3A8A"},
    {amount:500, label:"500 DH", tag:"Gastronomique",    color:"#6A3AB8"},
    {amount:800, label:"800 DH", tag:"Grand chef",   color:"#3A5AB8"},
    {amount:9999,label:"Sans limite",tag:"Luxe",      color:"#2C2416"},
  ],
  EUR: [
    {amount:5,   label:"5€",    tag:"Ultra économique", color:"#3A5A40"},
    {amount:10,  label:"10€",   tag:"Petit budget",     color:"#5A8A62"},
    {amount:15,  label:"15€",   tag:"Raisonnable",      color:"#C8A03A"},
    {amount:25,  label:"25€",   tag:"Confortable",      color:"#C8603A"},
    {amount:35,  label:"35€",   tag:"Généreux",         color:"#B84A2A"},
    {amount:50,  label:"50€",   tag:"Festif",         color:"#9B3A8A"},
    {amount:75,  label:"75€",   tag:"Gastronomique",    color:"#6A3AB8"},
    {amount:100, label:"100€",  tag:"Grand chef",   color:"#3A5AB8"},
    {amount:9999,label:"Sans limite",tag:"Luxe",     color:"#2C2416"},
  ],
  USD: [
    {amount:5,   label:"$5",    tag:"Ultra budget",     color:"#3A5A40"},
    {amount:10,  label:"$10",   tag:"Low budget",       color:"#5A8A62"},
    {amount:15,  label:"$15",   tag:"Reasonable",       color:"#C8A03A"},
    {amount:25,  label:"$25",   tag:"Comfortable",      color:"#C8603A"},
    {amount:40,  label:"$40",   tag:"Generous",         color:"#B84A2A"},
    {amount:60,  label:"$60",   tag:"Festive",        color:"#9B3A8A"},
    {amount:85,  label:"$85",   tag:"Gastronomic",      color:"#6A3AB8"},
    {amount:120, label:"$120",  tag:"Top chef",     color:"#3A5AB8"},
    {amount:9999,label:"Unlimited",tag:"Luxury",     color:"#2C2416"},
  ],
};

const AGE_PROFILES = [
  {max:3,  emoji:"0-3",label:"Bébé",         color:"#E8856A",desc:"Textures très douces, sans sel.",          prompt:"for a baby: no salt, no sugar, very smooth textures, hypoallergenic"},
  {max:7,  emoji:"4-12",label:"Enfant",       color:"#C8A03A",desc:"Saveurs douces et amusantes.",             prompt:"for a child 4-7: mild flavors, fun colorful, no spices"},
  {max:12, emoji:"4-12",label:"Pré-ado",      color:"#5A8A62",desc:"Burgers, pizzas, pâtes.",                  prompt:"for 8-12yo: pizza, burger, pasta, simple"},
  {max:17, emoji:"13-45",label:"Ado",          color:"#3A5AB8",desc:"Portions généreuses, street food.",        prompt:"for teen: generous portions, street food, moderate spices"},
  {max:25, emoji:"13-45",label:"Jeune adulte", color:"#C8603A",desc:"Cuisine rapide, world food.",              prompt:"for young adult: quick, world food, budget-friendly"},
  {max:45, emoji:"13-45",label:"Adulte",       color:"#9B4428",desc:"Saveurs équilibrées et gourmandes.",       prompt:"for adult: balanced and flavorful"},
  {max:60, emoji:"46-60",label:"Adulte mature",color:"#6A3AB8",desc:"Cuisine saine et légère.",                 prompt:"for 45-60yo: healthy, less fat, rich in vegetables"},
  {max:75, emoji:"61-75",label:"Senior",       color:"#3A5A40",desc:"Peu salé, textures tendres.",              prompt:"for senior: low salt, tender textures, calcium-rich"},
  {max:100,emoji:"75+",label:"Grand senior", color:"#5A8A62",desc:"Très doux, nutritif, réconfortant.",       prompt:"for elderly: very tender, low salt, soft flavors"},
];

const MEAL_TYPES_MAP = {
  fr:["Plat principal","Entrée","Dessert","Soupe","Salade","Petit-déjeuner"],
  en:["Main course","Starter","Dessert","Soup","Salad","Breakfast"],
  es:["Plato principal","Entrada","Postre","Sopa","Ensalada","Desayuno"],
  ar:["طبق رئيسي","مقبلات","حلوى","شوربة","سلطة","فطور"],
  zh:["主菜","前菜","甜点","汤","沙拉","早餐"],
};

const PREP_TIMES = ["15 min","30 min","45 min","1h"];
const SERVINGS_OPTS = ["1","2","4","6"];
const SURPRISE_THEMES = [
  "Italian comfort food","colorful Asian dish","festive Mexican recipe",
  "light Mediterranean dish","creative vegetarian recipe","classic French dish revisited",
  "quick weeknight dinner","surprising world cuisine dish",
];

const CUISINES = [
  {flag:"", label:"Aucune préférence", en:"any cuisine"},
  {flag:"🇫🇷", label:"Française",        en:"French cuisine"},
  {flag:"🇮🇹", label:"Italienne",        en:"Italian cuisine"},
  {flag:"🇯🇵", label:"Japonaise",        en:"Japanese cuisine"},
  {flag:"🇨🇳", label:"Chinoise",         en:"Chinese cuisine"},
  {flag:"🇲🇽", label:"Mexicaine",        en:"Mexican cuisine"},
  {flag:"🇮🇳", label:"Indienne",         en:"Indian cuisine"},
  {flag:"🇲🇦", label:"Marocaine",        en:"Moroccan cuisine"},
  {flag:"🇱🇧", label:"Libanaise",        en:"Lebanese cuisine"},
  {flag:"🇬🇷", label:"Grecque",          en:"Greek cuisine"},
  {flag:"🇹🇭", label:"Thaïlandaise",     en:"Thai cuisine"},
  {flag:"🇻🇳", label:"Vietnamienne",     en:"Vietnamese cuisine"},
  {flag:"🇰🇷", label:"Coréenne",         en:"Korean cuisine"},
  {flag:"🇪🇸", label:"Espagnole",        en:"Spanish cuisine"},
  {flag:"🇵🇹", label:"Portugaise",       en:"Portuguese cuisine"},
  {flag:"🇧🇷", label:"Brésilienne",      en:"Brazilian cuisine"},
  {flag:"🇺🇸", label:"Américaine",       en:"American cuisine"},
  {flag:"🇬🇧", label:"Britannique",      en:"British cuisine"},
  {flag:"🇹🇷", label:"Turque",           en:"Turkish cuisine"},
  {flag:"🇪🇹", label:"Éthiopienne",      en:"Ethiopian cuisine"},
  {flag:"🇵🇪", label:"Péruvienne",       en:"Peruvian cuisine"},
  {flag:"🇸🇳", label:"Sénégalaise",      en:"Senegalese cuisine"},
];

const RAMADAN_DISHES = {
  ftour:[
    "Harira (soupe traditionnelle marocaine)","Chebakia (gâteau au miel et sésame)",
    "Briouates à la viande","Msemen (crêpes feuilletées)","Sellou (sfoof)",
    "Beghrir (crêpes mille trous)","Maakouda (galettes de pommes de terre)",
    "Chorba (soupe algérienne)","Ftayer (feuilletés aux épinards)","Dates et lait",
  ],
  shour:[
    "Riz au lait et miel","Baghrir avec beurre et miel","Pain maison avec huile d'olive",
    "Omelette aux légumes","Lben (lait fermenté) avec pain","Couscous au lait",
    "Harira légère","Crêpes au fromage et miel","Potage de lentilles","Semoule au lait",
  ],
};

const STORE_CATEGORIES = {
  supermarche:["Marjane","Carrefour","Label Vie","Aswak Assalam","BIM","Aldi"],
  souk:["Souk du quartier","Souk hebdomadaire","Épicerie du coin","Hanout"],
  specialise:["Herboriste (عطار)","Boucherie halal","Poissonnier","Fromagerie"],
};

function getStoresForIngredient(ing) {
  const lower = ing.toLowerCase();
  if(/épice|cumin|cannelle|safran|ras el hanout|gingembre|herbe|thym|romarin/i.test(lower))
    return {icon:"",places:["Herboriste (عطار)","Souk du quartier","Marjane"]};
  if(/viande|poulet|agneau|boeuf|poisson|crevette|merlan|sardine/i.test(lower))
    return {icon:"Viande",places:["Boucherie halal du quartier","Souk du quartier","Marjane/Carrefour"]};
  if(/lait|beurre|crème|fromage|yaourt|oeuf/i.test(lower))
    return {icon:"Lait",places:["BIM / Aldi","Marjane / Carrefour","Hanout du coin"]};
  if(/farine|semoule|sucre|huile|sel|riz|pâte/i.test(lower))
    return {icon:"Épicerie",places:["BIM / Aldi (moins cher)","Marjane / Carrefour","Hanout du coin"]};
  if(/légume|tomate|carotte|oignon|ail|poivron|courgette|pomme de terre/i.test(lower))
    return {icon:"",places:["Souk du quartier (plus frais)","Marjane / Carrefour","BIM / Aldi"]};
  if(/fruit|orange|citron|pomme|banane|raisin/i.test(lower))
    return {icon:"Fruits",places:["Souk du quartier (plus frais)","Marjane / Carrefour"]};
  return {icon:"",places:["Marjane / Carrefour","BIM / Aldi","Souk du quartier"]};
}

function getAgeProfile(age){return AGE_PROFILES.find(p=>age<=p.max)||AGE_PROFILES[AGE_PROFILES.length-1];}
function isPremium(b){
  // b is the budget label string — premium if it contains Gastro/Grand/Luxe/Unlimited/Top chef
  return /gastronomique|grand chef|sans limite|unlimited|luxury|gastronomic|top chef/i.test(b);
}

function extractMinutes(step){
  const m=step.match(/(\d+)\s*(min|minute|minutes|heure|heures|hour|hours|分钟|小时|دقيقة|ساعة|minuto|minutos)/i);
  if(!m)return null;
  let n=parseInt(m[1]);
  if(/heure|hour|小时|ساعة/i.test(m[2]))n*=60;
  return n>0?n:null;
}

// ─── API Anthropic ─────────────────────────────────────────────────────────────
async function askClaude(userPrompt, maxTokens=3000) {
  const response = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt: userPrompt, max_tokens: maxTokens }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Erreur serveur");
  if (!data.text) throw new Error("Réponse vide");
  return data.text;
}

async function callClaude(prompt) {
  const text = await askClaude(prompt, 3000);
  let clean = text.trim();
  clean = clean.replace(/^```json\n?/, "").replace(/^```\n?/, "").replace(/\n?```$/, "").trim();
  const s = clean.indexOf("{");
  const e = clean.lastIndexOf("}");
  if (s < 0 || e < 0) throw new Error("Pas de JSON dans la réponse");
  clean = clean.slice(s, e + 1);
  return JSON.parse(clean);
}

async function generateCanvasArt(recipeName, tagline, ingredients) {
  const ingList = ingredients.slice(0,5).join(", ");
  const text = await askClaude(
    "Write ONLY a JavaScript function drawDish(ctx, W, H) for HTML5 Canvas 2D.\n" +
    "Dish: \"" + recipeName + "\"\n" +
    "Description: " + tagline + "\n" +
    "Ingredients: " + ingList + "\n\n" +
    "NO markdown, NO explanation. Start immediately with: function drawDish(ctx, W, H) {\n\n" +
    "Canvas size: W=800, H=500. Plate center: (W/2, H/2+10), rx=210, ry=155.\n\n" +
    "STEP 1 - WOOD TABLE BACKGROUND:\n" +
    "Draw 50 horizontal strips fillRect alternating #1a0d08 #2a1510 #231108 #3a1e0e.\n" +
    "Add diagonal grain: for loop, ctx.strokeStyle='rgba(60,30,5,0.13)', lineWidth=0.7, lines from top-left to bottom-right.\n" +
    "Vignette: radialGradient(W/2,H/2,100,W/2,H/2,W*0.75) transparent to rgba(0,0,0,0.55).\n\n" +
    "STEP 2 - PLATE DROP SHADOW:\n" +
    "ctx.save(); ctx.shadowBlur=30; ctx.shadowColor='rgba(0,0,0,0.8)';\n" +
    "Draw filled dark ellipse at plate center, slightly larger; ctx.restore();\n\n" +
    "STEP 3 - PORCELAIN PLATE:\n" +
    "Outer ellipse: radialGradient from #f0ede8 to #d8d4cc.\n" +
    "Inner ellipse (rx-18,ry-18): radialGradient from #ffffff at 30% to #eae6e0.\n" +
    "Rim highlight: arc stroke rgba(255,255,255,0.7) lineWidth=2.5 top-left quarter.\n\n" +
    "STEP 4 - FOOD (most important, make it look delicious and realistic):\n" +
    "Use bezierCurveTo for organic shapes, NOT rectangles.\n" +
    "For each food element: (a) base fill with rich color, (b) shadow overlay radialGradient bottom-right rgba(0,0,0,0.35), (c) specular highlight small radialGradient top-left rgba(255,255,255,0.5).\n" +
    "Draw 10-14 layered food elements appropriate for this dish.\n" +
    "Proteins: colors #8B4513 #A0522D #C8732A #D4943A with darker crusty edges.\n" +
    "Vegetables: #4CAF50 #2E7D32 #FDD835 #E53935 #FF7043 vibrant.\n" +
    "Sauces/gravies: pool shapes with glossy specular dot (small white ctx.arc, globalAlpha 0.7).\n" +
    "Pasta/grains/rice: #F5DEB3 #DEB887 with individual grain dots.\n\n" +
    "STEP 5 - GARNISH:\n" +
    "3-4 herb leaves: bezier leaf shapes, fill #3CB371 with darker vein line.\n" +
    "Micro dots/seeds: 8-12 tiny ctx.arc circles, fill #8B6914.\n" +
    "Sauce drizzle: elegant curved quadraticCurveTo path, stroke #8B0000 lineWidth=2.5.\n\n" +
    "STEP 6 - STEAM (wavy paths above food):\n" +
    "3 wavy paths using sin-based bezier control points.\n" +
    "ctx.strokeStyle='rgba(255,255,255,0.18)', lineWidth=2.5.\n" +
    "ctx.filter='blur(2px)' before drawing, reset after.\n\n" +
    "STEP 7 - FORK (right of plate):\n" +
    "Metal linearGradient: #999 to #fff to #888 to #ccc (chrome effect).\n" +
    "Draw handle as rounded rect, 4 tines as thin bezier paths.\n\n" +
    "STEP 8 - DISH NAME LABEL:\n" +
    "ctx.save(); at bottom center draw roundRect (or arc-corner rect) fillStyle='rgba(10,4,2,0.78)'.\n" +
    "ctx.fillStyle='#f5e6c8'; ctx.font='italic 600 18px Georgia,serif'; ctx.textAlign='center'; fillText.\n" +
    "ctx.restore();",
    7000
  );
  let code = text.trim().replace(/^```[a-zA-Z]*\n?|\n?```$/gi, "").trim();
  const fnStart = code.indexOf("function drawDish");
  if (fnStart > 0) code = code.slice(fnStart);
  return code;
}


// ─── PROMPTS ──────────────────────────────────────────────────────────────────
function buildPrompt({mealType,budget,prepTime,servings,dietary,cuisine,agePrompt,lang,theme}){
  const prem=isPremium(budget);
  const langInstr=lang==="fr"?"Reply in French":lang==="es"?"Reply in Spanish":lang==="ar"?"Reply in Arabic":lang==="zh"?"Reply in Chinese":"Reply in English";
  return `You are a 2-star chef. ${langInstr}.
Dish: ${mealType}${theme?` (theme: ${theme})`:""}
Cuisine: ${cuisine||"any"}
Budget: ${budget} for ${servings} serving(s)${prem?" — use premium ingredients (truffle, lobster, foie gras)":" — affordable supermarket"}
Time: ${prepTime} | Profile: ${agePrompt}${dietary?`\nDietary: ${dietary}`:""}

Rules: beginner level, basic equipment, 6-10 ingredients, 6-10 steps, 4 decoration steps, 2 variants, anti-waste tip, allergens, cost estimate.

Respond ONLY with valid JSON (no markdown, no text outside):
{"name":"...","tagline":"...","time":"${prepTime}","budget":"${budget}","cost_per_portion":"~X.XX€","servings":"${servings}","difficulty":"...","ingredients":["..."],"steps":["..."],"decoration":["...","...","...","..."],"tip":"...","variants":["🥦 ...","💪 ..."],"anti_waste":"...","allergens":["..."]}`;
}

// ─── TIMER ────────────────────────────────────────────────────────────────────
function StepTimer({minutes,t}){
  const [secs,setSecs]=useState(minutes*60);
  const [running,setRunning]=useState(false);
  const [done,setDone]=useState(false);
  const ref=useRef(null);
  const total=minutes*60;
  useEffect(()=>{
    if(running&&secs>0){ref.current=setInterval(()=>setSecs(s=>{if(s<=1){clearInterval(ref.current);setRunning(false);setDone(true);return 0;}return s-1;}),1000);}
    return()=>clearInterval(ref.current);
  },[running]);
  const mm=String(Math.floor(secs/60)).padStart(2,"0"),ss=String(secs%60).padStart(2,"0");
  const pct=((total-secs)/total)*100;
  return(
    <div style={{display:"inline-flex",alignItems:"center",gap:6,background:done?"#fff3cd":running?"#edf7ed":"#f5f5f5",border:`1px solid ${done?"#ffc107":running?"#3A5A40":"#ddd"}`,borderRadius:20,padding:"0.28rem 0.7rem",marginTop:5}}>
      <svg width="26" height="26" style={{transform:"rotate(-90deg)",flexShrink:0}}>
        <circle cx="13" cy="13" r="10" fill="none" stroke="#e0e0e0" strokeWidth="3"/>
        <circle cx="13" cy="13" r="10" fill="none" stroke={done?"#ffc107":running?"#3A5A40":"#C8603A"} strokeWidth="3"
          strokeDasharray={`${2*Math.PI*10}`} strokeDashoffset={`${2*Math.PI*10*(1-pct/100)}`} style={{transition:"stroke-dashoffset 1s linear"}}/>
      </svg>
      <span style={{fontWeight:700,fontSize:"0.82rem",color:done?"#856404":running?"#3A5A40":"#555",minWidth:36}}>{mm}:{ss}</span>
      {done?<span style={{fontSize:"0.76rem",color:"#856404",fontWeight:600}}>{t.timerDone}</span>:(
        <>
          <button onClick={()=>setRunning(r=>!r)} style={{background:running?"#FDF6EC":"#3A5A40",color:running?"#3A5A40":"white",border:`1px solid #3A5A40`,borderRadius:6,padding:"0.18rem 0.45rem",fontSize:"0.75rem",cursor:"pointer",fontWeight:700}}>
            {running?t.timerPause:t.timerStart}
          </button>
          <button onClick={()=>{clearInterval(ref.current);setRunning(false);setDone(false);setSecs(total);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.82rem",color:"#8A7A6A",padding:"0 2px"}}>{t.timerReset}</button>
        </>
      )}
    </div>
  );
}

// ─── INGREDIENT ROW ────────────────────────────────────────────────────────────
function IngRow({text,added,onAdd,t}){
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:added?"#edf7ed":"#FDF6EC",border:`1.5px solid ${added?"rgba(58,90,64,0.3)":"rgba(200,96,58,0.12)"}`,borderRadius:10,padding:"0.48rem 0.6rem 0.48rem 0.85rem",gap:8}}>
      <span style={{fontSize:"0.87rem",flex:1,color:added?"#3A5A40":"#2C2416"}}>
        <span style={{color:added?"#3A5A40":"#C8603A",marginRight:5}}>{added?"·":""}</span>{text}
      </span>
      <button onClick={()=>!added&&onAdd(text)} style={{background:added?"#3A5A40":"white",color:added?"white":"#C8603A",border:`1.5px solid ${added?"#3A5A40":"#C8603A"}`,borderRadius:7,padding:"0.22rem 0.5rem",fontSize:"0.7rem",fontWeight:700,cursor:added?"default":"pointer",whiteSpace:"nowrap",flexShrink:0}}>
        {added?t.added:t.addOne}
      </button>
    </div>
  );
}

// ─── SECTION TITLE ─────────────────────────────────────────────────────────────
function ST({label,color}){
  return <div style={{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:color||"#C8603A",marginBottom:9}}>{label}</div>;
}

// ─── RECIPE CARD ──────────────────────────────────────────────────────────────
function RecipeCard({recipe,onAddOne,shoppingSet,onSave,isSaved,t,lang}){
  const prem=isPremium(recipe.budget);
  const canvasRef=useRef(null);
  const [canvasReady,setCanvasReady]=useState(false);
  const [canvasLoading,setCanvasLoading]=useState(false);
  const [canvasError,setCanvasError]=useState("");
  const [shared,setShared]=useState(false);
  const [showStores,setShowStores]=useState(false);

  function handleWhatsapp(){
    const txt=`🍽️ *${recipe.name}*
_${recipe.tagline}_

⏱️ ${recipe.time} · 💶 ${recipe.budget} · 👤 ${recipe.servings}

*Ingrédients:*
${recipe.ingredients.map(i=>"• "+i).join("\n")}

_Généré avec Plateio ✨_`;
    const url="https://wa.me/?text="+encodeURIComponent(txt);
    window.open(url,"_blank");
  }

  async function handlePhoto(){
    setCanvasLoading(true);setCanvasError("");setCanvasReady(false);
    try{
      const code=await generateCanvasArt(recipe.name,recipe.tagline,recipe.ingredients);
      // Execute the returned drawDish function on the canvas
      const fn = new Function("ctx","W","H", code.replace(/^function drawDish\(ctx, W, H\)\s*\{/, "").replace(/\}\s*$/, ""));
      // Wait for canvas to be in DOM
      await new Promise(r=>setTimeout(r,50));
      const canvas=canvasRef.current;
      if(!canvas){setCanvasError("Canvas non disponible");setCanvasLoading(false);return;}
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,800,500);
      fn(ctx,800,500);
      setCanvasReady(true);
    }catch(e){
      setCanvasError("Erreur: "+e.message.slice(0,80));
    }
    setCanvasLoading(false);
  }

  function handleShare(){
    const txt=`🍽️ ${recipe.name}\n${recipe.tagline}\n\n⏱️ ${recipe.time} · 💶 ${recipe.budget} · 👤 ${recipe.servings}\n\n${recipe.ingredients.join(", ")}\n\n— Plateio ✨`;
    navigator.clipboard.writeText(txt).catch(()=>{});
    setShared(true);setTimeout(()=>setShared(false),2500);
  }

  const hBg=prem?"linear-gradient(135deg,#2d1f4a,#1a1028)":"linear-gradient(135deg,#C8603A,#9B4428)";
  const isRtl=lang==="ar";

  return(
    <div style={{background:"#FFFDF9",borderRadius:20,overflow:"hidden",boxShadow:"0 6px 32px rgba(44,36,22,0.13)",border:"1px solid rgba(200,96,58,0.1)",marginTop:18,direction:isRtl?"rtl":"ltr"}}>

      {/* Header */}
      <div style={{background:hBg,color:"white",padding:"1.4rem 1.6rem"}}>
        <div style={{fontSize:"1.4rem",fontWeight:800,lineHeight:1.2,marginBottom:4}}>{recipe.name}</div>
        <div style={{opacity:0.85,fontSize:"0.9rem",marginBottom:12}}>{recipe.tagline}</div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:"0.79rem",opacity:0.9}}>
          <span>{recipe.time}</span><span>{recipe.budget}</span>
          <span>{recipe.servings}</span><span>{recipe.difficulty}</span>
          {recipe.cost_per_portion&&<span>{recipe.cost_per_portion}</span>}
        </div>
      </div>

      {/* Canvas illustration */}
      <canvas ref={canvasRef} width={800} height={500}
        style={{width:"100%",display:(canvasReady||canvasLoading)?"block":"none",background:"#1a0d08"}}
      />
      {canvasLoading&&(
        <div style={{background:"linear-gradient(135deg,#1a1028,#2d1f4a)",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10}}>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <div style={{width:30,height:30,border:"3px solid rgba(200,160,240,0.3)",borderTopColor:"#c8a8f0",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
          <span style={{color:"#c8a8f0",fontSize:"0.85rem"}}>{t.photoLoading}</span>
        </div>
      )}
      {canvasError&&<div style={{padding:"0.8rem 1.6rem",background:"#fff3cd",color:"#856404",fontSize:"0.82rem"}}>⚠️ {canvasError}</div>}

      <div style={{padding:"1.4rem 1.6rem"}}>

        {/* Ingredients */}
        <div style={{marginBottom:18}}>
          <ST label={t.sectionIngredients}/>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {recipe.ingredients.map((ing,i)=><IngRow key={i} text={ing} added={shoppingSet.has(ing)} onAdd={onAddOne} t={t}/>)}
          </div>
          <button onClick={()=>recipe.ingredients.forEach(ing=>onAddOne(ing))} style={{marginTop:9,background:"#C8603A",color:"white",border:"none",padding:"0.55rem 1rem",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:"0.79rem",display:"flex",alignItems:"center",gap:5}}>
            {t.addAll}
          </button>
        </div>

        {/* Steps + timers */}
        <div style={{marginBottom:18}}>
          <ST label={t.sectionPrep}/>
          <ol style={{listStyle:"none",padding:0,margin:0}}>
            {recipe.steps.map((step,i)=>{
              const mins=extractMinutes(step);
              return(
                <li key={i} style={{marginBottom:11}}>
                  <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
                    <div style={{background:"#C8603A",color:"white",width:25,height:25,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</div>
                    <div style={{fontSize:"0.91rem",lineHeight:1.65}}>{step}</div>
                  </div>
                  {mins&&<div style={{marginLeft:36}}><StepTimer minutes={mins} t={t}/></div>}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Decoration */}
        {recipe.decoration?.length>0&&(
          <div style={{background:prem?"linear-gradient(135deg,#1a1028,#2d1f4a)":"linear-gradient(135deg,#162218,#1e3324)",borderRadius:13,padding:"1.1rem 1.25rem",marginBottom:18}}>
            <div style={{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:prem?"#c8a8f0":"#90d4a8",display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
              {t.sectionDeco}
              {prem&&<span style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",fontSize:"0.58rem",padding:"0.1rem 0.45rem",borderRadius:20,fontWeight:700}}>{t.premiumBadge}</span>}
            </div>
            <ol style={{listStyle:"none",padding:0,margin:0}}>
              {recipe.decoration.map((s,i)=>(
                <li key={i} style={{display:"flex",gap:9,marginBottom:i<recipe.decoration.length-1?9:0,alignItems:"flex-start"}}>
                  <div style={{background:prem?"linear-gradient(135deg,#7c3aed,#a855f7)":"linear-gradient(135deg,#3A5A40,#5A8A62)",color:"white",width:23,height:23,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem",fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</div>
                  <div style={{fontSize:"0.86rem",lineHeight:1.6,color:prem?"#e2d4f8":"#c2ecd0"}}>{s}</div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Tip */}
        {recipe.tip&&(
          <div style={{marginBottom:18}}>
            <ST label={t.sectionTip}/>
            <div style={{background:"linear-gradient(135deg,#F0F7F0,#E8F2E8)",borderLeft:"3px solid #3A5A40",padding:"0.85rem 1rem",borderRadius:"0 10px 10px 0",fontSize:"0.89rem",color:"#2A4A30",lineHeight:1.6}}> {recipe.tip}</div>
          </div>
        )}

        {/* Variants */}
        {recipe.variants?.length>0&&(
          <div style={{marginBottom:18}}>
            <ST label={t.sectionVariants}/>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {recipe.variants.map((v,i)=><div key={i} style={{background:"#FDF6EC",border:"1px solid rgba(200,96,58,0.12)",padding:"0.6rem 0.88rem",borderRadius:10,fontSize:"0.86rem",lineHeight:1.5}}>{v}</div>)}
            </div>
          </div>
        )}

        {/* Anti-waste */}
        {recipe.anti_waste&&(
          <div style={{marginBottom:18}}>
            <ST label={t.sectionAntiWaste} color="#3A5A40"/>
            <div style={{background:"#F0F7F0",borderLeft:"3px solid #3A5A40",padding:"0.82rem 1rem",borderRadius:"0 10px 10px 0",fontSize:"0.87rem",color:"#2A4A30",lineHeight:1.5}}>{recipe.anti_waste}</div>
          </div>
        )}

        {/* Allergens */}
        {recipe.allergens?.length>0&&(
          <div style={{marginBottom:4}}>
            <ST label={t.sectionAllergens} color="#856404"/>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {recipe.allergens.map((a,i)=><span key={i} style={{background:"#fff3cd",border:"1px solid #ffc107",color:"#856404",padding:"0.18rem 0.62rem",borderRadius:20,fontSize:"0.77rem",fontWeight:600}}>{a}</span>)}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{display:"flex",gap:7,padding:"0.95rem 1.6rem",borderTop:"1px solid #F5E6C8",flexWrap:"wrap"}}>
        <button onClick={onSave} style={{background:isSaved?"#3A5A40":"#F5E6C8",color:isSaved?"white":"#2C2416",border:"none",padding:"0.55rem 0.95rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.79rem"}}>
          {isSaved?t.saved:t.saveBtn}
        </button>
        <button onClick={handleShare} style={{background:shared?"#3A5A40":"#F5E6C8",color:shared?"white":"#2C2416",border:"none",padding:"0.55rem 0.95rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.79rem"}}>
          {shared?t.shareCopied:t.shareBtn}
        </button>
        <button onClick={handleWhatsapp} style={{background:"#25D366",color:"white",border:"none",padding:"0.55rem 0.95rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.79rem"}}>
          {t.shareWhatsapp}
        </button>
        <button onClick={()=>setShowStores(s=>!s)} style={{background:showStores?"#C8603A":"#F5E6C8",color:showStores?"white":"#2C2416",border:"none",padding:"0.55rem 0.95rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.79rem"}}>
          {t.findStore}
        </button>
        <button onClick={handlePhoto} disabled={canvasLoading} style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"white",border:"none",padding:"0.55rem 0.95rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.79rem",opacity:canvasLoading?0.6:1}}>
          {canvasLoading?t.photoLoading:t.photoBtn}
        </button>
      </div>

      {/* Où acheter */}
      {showStores&&(
        <div style={{padding:"1.2rem 1.6rem",borderTop:"1px solid #F5E6C8",background:"#FFFDF9"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:"0.9rem",fontWeight:700,color:"#C8603A"}}>{t.storeTitle}</div>
            <button onClick={()=>setShowStores(false)} style={{background:"none",border:"none",cursor:"pointer",color:"#8A7A6A",fontSize:"0.9rem"}}>{t.storeClose}</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {recipe.ingredients.slice(0,8).map((ing,i)=>{
              const store=getStoresForIngredient(ing);
              return(
                <div key={i} style={{background:"#FDF6EC",borderRadius:10,padding:"0.6rem 0.9rem",border:"1px solid rgba(200,96,58,0.1)"}}>
                  <div style={{fontSize:"0.82rem",fontWeight:700,marginBottom:4}}>{store.icon} {ing}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {store.places.map((p,j)=>(
                      <span key={j} style={{background:"white",border:"1px solid #F5E6C8",borderRadius:20,padding:"0.15rem 0.55rem",fontSize:"0.72rem",color:"#5A8A62",fontWeight:600}}>📍 {p}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SPINNER ──────────────────────────────────────────────────────────────────
function Spinner({t}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"1.4rem",justifyContent:"center",color:"#8A7A6A"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{width:22,height:22,border:"2.5px solid #F5E6C8",borderTopColor:"#C8603A",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
      <span style={{fontSize:"0.88rem"}}>{t.spinnerText}</span>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Plateio(){
  const [lang,setLang]=useState("fr");
  const [themeId,setThemeId]=useState("terracotta");
  const [tab,setTab]=useState("ai");
  const [page,setPage]=useState("home"); // "home" | "recipe"
  const [activeRecipe,setActiveRecipe]=useState(null);
  const t=T[lang];
  const th=THEMES[themeId];
  const isRtl=lang==="ar";
  const mealTypes=MEAL_TYPES_MAP[lang]||MEAL_TYPES_MAP.fr;

  // Form state
  const [mealType,setMealType]=useState(0);
  const [currency,setCurrency]=useState("MAD");
  const [budgetIdx,setBudgetIdx]=useState(2);
  const [prepTime,setPrepTime]=useState("30 min");
  const [servings,setServings]=useState("2");
  const [dietary,setDietary]=useState("");
  const [cuisine,setCuisine]=useState(0);
  const [age,setAge]=useState(30);

  // Loading/error state
  const [aiLoading,setAiLoading]=useState(false);
  const [aiError,setAiError]=useState("");
  const [ingInput,setIngInput]=useState("");
  const [ingredients,setIngredients]=useState([]);
  const [ingLoading,setIngLoading]=useState(false);
  const [ingError,setIngError]=useState("");
  const [surpriseLoading,setSurpriseLoading]=useState(false);
  const [surpriseError,setSurpriseError]=useState("");
  const [ramadanMeal,setRamadanMeal]=useState("ftour");
  const [ramadanLoading,setRamadanLoading]=useState(false);
  const [ramadanError,setRamadanError]=useState("");
  const [familleMembers,setFamilleMembers]=useState([{name:"",age:30,id:1}]);
  const [familleLoading,setFamilleLoading]=useState(false);
  const [familleError,setFamilleError]=useState("");

  // Profil utilisateur
  const [profil,setProfil]=useState({name:"",city:"",quartier:"",phone:"",bio:""});
  const [profilSaved,setProfilSaved]=useState(false);
  const [locating,setLocating]=useState(false);
  const [locMsg,setLocMsg]=useState("");

  // App data
  const [shopping,setShopping]=useState([]);
  const [history,setHistory]=useState([]);
  const [savedIds,setSavedIds]=useState(new Set());
  const [notif,setNotif]=useState("");

  const budgetSteps=BUDGET_STEPS[currency];
  const budget=budgetSteps[budgetIdx];
  const ageProfile=getAgeProfile(age);
  const shoppingSet=new Set(shopping.map(i=>i.text));
  const unchecked=shopping.filter(i=>!i.checked).length;

  function showNotif(msg){setNotif(msg);setTimeout(()=>setNotif(""),2500);}

  function openRecipe(recipe){ setActiveRecipe(recipe); setPage("recipe"); }
  function closeRecipe(){ setPage("home"); }

  function addOneToShopping(text){
    if(shoppingSet.has(text))return;
    setShopping(p=>[...p,{text,checked:false,id:Math.random()}]);
    showNotif(` "${text.length>28?text.slice(0,28)+"…":text}" ${t.added}!`);
  }

  function saveRecipe(recipe){
    if(savedIds.has(recipe.name))return;
    setSavedIds(s=>new Set([...s,recipe.name]));
    setHistory(h=>[{...recipe,savedAt:new Date().toLocaleDateString(),id:Math.random()},...h]);
    showNotif(`"${recipe.name}" ${t.saved}!`);
  }

  async function generateRecipe(){
    setAiLoading(true);setAiError("");
    try{
      const r=await callClaude(buildPrompt({mealType:mealTypes[mealType],budget:budget.label,prepTime,servings,dietary,cuisine:CUISINES[cuisine].en,agePrompt:ageProfile.prompt,lang}));
      openRecipe(r);
    }catch(e){console.error("Generate error:",e); setAiError(t.errorMsg+" — "+e.message);}
    setAiLoading(false);
  }

  async function searchByIngredients(){
    setIngLoading(true);setIngError("");
    try{
      const r=await callClaude(buildPrompt({mealType:"any dish",budget:"affordable",prepTime:"30 min",servings:"2",dietary:"using: "+ingredients.join(", "),agePrompt:"for an adult",lang,cuisine:"any cuisine"}));
      openRecipe(r);
    }catch(e){console.error("Ing error:",e); setIngError(t.errorMsg+" — "+e.message);}
    setIngLoading(false);
  }

  async function generateSurprise(){
    setSurpriseLoading(true);setSurpriseError("");
    const theme=SURPRISE_THEMES[Math.floor(Math.random()*SURPRISE_THEMES.length)];
    try{
      const r=await callClaude(buildPrompt({mealType:"main course",budget:BUDGET_STEPS[currency][Math.floor(Math.random()*5)].label,prepTime:PREP_TIMES[Math.floor(Math.random()*3)],servings:"2",dietary:"",agePrompt:"for an adult",lang,theme,cuisine:"any cuisine"}));
      openRecipe(r);
    }catch(e){setSurpriseError(t.errorMsg);}
    setSurpriseLoading(false);
  }

  async function generateRamadan(){
    setRamadanLoading(true);setRamadanError("");
    const dishes=RAMADAN_DISHES[ramadanMeal];
    const dish=dishes[Math.floor(Math.random()*dishes.length)];
    try{
      const r=await callClaude(buildPrompt({
        mealType:dish, budget:"affordable", prepTime:"45 min",
        servings:"4", dietary:"traditional Moroccan Ramadan recipe",
        agePrompt:"for a family", lang, cuisine:"Moroccan cuisine",
        theme:`authentic Ramadan ${ramadanMeal==="ftour"?"iftar":"suhoor"} dish`
      }));
      openRecipe(r);
    }catch(e){setRamadanError(t.errorMsg);}
    setRamadanLoading(false);
  }

  async function generateFamille(){
    if(familleMembers.filter(m=>m.name||m.age).length===0){setFamilleError(t.familleEmpty);return;}
    setFamilleLoading(true);setFamilleError("");
    const profiles=familleMembers.map(m=>`${m.name||"membre"} (${m.age} ans: ${getAgeProfile(Number(m.age)).prompt})`).join(", ");
    try{
      const r=await callClaude(buildPrompt({
        mealType:mealTypes[mealType], budget:budget.label, prepTime:"45 min",
        servings:String(familleMembers.length), dietary:`suitable for ALL these family members: ${profiles}. Adapt textures, spices and portions for each age group`,
        agePrompt:"for a mixed-age family group", lang, cuisine:CUISINES[cuisine].en
      }));
      openRecipe(r);
    }catch(e){setFamilleError(t.errorMsg);}
    setFamilleLoading(false);
  }

  function detectLocation(){
    if(!navigator.geolocation){setLocMsg("Non supporté");return;}
    setLocating(true);setLocMsg("");
    navigator.geolocation.getCurrentPosition(
      async (pos)=>{
        const {latitude,longitude}=pos.coords;
        try{
          const res=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data=await res.json();
          const city=data.address?.city||data.address?.town||data.address?.village||"";
          const quartier=data.address?.suburb||data.address?.neighbourhood||data.address?.quarter||"";
          setProfil(p=>({...p,city,quartier}));
          setLocMsg(t.profilLocated);
        }catch(e){setLocMsg("Erreur de localisation");}
        setLocating(false);
      },
      ()=>{setLocMsg("Accès refusé");setLocating(false);}
    );
  }

  function saveProfil(){
    setProfilSaved(true);
    showNotif(t.profilSaved);
    setTimeout(()=>setProfilSaved(false),3000);
  }

  function addIngredient(){
    const val=ingInput.trim().toLowerCase();
    if(!val||ingredients.includes(val))return;
    setIngredients(p=>[...p,val]);setIngInput("");
  }

  const track=(pct,color)=>`linear-gradient(to right,${color} 0%,${color} ${pct}%,${th.accent} ${pct}%,${th.accent} 100%)`;
  const budgetPct=(budgetIdx/(budgetSteps.length-1))*100,agePct=((age-1)/99)*100;

  const card={background:th.card,borderRadius:18,padding:"1.4rem",boxShadow:`0 4px 24px ${th.shadow}`,border:`1px solid ${th.border}`,marginBottom:14};
  const sel={width:"100%",padding:"0.65rem 0.88rem",border:`2px solid ${th.accent}`,borderRadius:10,fontFamily:"inherit",fontSize:"0.89rem",color:th.text,background:th.bg,outline:"none"};
  const lbl={display:"block",fontSize:"0.68rem",fontWeight:700,color:th.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4};
  const btnP={background:th.primary,color:"white",border:"none",padding:"0.7rem 1.2rem",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:"0.87rem",display:"flex",alignItems:"center",gap:6};
  const btnS={background:th.accent,color:th.text,border:"none",padding:"0.68rem 1rem",borderRadius:10,cursor:"pointer",fontWeight:500,fontSize:"0.85rem"};
  const tabSt=(tb)=>({flex:1,border:"none",padding:"0.62rem 0.25rem",borderRadius:10,cursor:"pointer",fontWeight:500,fontSize:"0.74rem",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center",gap:3,background:tab===tb?th.card:"none",color:tab===tb?th.text:th.muted,boxShadow:tab===tb?`0 2px 8px ${th.shadow}`:"none"});

  const Notif = () => notif ? (
    <div style={{position:"fixed",bottom:"1.4rem",right:isRtl?"auto":"1.4rem",left:isRtl?"1.4rem":"auto",background:"#3A5A40",color:"white",padding:"0.72rem 1.05rem",borderRadius:10,fontSize:"0.83rem",fontWeight:500,boxShadow:"0 8px 24px rgba(0,0,0,0.18)",zIndex:1000}}>
      <style>{`@keyframes sIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div style={{animation:"sIn 0.2s ease"}}>{notif}</div>
    </div>
  ) : null;

  // ══════════════════════════════════════════════════════════════════════════════
  // PAGE : RECIPE (page dédiée, remplace tout l'écran)
  // ══════════════════════════════════════════════════════════════════════════════
  if(page==="recipe" && activeRecipe){
    return(
      <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:th.bg,minHeight:"100vh",color:th.text,direction:isRtl?"rtl":"ltr"}}>
        {/* Sticky top bar */}
        <div style={{background:th.card,borderBottom:`1px solid ${th.accent}`,padding:"0.8rem 1.2rem",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200,boxShadow:`0 2px 10px ${th.shadow}`}}>
          <button onClick={closeRecipe}
            style={{background:th.accent,color:th.text,border:"none",padding:"0.5rem 0.95rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.83rem",display:"flex",alignItems:"center",gap:5}}>
            ← {t.backToForm}
          </button>
          <div style={{fontWeight:800,fontSize:"1.05rem",color:th.primary}}>
            Plate<span style={{color:th.secondary,fontStyle:"italic",fontWeight:400}}>io</span>
          </div>
          <button onClick={()=>{closeRecipe();}}
            style={{background:th.primary,color:"white",border:"none",padding:"0.5rem 0.95rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.83rem",display:"flex",alignItems:"center",gap:5}}>
            {t.newRecipe}
          </button>
        </div>

        {/* Recipe content */}
        <div style={{maxWidth:820,margin:"0 auto",padding:"0.8rem 1rem 4rem"}}>
          <RecipeCard
            recipe={activeRecipe}
            onAddOne={addOneToShopping}
            shoppingSet={shoppingSet}
            onSave={()=>saveRecipe(activeRecipe)}
            isSaved={savedIds.has(activeRecipe.name)}
            t={t}
            lang={lang}
          />
        </div>
        <Notif/>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // PAGE : HOME
  // ══════════════════════════════════════════════════════════════════════════════
  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:th.bg,minHeight:"100vh",color:th.text,direction:isRtl?"rtl":"ltr"}}>

      {/* Header */}
      <div style={{padding:"1.1rem 1.4rem 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:"1.5rem",fontWeight:800,color:th.primary,letterSpacing:"-0.02em"}}>
          Plate<span style={{color:th.secondary,fontStyle:"italic",fontWeight:400}}>io</span>
        </div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
          {LANGUAGES.map(l=>(
            <button key={l.code} onClick={()=>{setLang(l.code);setMealType(0);}} title={l.name}
              style={{background:lang===l.code?th.primary:th.accent,color:lang===l.code?"white":th.text,border:"none",borderRadius:20,padding:"0.22rem 0.52rem",cursor:"pointer",fontSize:"0.82rem",fontWeight:lang===l.code?700:400,transition:"all 0.2s"}}>
              {l.flag}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div style={{textAlign:"center",padding:"1rem 1.4rem 0.5rem"}}>
        <h1 style={{fontSize:"clamp(1.5rem,4vw,2.4rem)",lineHeight:1.15,marginBottom:4,fontWeight:800}}>
          Plate<em style={{color:th.primary}}>io</em>
        </h1>
        <p style={{color:th.muted,fontSize:"0.87rem",maxWidth:360,margin:"0 auto"}}>{t.appTagline}</p>
      </div>

      <div style={{maxWidth:860,margin:"0 auto",padding:"0.7rem 0.9rem 3rem"}}>

        {/* Tabs row 1 */}
        <div style={{display:"flex",background:th.accent,borderRadius:12,padding:"0.22rem",marginBottom:4,gap:2}}>
          {[["ai",t.tabGenerate],["ingredients",t.tabIngredients],["shopping",t.tabShopping],["history",t.tabHistory],["surprise",t.tabSurprise]].map(([tb,label])=>(
            <button key={tb} style={tabSt(tb)} onClick={()=>setTab(tb)}>
              {label}
              {tb==="shopping"&&unchecked>0&&<span style={{background:"#C8603A",color:"white",fontSize:"0.58rem",padding:"0.05rem 0.36rem",borderRadius:10,fontWeight:700}}>{unchecked}</span>}
              {tb==="history"&&history.length>0&&<span style={{background:"#5A8A62",color:"white",fontSize:"0.58rem",padding:"0.05rem 0.36rem",borderRadius:10,fontWeight:700}}>{history.length}</span>}
            </button>
          ))}
        </div>
        {/* Tabs row 2 — special modes */}
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {[["ramadan",t.tabRamadan,"linear-gradient(135deg,#1a3a2a,#2d6a4f)"],["famille",t.tabFamille,"linear-gradient(135deg,#8B4513,#C8603A)"],["profil",t.tabProfil,"linear-gradient(135deg,#3A5AB8,#5A7AD8)"]].map(([tb,label,bg])=>(
            <button key={tb} onClick={()=>setTab(tb)}
              style={{flex:1,background:tab===tb?bg:"#F5E6C8",color:tab===tb?"white":"#2C2416",border:"none",padding:"0.55rem 0.5rem",borderRadius:10,cursor:"pointer",fontWeight:tab===tb?700:500,fontSize:"0.8rem",transition:"all 0.2s"}}>
              {label}
            </button>
          ))}
        </div>

        {/* ══ TAB: GENERATE ══ */}
        {tab==="ai"&&(
          <div>
            <div style={card}>
              <div style={{fontSize:"1rem",fontWeight:700,marginBottom:13}}>{t.generateTitle}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                <div><label style={lbl}>{t.mealTypeLabel}</label>
                  <select style={sel} value={mealType} onChange={e=>setMealType(Number(e.target.value))}>
                    {mealTypes.map((mt,i)=><option key={i} value={i}>{mt}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>{t.prepTimeLabel}</label>
                  <select style={sel} value={prepTime} onChange={e=>setPrepTime(e.target.value)}>
                    {PREP_TIMES.map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>{t.servingsLabel}</label>
                  <select style={sel} value={servings} onChange={e=>setServings(e.target.value)}>
                    {SERVINGS_OPTS.map(s=><option key={s} value={s}>{s} {Number(s)>1?t.personsPlural:t.persons}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>{t.dietaryLabel}</label>
                  <input style={sel} placeholder={t.dietaryPlaceholder} value={dietary} onChange={e=>setDietary(e.target.value)}/>
                </div>
              </div>

              {/* Cuisine */}
              <div style={{marginBottom:10}}>
                <label style={lbl}>{t.cuisineLabel}</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {CUISINES.map((c,i)=>(
                    <button key={i} onClick={()=>setCuisine(i)}
                      style={{background:cuisine===i?"#C8603A":"#FDF6EC",color:cuisine===i?"white":"#2C2416",border:`1.5px solid ${cuisine===i?"#C8603A":"#F5E6C8"}`,borderRadius:20,padding:"0.26rem 0.62rem",cursor:"pointer",fontSize:"0.79rem",fontWeight:cuisine===i?700:400,transition:"all 0.18s",whiteSpace:"nowrap"}}>
                      {c.flag} {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency selector */}
              <div style={{marginBottom:10}}>
                <label style={lbl}>{t.currencyLabel}</label>
                <div style={{display:"flex",gap:7}}>
                  {CURRENCIES.map(c=>(
                    <button key={c.code} onClick={()=>{setCurrency(c.code);setBudgetIdx(2);}}
                      style={{flex:1,background:currency===c.code?"#C8603A":"#FDF6EC",color:currency===c.code?"white":"#2C2416",border:`2px solid ${currency===c.code?"#C8603A":"#F5E6C8"}`,borderRadius:10,padding:"0.55rem 0.4rem",cursor:"pointer",fontWeight:currency===c.code?700:500,fontSize:"0.85rem",transition:"all 0.18s",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                      <span style={{fontSize:"1.2rem"}}>{c.flag}</span>
                      <span style={{fontSize:"0.72rem",fontWeight:700}}>{c.symbol}</span>
                      <span style={{fontSize:"0.65rem",opacity:0.8}}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div style={{marginBottom:10}}>
                <label style={lbl}>{t.budgetLabel}</label>
                <div style={{background:"#FDF6EC",border:"2px solid #F5E6C8",borderRadius:10,padding:"0.72rem 0.95rem 0.5rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
                    <span style={{fontSize:"1.1rem",fontWeight:700,color:"#C8603A"}}>{budget.label}</span>
                    <span style={{fontSize:"0.65rem",fontWeight:700,background:budget.color,color:"white",padding:"0.14rem 0.5rem",borderRadius:20}}>{budget.tag}</span>
                  </div>
                  <input type="range" min={0} max={budgetSteps.length-1} value={budgetIdx} onChange={e=>setBudgetIdx(Number(e.target.value))}
                    style={{width:"100%",height:4,borderRadius:2,outline:"none",cursor:"pointer",appearance:"none",background:track(budgetPct,budget.color)}}/>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.58rem",color:"#8A7A6A",marginTop:3}}>
                    {budgetSteps.map(s=><span key={s.label}>{s.amount===9999?"∞":s.label}</span>)}
                  </div>
                </div>
              </div>

              {/* Age */}
              <div style={{marginBottom:14}}>
                <label style={lbl}>{t.ageLabel}</label>
                <div style={{background:"#FDF6EC",border:"2px solid #F5E6C8",borderRadius:10,padding:"0.72rem 0.95rem 0.5rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:"1.1rem",fontWeight:700}}>{age===1?"1 an":`${age} ans`}</span>
                    <span style={{fontSize:"0.65rem",fontWeight:700,background:ageProfile.color,color:"white",padding:"0.14rem 0.5rem",borderRadius:20}}>{ageProfile.emoji} {ageProfile.label}</span>
                  </div>
                  <input type="range" min={1} max={100} value={age} onChange={e=>setAge(Number(e.target.value))}
                    style={{width:"100%",height:4,borderRadius:2,outline:"none",cursor:"pointer",appearance:"none",background:track(agePct,ageProfile.color)}}/>
                  <div style={{fontSize:"0.75rem",color:"#8A7A6A",marginTop:5}}>{ageProfile.desc}</div>
                </div>
              </div>

              <button style={{...btnP,width:"100%",justifyContent:"center"}} onClick={generateRecipe} disabled={aiLoading}>
                {aiLoading?t.generating:t.generateBtn}
              </button>
            </div>
            {aiLoading&&<Spinner t={t}/>}
            {aiError&&<div style={{...card,borderColor:"#C8603A",color:"#C8603A",fontSize:"0.87rem"}}>{aiError}</div>}
          </div>
        )}

        {/* ══ TAB: INGREDIENTS ══ */}
        {tab==="ingredients"&&(
          <div>
            <div style={card}>
              <div style={{fontSize:"1rem",fontWeight:700,marginBottom:5}}>{t.ingredientsTitle}</div>
              <div style={{fontSize:"0.85rem",color:"#8A7A6A",marginBottom:11}}>{t.ingredientsSubtitle}</div>
              <div style={{display:"flex",gap:7,marginBottom:10}}>
                <input style={{...sel,flex:1}} placeholder={t.ingredientPlaceholder} value={ingInput}
                  onChange={e=>setIngInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addIngredient()}/>
                <button style={btnP} onClick={addIngredient}>{t.addBtn}</button>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,minHeight:30}}>
                {ingredients.length===0
                  ?<span style={{color:"#8A7A6A",fontSize:"0.82rem"}}>{t.ingredientPlaceholder}</span>
                  :ingredients.map((ing,i)=>(
                    <div key={i} style={{background:"#F5E6C8",border:"1px solid rgba(200,96,58,0.2)",padding:"0.24rem 0.6rem",borderRadius:20,fontSize:"0.82rem",display:"flex",alignItems:"center",gap:4}}>
                      {ing}<button onClick={()=>setIngredients(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#8A7A6A",fontSize:"0.7rem",padding:0}}>✕</button>
                    </div>
                  ))}
              </div>
            </div>
            <div style={{display:"flex",gap:7,marginBottom:12}}>
              <button style={{...btnP,opacity:ingredients.length===0?0.5:1}} onClick={searchByIngredients} disabled={ingredients.length===0||ingLoading}>
                {ingLoading?t.searching:t.searchBtn}
              </button>
              <button style={btnS} onClick={()=>setIngredients([])}>{t.clearAll}</button>
            </div>
            {ingLoading&&<Spinner t={t}/>}
            {ingError&&<div style={{...card,borderColor:"#C8603A",color:"#C8603A",fontSize:"0.87rem"}}>{ingError}</div>}
          </div>
        )}

        {/* ══ TAB: SHOPPING ══ */}
        {tab==="shopping"&&(
          <div>
            {shopping.length===0?(
              <div style={{textAlign:"center",padding:"2.5rem 1rem",color:"#8A7A6A"}}>
                <div style={{fontSize:"2rem",marginBottom:10,opacity:0.3,color:th.muted}}>—</div>
                <p style={{fontSize:"0.87rem",lineHeight:1.7}}><strong>{t.shoppingEmpty}</strong><br/>{t.shoppingEmptySub}</p>
              </div>
            ):(
              <>
                <div style={card}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div style={{fontSize:"1rem",fontWeight:700}}>{t.shoppingTitle}</div>
                    <span style={{fontSize:"0.76rem",color:"#8A7A6A"}}>{shopping.filter(i=>i.checked).length}/{shopping.length}</span>
                  </div>
                  <ul style={{listStyle:"none",padding:0,margin:0}}>
                    {shopping.map((item,i)=>(
                      <li key={item.id} style={{display:"flex",alignItems:"center",gap:9,padding:"0.52rem 0",borderBottom:i<shopping.length-1?"1px solid #F5E6C8":"none"}}>
                        <input type="checkbox" checked={item.checked}
                          onChange={()=>setShopping(p=>p.map((x,j)=>j===i?{...x,checked:!x.checked}:x))}
                          style={{width:15,height:15,accentColor:"#C8603A",cursor:"pointer",flexShrink:0}}/>
                        <label onClick={()=>setShopping(p=>p.map((x,j)=>j===i?{...x,checked:!x.checked}:x))}
                          style={{flex:1,fontSize:"0.88rem",cursor:"pointer",textDecoration:item.checked?"line-through":"none",opacity:item.checked?0.4:1}}>
                          {item.text}
                        </label>
                        <button onClick={()=>setShopping(p=>p.filter((_,j)=>j!==i))}
                          style={{background:"none",border:"none",cursor:"pointer",color:"#8A7A6A",fontSize:"0.85rem"}}>✕</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  <button style={btnS} onClick={()=>setShopping(p=>p.filter(i=>!i.checked))}>{t.deleteChecked}</button>
                  <button style={btnS} onClick={()=>setShopping([])}>{t.clearList}</button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ══ TAB: HISTORY ══ */}
        {tab==="history"&&(
          <div>
            {history.length===0?(
              <div style={{textAlign:"center",padding:"2.5rem 1rem",color:"#8A7A6A"}}>
                <div style={{fontSize:"2rem",marginBottom:10,opacity:0.3,color:th.muted}}>—</div>
                <p style={{fontSize:"0.87rem",lineHeight:1.7}}><strong>{t.historyEmpty}</strong><br/>{t.historyEmptySub}</p>
              </div>
            ):(
              <div>
                <div style={{fontSize:"1rem",fontWeight:700,marginBottom:12}}>{t.historyTitle}</div>
                <div style={{display:"flex",flexDirection:"column",gap:9}}>
                  {history.map((r,i)=>(
                    <div key={r.id} style={{background:"#FFFDF9",borderRadius:13,padding:"0.95rem 1.2rem",boxShadow:"0 2px 12px rgba(44,36,22,0.07)",border:"1px solid rgba(200,96,58,0.08)",display:"flex",alignItems:"center",gap:11,flexWrap:"wrap"}}>
                      <div style={{flex:1,minWidth:130}}>
                        <div style={{fontWeight:700,fontSize:"0.93rem",marginBottom:2}}>{r.name}</div>
                        <div style={{fontSize:"0.75rem",color:"#8A7A6A"}}>{r.time} · {r.budget} · {r.savedAt}</div>
                      </div>
                      <div style={{display:"flex",gap:5}}>
                        <button onClick={()=>openRecipe(r)} style={{...btnP,padding:"0.42rem 0.8rem",fontSize:"0.76rem"}}>{t.viewRecipe}</button>
                        <button onClick={()=>{setHistory(h=>h.filter((_,j)=>j!==i));setSavedIds(s=>{const n=new Set(s);n.delete(r.name);return n;});}}
                          style={{...btnS,padding:"0.42rem 0.72rem",fontSize:"0.76rem"}}>{t.deleteHistory}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ TAB: SURPRISE ══ */}
        {tab==="surprise"&&(
          <div>
            <div style={{...card,textAlign:"center",padding:"2rem 1.4rem"}}>
              
              <div style={{fontSize:"1.15rem",fontWeight:800,marginBottom:7}}>{t.surpriseTitle}</div>
              <div style={{fontSize:"0.88rem",color:"#8A7A6A",marginBottom:18,lineHeight:1.5}}>{t.surpriseSubtitle}</div>
              <button
                style={{...btnP,justifyContent:"center",fontSize:"0.97rem",padding:"0.82rem 2rem",background:"linear-gradient(135deg,#C8603A,#9B3A8A)",margin:"0 auto"}}
                onClick={generateSurprise} disabled={surpriseLoading}>
                {surpriseLoading?t.generating:t.surpriseBtn}
              </button>
            </div>
            {surpriseLoading&&<Spinner t={t}/>}
            {surpriseError&&<div style={{...card,borderColor:"#C8603A",color:"#C8603A",fontSize:"0.87rem"}}>{surpriseError}</div>}
          </div>
        )}

        {/* ══ TAB: RAMADAN 🌙 ══ */}
        {tab==="ramadan"&&(
          <div>
            <div style={{...card,background:"linear-gradient(135deg,#0d2b1a,#1a3a2a)",border:"none"}}>
              <div style={{textAlign:"center",marginBottom:16}}>
                
                <div style={{fontSize:"1.1rem",fontWeight:800,color:"#90d4a8",marginBottom:4}}>{t.ramadanTitle}</div>
                <div style={{fontSize:"0.84rem",color:"rgba(144,212,168,0.7)"}}>{t.ramadanSubtitle}</div>
              </div>
              {/* Ftour / Shour selector */}
              <div style={{display:"flex",gap:8,marginBottom:18}}>
                {[["ftour",t.ramadanFtour,"🌅"],["shour",t.ramadanShour,"🌙"]].map(([k,label,ico])=>(
                  <button key={k} onClick={()=>setRamadanMeal(k)}
                    style={{flex:1,background:ramadanMeal===k?"linear-gradient(135deg,#2d6a4f,#40916c)":"rgba(255,255,255,0.07)",color:ramadanMeal===k?"white":"rgba(144,212,168,0.8)",border:`1.5px solid ${ramadanMeal===k?"#40916c":"rgba(144,212,168,0.2)"}`,borderRadius:12,padding:"0.8rem",cursor:"pointer",fontWeight:700,fontSize:"0.9rem",transition:"all 0.2s"}}>
                    
                    {label}
                  </button>
                ))}
              </div>
              <div style={{marginBottom:12,color:"rgba(144,212,168,0.6)",fontSize:"0.78rem",textAlign:"center"}}>
                {ramadanMeal==="ftour"?"Soupe, dattes, plats salés et sucrés":"Plats légers et nourrissants pour tenir la journée"}
              </div>
              <button onClick={generateRamadan} disabled={ramadanLoading}
                style={{...btnP,width:"100%",justifyContent:"center",background:"linear-gradient(135deg,#2d6a4f,#40916c)",fontSize:"0.95rem",padding:"0.8rem"}}>
                {ramadanLoading?t.generating:t.ramadanBtn}
              </button>
            </div>
            {ramadanLoading&&<Spinner t={t}/>}
            {ramadanError&&<div style={{...card,borderColor:"#C8603A",color:"#C8603A",fontSize:"0.87rem"}}>{ramadanError}</div>}
            {/* List of Ramadan dishes */}
            <div style={card}>
              <div style={{fontSize:"0.75rem",fontWeight:700,color:"#8A7A6A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>
                Plats {ramadanMeal==="ftour"?"Ftour":"Shour"} disponibles
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {RAMADAN_DISHES[ramadanMeal].map((d,i)=>(
                  <span key={i} style={{background:"#FDF6EC",border:"1px solid #F5E6C8",borderRadius:20,padding:"0.22rem 0.65rem",fontSize:"0.77rem",color:"#2C2416"}}>
                    {d.split("(")[0].trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: FAMILLE 👨‍👩‍👧 ══ */}
        {tab==="famille"&&(
          <div>
            <div style={card}>
              <div style={{fontSize:"1.1rem",fontWeight:800,marginBottom:4}}>{t.familleTitle}</div>
              <div style={{fontSize:"0.84rem",color:"#8A7A6A",marginBottom:14}}>{t.familleSubtitle}</div>

              {/* Family members */}
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
                {familleMembers.map((m,i)=>(
                  <div key={m.id} style={{display:"flex",gap:7,alignItems:"center",background:"#FDF6EC",borderRadius:10,padding:"0.6rem 0.8rem",border:"1px solid #F5E6C8"}}>
                    <span style={{fontSize:"1.2rem"}}>{getAgeProfile(Number(m.age)||30).emoji}</span>
                    <input placeholder={t.familleName} value={m.name}
                      onChange={e=>setFamilleMembers(p=>p.map((x,j)=>j===i?{...x,name:e.target.value}:x))}
                      style={{...sel,flex:2,padding:"0.4rem 0.6rem",fontSize:"0.84rem"}}/>
                    <input type="number" placeholder={t.familleAge} value={m.age} min={1} max={100}
                      onChange={e=>setFamilleMembers(p=>p.map((x,j)=>j===i?{...x,age:Number(e.target.value)}:x))}
                      style={{...sel,flex:1,padding:"0.4rem 0.6rem",fontSize:"0.84rem"}}/>
                    <span style={{fontSize:"0.72rem",color:getAgeProfile(Number(m.age)||30).color,fontWeight:700,whiteSpace:"nowrap"}}>
                      {getAgeProfile(Number(m.age)||30).label}
                    </span>
                    {familleMembers.length>1&&(
                      <button onClick={()=>setFamilleMembers(p=>p.filter((_,j)=>j!==i))}
                        style={{background:"none",border:"none",cursor:"pointer",color:"#8A7A6A",fontSize:"1rem"}}>{t.familleRemove}</button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{display:"flex",gap:7,marginBottom:14}}>
                <button onClick={()=>setFamilleMembers(p=>[...p,{name:"",age:30,id:Math.random()}])}
                  style={{...btnS,flex:1,textAlign:"center"}}>
                  {t.familleAddMember}
                </button>
              </div>

              {familleError&&<div style={{color:"#C8603A",fontSize:"0.83rem",marginBottom:8}}>{familleError}</div>}

              <button onClick={generateFamille} disabled={familleLoading}
                style={{...btnP,width:"100%",justifyContent:"center"}}>
                {familleLoading?t.generating:t.familleGenerate}
              </button>
            </div>
            {familleLoading&&<Spinner t={t}/>}
          </div>
        )}


        {/* ══ TAB: PROFIL 👤 ══ */}
        {tab==="profil"&&(
          <div>
            {/* Greeting card */}
            {profil.name&&(
              <div style={{background:"linear-gradient(135deg,#3A5AB8,#5A7AD8)",borderRadius:18,padding:"1.2rem 1.4rem",marginBottom:14,color:"white",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",flexShrink:0}}>
                  {profil.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{fontWeight:800,fontSize:"1.1rem"}}>{t.profilHello}, {profil.name} ! 👋</div>
                  {profil.city&&<div style={{opacity:0.85,fontSize:"0.85rem",marginTop:2}}>📍 {profil.quartier?profil.quartier+" — ":""}{profil.city}</div>}
                  {profil.phone&&<div style={{opacity:0.85,fontSize:"0.82rem"}}>📱 {profil.phone}</div>}
                </div>
              </div>
            )}

            <div style={card}>
              <div style={{fontSize:"1rem",fontWeight:800,marginBottom:16,color:th.text}}>{t.profilTitle}</div>

              {/* Theme selector */}
              <div style={{marginBottom:16}}>
                <label style={lbl}>Apparence</label>
                <div style={{display:"flex",gap:8}}>
                  {Object.entries(THEMES).map(([id,tm])=>(
                    <button key={id} onClick={()=>setThemeId(id)}
                      title={tm.name}
                      style={{flex:1,border:`2.5px solid ${themeId===id?tm.primary:"transparent"}`,borderRadius:12,padding:"8px 4px",cursor:"pointer",background:tm.bg,boxShadow:themeId===id?`0 0 0 1px ${tm.primary}`:"0 1px 4px rgba(0,0,0,0.1)",transition:"all 0.18s",display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                      <div style={{display:"flex",gap:3}}>
                        <div style={{width:12,height:12,borderRadius:"50%",background:tm.primary}}/>
                        <div style={{width:12,height:12,borderRadius:"50%",background:tm.secondary}}/>
                        <div style={{width:12,height:12,borderRadius:"50%",background:tm.accent,border:"1px solid rgba(0,0,0,0.1)"}}/>
                      </div>
                      <span style={{fontSize:"0.65rem",fontWeight:themeId===id?700:500,color:tm.text,background:tm.card,padding:"1px 5px",borderRadius:6}}>{tm.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div style={{marginBottom:11}}>
                <label style={lbl}>{t.profilName}</label>
                <input style={sel} placeholder={t.profilNamePlaceholder}
                  value={profil.name} onChange={e=>setProfil(p=>({...p,name:e.target.value}))}/>
              </div>

              {/* Phone */}
              <div style={{marginBottom:11}}>
                <label style={lbl}>{t.profilPhone}</label>
                <input style={sel} placeholder={t.profilPhonePlaceholder} type="tel"
                  value={profil.phone} onChange={e=>setProfil(p=>({...p,phone:e.target.value}))}/>
              </div>

              {/* Location section */}
              <div style={{background:"#F0F4FF",border:"1.5px solid #C5D0F0",borderRadius:12,padding:"1rem",marginBottom:11}}>
                <div style={{fontSize:"0.72rem",fontWeight:700,color:"#3A5AB8",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>📍 Localisation</div>

                {/* Detect button */}
                <button onClick={detectLocation} disabled={locating}
                  style={{background:locating?"#8A9ACC":"#3A5AB8",color:"white",border:"none",padding:"0.6rem 1rem",borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:"0.82rem",width:"100%",marginBottom:10,opacity:locating?0.7:1}}>
                  {locating?t.profilLocating:t.profilLocBtn}
                </button>
                {locMsg&&<div style={{fontSize:"0.78rem",color:locMsg.includes("✅")?"#3A5A40":"#C8603A",marginBottom:8,textAlign:"center"}}>{locMsg}</div>}

                {/* City */}
                <div style={{marginBottom:8}}>
                  <label style={lbl}>{t.profilCity}</label>
                  <input style={sel} placeholder={t.profilCityPlaceholder}
                    value={profil.city} onChange={e=>setProfil(p=>({...p,city:e.target.value}))}/>
                </div>

                {/* Quartier */}
                <div>
                  <label style={lbl}>{t.profilQuartier}</label>
                  <input style={sel} placeholder={t.profilQuartierPlaceholder}
                    value={profil.quartier} onChange={e=>setProfil(p=>({...p,quartier:e.target.value}))}/>
                </div>

                {profil.city&&(
                  <div style={{marginTop:10,fontSize:"0.76rem",color:"#5A7AD8",background:"white",borderRadius:8,padding:"0.5rem 0.7rem",border:"1px solid #C5D0F0"}}>
                    {t.profilStoreNote}
                  </div>
                )}
              </div>

              {/* Bio / preferences */}
              <div style={{marginBottom:16}}>
                <label style={lbl}>{t.profilBio}</label>
                <textarea style={{...sel,minHeight:70,resize:"vertical",lineHeight:1.5}}
                  placeholder={t.profilBioPlaceholder}
                  value={profil.bio} onChange={e=>setProfil(p=>({...p,bio:e.target.value}))}/>
              </div>

              <button onClick={saveProfil}
                style={{...btnP,width:"100%",justifyContent:"center",background:profilSaved?"#3A5A40":"#C8603A"}}>
                {profilSaved?t.profilSaved:t.profilSave}
              </button>
            </div>

            {/* Map link if city filled */}
            {profil.city&&(
              <div style={card}>
                <div style={{fontSize:"0.75rem",fontWeight:700,color:"#8A7A6A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>🗺️ Magasins près de {profil.city}</div>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {[
                    {name:"Marjane",icon:"",q:`Marjane ${profil.city} ${profil.quartier}`},
                    {name:"Carrefour",icon:"",q:`Carrefour ${profil.city}`},
                    {name:"BIM",icon:"",q:`BIM ${profil.city} ${profil.quartier}`},
                    {name:"Souk",icon:"",q:`Souk ${profil.quartier||profil.city}`},
                    {name:"Herboriste عطار",icon:"",q:`Herboriste عطار ${profil.quartier||profil.city}`},
                  ].map((s,i)=>(
                    <a key={i}
                      href={`https://www.google.com/maps/search/${encodeURIComponent(s.q)}`}
                      target="_blank" rel="noreferrer"
                      style={{display:"flex",alignItems:"center",gap:10,background:"#FDF6EC",border:"1px solid #F5E6C8",borderRadius:10,padding:"0.65rem 0.9rem",textDecoration:"none",color:"#2C2416",transition:"all 0.15s"}}>
                      <span style={{fontSize:"1.3rem"}}>{s.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:"0.88rem"}}>{s.name}</div>
                        <div style={{fontSize:"0.72rem",color:"#8A7A6A"}}>{profil.quartier||profil.city}</div>
                      </div>
                      <span style={{color:"#3A5AB8",fontSize:"0.8rem",fontWeight:600}}>Voir</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
      <Notif/>
    </div>
  );
}
