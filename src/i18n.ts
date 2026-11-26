/**
 * docs/50 (block G) — the card's own strings and time formatting.
 *
 * The English source text IS the key: `tr(hass, "Cancel · hold")` returns the
 * English text unchanged unless the active language has an entry in CS_DICT. A
 * missing translation therefore degrades to readable English, never to a key
 * name, and every existing English test and config keeps working.
 *
 * Placeholders are `{name}`. Plural forms are one string "one|few|many" (Czech
 * 1 / 2–4 / 0,5+) or "one|many" (English); `plural()` picks by language rules.
 *
 * Time formatting lives here too, in ONE place: it follows `hass.locale`
 * (language and the user's 12/24 h profile setting), not the browser locale.
 */

type HassShape = { language?: string; locale?: { language?: string; time_format?: string } };
/** Any `hass` object (the real type has no overlap guarantee with HassShape). */
type HassLike = object | undefined | null;
const shape = (h: HassLike): HassShape => (h ?? {}) as HassShape;

export type Lang = "en" | "cs";

export function langOf(hass: HassLike): Lang {
  const l = String(shape(hass).locale?.language ?? shape(hass).language ?? "en").toLowerCase();
  return l.startsWith("cs") ? "cs" : "en";
}

/** The BCP-47 tag handed to Intl: HA's own language wins over the browser's. */
function intlTag(hass: HassLike): string | undefined {
  return shape(hass).locale?.language || shape(hass).language || undefined;
}

/** HA profile "time_format": language | system | am_pm | twenty_four. */
function hour12Of(hass: HassLike): boolean | undefined {
  switch (shape(hass).locale?.time_format) {
    case "am_pm": return true;
    case "twenty_four": return false;
    default: return undefined; // follow the language (or system) default
  }
}

/** Clock time, honouring the user's 12/24 h setting. Empty string for junk. */
export function fmtClock(hass: HassLike, when: Date | string | number | undefined | null): string {
  if (when === undefined || when === null || when === "") return "";
  const d = when instanceof Date ? when : new Date(when);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(intlTag(hass), { hour: "2-digit", minute: "2-digit", hour12: hour12Of(hass) });
}

/** Short date (day + month) in the user's language. */
export function fmtDay(hass: HassLike, when: Date): string {
  return when.toLocaleDateString(intlTag(hass), { day: "2-digit", month: "2-digit" });
}

export function tr(hass: HassLike, key: string, params?: Record<string, string | number>): string {
  const lang = langOf(hass);
  let s = lang === "cs" ? (CS_TABLE[key] ?? key) : key;
  if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
  return s;
}

/** `n` + the right noun form: plural(hass, 3, "room|rooms") → "rooms". */
export function plural(hass: HassLike, n: number, key: string): string {
  const lang = langOf(hass);
  const raw = lang === "cs" ? (CS_TABLE[key] ?? key) : key;
  const f = raw.split("|");
  if (lang === "cs" && f.length === 3) return n === 1 ? f[0] : n >= 2 && n <= 4 ? f[1] : f[2];
  return n === 1 ? f[0] : (f[f.length - 1] ?? f[0]);
}

// ───────────────────────────── Czech ─────────────────────────────────────────
const CS_TABLE: Record<string, string> = {
  "Dock error: {name}": "Chyba doku: {name}",
  "Dry trail — tap to toggle, hold for rooms": "Suchá stopa – klepnutím přepneš, podržením zobrazíš místnosti",
  "Wet trail — tap to toggle, hold for rooms": "Mokrá stopa – klepnutím přepneš, podržením zobrazíš místnosti",
  "Show dry trail — tap to toggle": "Zobrazit suchou stopu – klepnutím přepneš",
  "Show wet trail — tap to toggle": "Zobrazit mokrou stopu – klepnutím přepneš",
  "Hold to trigger: {name}": "Podrž pro spuštění: {name}",
  "Last clean {when}": "Poslední úklid {when}",
  "Needs attention: {what}": "Vyžaduje pozornost: {what}",
  "dock and care": "dok a údržba",
  "dock": "dok",
  "care": "údržba",
  "check": "zkontrolovat",
  "Next: {room}": "Další: {room}",
  "Oldest room: {sub}": "Nejstarší místnost: {sub}",
  "Open {name} in Home Assistant": "Otevřít {name} v Home Assistantu",
  "Pause {name} (hold)": "Pozastavit {name} (podrž)",
  "Pin ready for {n} {vacuums} — pick one on its status card below.": "Špendlík připraven pro {n} {vacuums} – vyber jeden na stavové kartě níže.",
  "Zone ready for {n} {vacuums} — drag the box or its corners to adjust, then pick one on its status card below.": "Zóna připravena pro {n} {vacuums} – rámeček nebo rohy uprav tažením a pak vyber vysavač na stavové kartě níže.",
  "vacuum|vacuums": "vysavač|vysavače|vysavačů",
  "Reset {label}": "Resetovat {label}",
  "START": "START",
  "Stop {what}": "Zastavit {what}",
  "today": "dnes",
  "{n} d ago": "před {n} d",
  "vacuumed {when}": "vysáto {when}",
  "mopped {when}": "vytřeno {when}",
  "{names} are cleaning": "{names} uklízejí",
  "{names} is cleaning": "{names} uklízí",
  "{name} controls": "Ovládání {name}",
  "{name} sections": "Sekce {name}",
  "{name} in {room}": "{name}: {room}",
  "{name} mopping {room}": "{name} vytírá: {room}",
  "{name} — open controls": "{name} – otevřít ovládání",
  "{name} — tap for controls, hold to hide it on the map": "{name} – klepnutím ovládání, podržením skryješ robota na mapě",
  "{name} — tap for controls, hold to show it on the map": "{name} – klepnutím ovládání, podržením zobrazíš robota na mapě",
  // status labels (STATUS_MAP)
  "Cleaning": "Uklízí",
  "Cleaning rooms": "Uklízí místnosti",
  "Zone cleaning": "Úklid zóny",
  "Spot cleaning": "Bodový úklid",
  "Starting": "Startuje",
  "Mopping rooms": "Vytírá místnosti",
  "Zone mopping": "Vytírání zóny",
  "Mopping": "Vytírá",
  "Vacuuming+mopping": "Vysává a vytírá",
  "Rooms (vac)": "Místnosti (vysávání)",
  "Rooms (mop)": "Místnosti (vytírání)",
  "Zones (vac)": "Zóny (vysávání)",
  "Zones (mop)": "Zóny (vytírání)",
  "Washing mop": "Pere mop",
  "Going to wash mop": "Jede prát mop",
  "Drying mop": "Suší mop",
  "Dock + washing": "Dock + praní",
  "Returning home": "Vrací se do doku",
  "Docking": "Zajíždí do doku",
  "Going to target": "Jede na místo",
  "Charging": "Nabíjí se",
  "Fully charged": "Nabito",
  "Docked": "V doku",
  "Charger disconnected": "Nabíječka odpojena",
  "Emptying bin": "Vyprazdňuje koš",
  "Idle": "Nečinný",
  "Paused": "Pozastaveno",
  "Mapping": "Mapuje",
  "Charging problem": "Problém s nabíjením",
  "Error": "Chyba",
  "In call": "Probíhá hovor",
  "Locked": "Zamčeno",
  "Manual mode": "Ruční režim",
  "Offline": "Offline",
  "Remote control": "Dálkové ovládání",
  "Shutting down": "Vypíná se",
  "Updating": "Aktualizuje se",
  // plan / start / cancel
  "Start · hold": "Start · podrž",
  "Cancel · hold": "Zrušit · podrž",
  "Start · {scope} · hold": "Start · {scope} · podrž",
  "whole home": "celý byt",
  "Whole home": "Celý byt",
  "Whole plan": "Celý plán",
  "Clear": "Zrušit výběr",
  "Clear · whole home": "Zrušit výběr · celý byt",
  "Plan": "Plán",
  "{done} of {total} passes": "{done} z {total} průchodů",
  "Plan · {done} of {total} passes done": "Plán · hotovo {done} z {total} průchodů",
  "Done around {time}": "Hotovo kolem {time}",
  "~{min} min left": "zbývá ~{min} min",
  "{min} min left": "zbývá {min} min",
  "Selected · {n} {rooms}": "Vybráno · {n} {rooms}",
  "Whole home · {n} {rooms}": "Celý byt · {n} {rooms}",
  "{n} {rooms}": "{n} {rooms}",
  "room|rooms": "místnost|místnosti|místností",
  "Dry": "Suchý",
  "Wet": "Mokrý",
  "Both": "Oba",
  "dry": "suchý",
  "wet": "mokrý",
  "dry {who}": "suchý {who}",
  "wet {who}": "mokrý {who}",
  ", then ": ", poté ",
  "Tap rooms on the map to pick them": "Místnosti vybereš klepnutím na mapu",
  "{n} without a robot for this mode": "{n} bez robota pro tento režim",
  "Clean type — tap to change": "Druh úklidu – klepnutím změníš",
  "Requires the AnyVac integration": "Vyžaduje integraci AnyVac",
  "Room selection is off while placing a pin/zone": "Výběr místností je vypnutý při umísťování špendlíku/zóny",
  // tools
  "Refresh map": "Obnovit mapu",
  "Refresh maps": "Obnovit mapy",
  "Flip map": "Otočit mapu",
  "Flip map 180° for this screen (this session only)": "Otočit mapu o 180° na této obrazovce (jen pro tuto relaci)",
  "Align": "Zarovnat",
  "Align — full-screen manual floorplan seating": "Zarovnat – ruční usazení půdorysu na celou obrazovku",
  "Dry trail": "Suchá stopa",
  "Wet trail": "Mokrá stopa",
  "Send here": "Poslat sem",
  "Select rooms": "Vybrat místnosti",
  "Pick rooms on the map first": "Nejdřív vyber místnosti na mapě",
  "Send to dock": "Poslat do doku",
  "Home Assistant details": "Detaily v Home Assistantu",
  "Hold to pause": "Podrž pro pozastavení",
  "Pause": "Pozastavit",
  "Resume": "Pokračovat",
  "Dock": "Dok",
  "Close": "Zavřít",
  "Clean": "Uklidit",
  "Care": "Údržba",
  "Rooms": "Místnosti",
  "Refresh": "Obnovit",
  "Cancel": "Zrušit",
  "Zone": "Zóna",
  "Zone clean": "Úklid zóny",
  "Clean zone": "Uklidit zónu",
  "Pin & Go": "Špendlík a jeď",
  "Drag a rectangle on the map to set a cleaning zone.": "Tažením na mapě nakresli zónu úklidu.",
  "Tap the map to drop a pin.": "Klepnutím na mapu umístíš špendlík.",
  "Tap the map to send the robot there.": "Klepnutím na mapu pošleš robota na dané místo.",
  "Clean this zone? Drag the box or its corners to adjust.": "Uklidit tuto zónu? Rámeček nebo jeho rohy můžeš upravit tažením.",
  // hero
  "Home is calm": "V bytě je klid",
  "needs attention": "vyžaduje pozornost",
  "Cleaning · done around {time}": "Úklid · hotovo kolem {time}",
  "{n} min left": "zbývá {n} min",
  "{n}/{total} rooms": "{n}/{total} místností",
  // dock
  "Emptying the bin": "Vyprazdňování koše",
  "Washing the mop": "Praní mopu",
  "Drying the mop": "Sušení mopu",
  "The dock reports an error": "Dok hlásí chybu",
  "Dock ready": "Dok připraven",
  "Confirm the error is fixed, like Resolved in the Roborock app": "Potvrď, že je chyba odstraněna – jako Vyřešeno v aplikaci Roborock",
  "Stop": "Stop",
  "Resolved": "Vyřešeno",
  "Check": "Zkontrolovat",
  "Empty": "Vyprázdnit",
  "Wash": "Mytí",
  "Pump": "Čerpadlo",
  "Self-clean": "Samočištění",
  "Default": "Výchozí",
  "Main brush": "Hlavní kartáč",
  "Side brush": "Boční kartáč",
  "Filter": "Filtr",
  "Sensors": "Senzory",
  "Dock brush": "Kartáč doku",
  "Strainer": "Sítko",
  "Dirty water tank": "Nádrž na špinavou vodu",
  "Clean water tank": "Nádrž na čistou vodu",
  "Cleaning fluid": "Čisticí prostředek",
  "Whole home · ~{min} min": "Celý byt · ~{min} min",
  "{n} {rooms} · ~{min} min": "{n} {rooms} · ~{min} min",
  "~{h} h {m} min": "~{h} h {m} min",
  "~{h} h": "~{h} h",
  "~{n} min": "~{n} min",
  "Today · {time}": "Dnes · {time}",
  "Yesterday · {time}": "Včera · {time}",
  "{date} · {time}": "{date} · {time}",
  "Last clean": "Poslední úklid",
  "Made for a bigger screen": "Určeno pro větší obrazovku",
  "Open anyway": "Přesto otevřít",
  "Visual editor": "Vizuální editor",
  "No available robot for this room's {mode} pass — check that a vacuum is configured with the right role and knows this room.": "Pro {mode} průchod této místnosti není k dispozici robot – zkontroluj, že je vysavač nastaven s odpovídající rolí a zná tuto místnost.",
  "No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Global tab.": "Pro tuto místnost není nastaveno pořadí úklidu – odhad času může být nepřesný. Pořadí nastavíš v editoru karty na záložce Global.",
  "{n} selected {rooms} without an available robot for the {mode} pass — skipped. Check vacuum roles/config.": "{n} vybraných {rooms} bez dostupného robota pro {mode} průchod – budou přeskočeny. Zkontroluj role/konfiguraci vysavačů.",
  "{n} selected {rooms} without a cleaning order — the time above may be off. Set the order in the card editor's Global tab.": "{n} vybraných {rooms} bez nastaveného pořadí úklidu – čas výše může být nepřesný. Pořadí nastavíš v editoru karty na záložce Global.",
  // docs/52 (card 1.62.0): queue while cleaning, service points.
  "Add a room": "Přidat místnost",
  "Add a service point": "Přidat servisní bod",
  "Add to the queue": "Přidat do fronty",
  "Already in the queue": "Už je ve frontě",
  "At {name}": "Na bodě {name}",
  "Available when {name} has finished its rooms": "Dostupné, až {name} dokončí své místnosti",
  "Available when {name} has finished its rooms — going there now would end the room it is cleaning, and it could not continue where it stopped.": "Dostupné, až {name} dokončí své místnosti — cesta na bod teď by ukončila uklízenou místnost a robot by nemohl pokračovat, kde skončil.",
  "Back to dock": "Zpět do doku",
  "Delete": "Smazat",
  "Give it to {name}": "Předat: {name}",
  "Go": "Jet",
  "Go to {point}": "Jet na {point}",
  "Move": "Přesunout",
  "Move down": "Posunout dolů",
  "Move up": "Posunout nahoru",
  "Move {point}": "Přesunout {point}",
  "Name": "Název",
  "New service point": "Nový servisní bod",
  "Open the queue": "Otevřít frontu",
  "Point placed — tap again to adjust": "Bod umístěn — dalším ťuknutím ho posuneš",
  "Queue": "Fronta",
  "Queue view": "Zobrazení fronty",
  "Queue · {done} of {total} {rooms} done": "Fronta · hotovo {done} z {total} {rooms}",
  "Remove from the queue": "Odebrat z fronty",
  "Rename": "Přejmenovat",
  "Rename {point}": "Přejmenovat {point}",
  "Retry": "Znovu",
  "Save": "Uložit",
  "Service point": "Servisní bod",
  "Service points": "Servisní body",
  "Show service points": "Zobrazit servisní body",
  "Hide service points": "Skrýt servisní body",
  "{name} is already there": "{name} už tam stojí",
  "Send {name} to {point}?": "Poslat {name} na {point}?",
  "Skip · hold": "Přeskočit · podrž",
  "Stops this room and goes on with the next one": "Ukončí tuhle místnost a pokračuje další",
  "Tap again to delete": "Ťukni znovu pro smazání",
  "Tap the spot on the map where {name} should park — or save where it stands now.": "Ťukni do mapy, kde má {name} zaparkovat — nebo ulož místo, kde právě stojí.",
  "Use where {name} stands": "Použít polohu {name}",
  "Waiting — send it home when you're done": "Čeká — až budeš hotov, pošli ho domů",
  "after {names}": "po {names}",
  "blocked": "zablokováno",
  "could not reach the room": "nedostal se do místnosti",
  "done": "hotovo",
  "done around {time}": "hotovo kolem {time}",
  "or tap a room on the map": "nebo ťukni na místnost v mapě",
  "outside the rooms": "mimo místnosti",
  "robot error": "chyba robota",
  "robot offline": "robot je offline",
  "starting": "startuje",
  "the command failed": "příkaz selhal",
  "the robot did not take the command": "robot příkaz nepřevzal",
  "the robot runs another clean": "robot uklízí něco jiného",
  "waiting": "čeká",
  "water tank empty": "prázdná nádrž na vodu",
  "{done} of {total} {rooms} done": "hotovo {done} z {total} {rooms}",
  "{name}: {room} ({kind}) — {reason}": "{name}: {room} ({kind}) — {reason}",
  "{point} — rename, move or delete": "{point} — přejmenovat, přesunout, smazat",
};
