var hourup = document.getElementById("js--hour-up"); // Haal het element op dat de knop voor het verhogen van het uur bevat.
var hourdown = document.getElementById("js--hour-down"); // Haal het element op dat de knop voor het verlagen van het uur bevat.

var hour = 0; // Initialiseer het uur op 0.
var timehour = document.getElementById("js--time-hour"); // Haal het element op dat de huidige tijd voor het uur weergeeft.

hourup.onclick = function () { // Stel een klikgebeurtenis in voor de knop om het uur te verhogen.
    hour += 1; // Verhoog het uur met 1.
    if (hour > 23) { // Als het uur groter is dan 23 (maximale waarde), zet het terug op 0.
        hour = 0;
    }
    if (hour < 10) { // Als het uur kleiner is dan 10, voeg een "0" toe voor de opmaak (bv. 09).
        timehour.innerText = "0" + hour; // Update de weergegeven uurwaarde met een voorloopnul.
    }
    else {
        timehour.innerText = hour; // Update de weergegeven uurwaarde zonder voorloopnul.
    }
}

hourdown.onclick = function () { // Stel een klikgebeurtenis in voor de knop om het uur te verlagen.
    hour -= 1; // Verlaag het uur met 1.
    if (hour < 0) { // Als het uur kleiner is dan 0, zet het terug op 23 (maximale waarde).
        hour = 23;
    }
    if (hour < 10) { // Als het uur kleiner is dan 10, voeg een "0" toe voor de opmaak.
        timehour.innerText = "0" + hour; // Update de weergegeven uurwaarde met een voorloopnul.
    }
    else {
        timehour.innerText = hour; // Update de weergegeven uurwaarde zonder voorloopnul.
    }
}

var minute = 0; // Initialiseer de minuten op 0.
var timeminute = document.getElementById("js--time-minute"); // Haal het element op dat de huidige tijd voor de minuten weergeeft.
var minuteup = document.getElementById("js--minute-up"); // Haal het element op dat de knop voor het verhogen van de minuten bevat.

minuteup.onclick = function () { // Stel een klikgebeurtenis in voor de knop om de minuten te verhogen.
    minute += 1; // Verhoog de minuten met 1.
    if (minute > 59) { // Als de minuten groter zijn dan 59, zet ze terug op 0.
        minute = 0;
    }
    if (minute < 10) { // Als de minuten kleiner zijn dan 10, voeg een "0" toe voor de opmaak.
        timeminute.innerText = "0" + minute; // Update de weergegeven minutenwaarde met een voorloopnul.
    }
    else {
        timeminute.innerText = minute; // Update de weergegeven minutenwaarde zonder voorloopnul.
    }
}

var minutedown = document.getElementById("js--minute-down"); // Haal het element op dat de knop voor het verlagen van de minuten bevat.

minutedown.onclick = function () { // Stel een klikgebeurtenis in voor de knop om de minuten te verlagen.
    minute -= 1; // Verlaag de minuten met 1.
    if (minute < 0) { // Als de minuten kleiner zijn dan 0, zet ze terug op 59 (maximale waarde).
        minute = 59;
    }
    if (minute < 10) { // Als de minuten kleiner zijn dan 10, voeg een "0" toe voor de opmaak.
        timeminute.innerText = "0" + minute; // Update de weergegeven minutenwaarde met een voorloopnul.
    }
    else {
        timeminute.innerText = minute; // Update de weergegeven minutenwaarde zonder voorloopnul.
    }
}

var toggle = document.getElementById("js--toggle"); // Haal het element op dat de toggle-knop voor het alarm bevat.
var timer = null; // Initialiseer de timer op null (nog geen timer ingesteld).
toggle.checked = false; // Zet de toggle uitgeschakeld (niet aangevinkt) als standaardwaarde.
var getTimerOut = null; // Initialiseer een variabele om time-out timers op te slaan.
var dialogue = document.getElementById("js--dialogue"); // Haal het element op dat de dialoog voor alarminformatie weergeeft.
var audio = new Audio("/sounds/521533__zhr__relaxation-music-9.mp3"); // Laad een audio-object met het aangegeven geluid voor het alarm.

toggle.onchange = function () { // Stel een functie in die wordt uitgevoerd als de toggle verandert (aan/uit).
    if (toggle.checked === true) { // Als de toggle is ingeschakeld (alarm staat aan).
        dialogue.innerText = "Je alarm is gezet op " + hour + " uur en " + minute + " minuten."; // Toon een melding met de ingestelde alarmtijd.
        toggle.classList.add("alarm__toggle--checked"); // Voeg een CSS-klasse toe om het uiterlijk van de toggle te veranderen als het alarm is ingeschakeld.
        dialogue.style.display = "flex"; // Maak het dialoogvenster zichtbaar.
        getTimerOut = setTimeout(function () { // Verberg het dialoogvenster na 2 seconden.
            dialogue.style.display = "none";
        }, 2000);
        timer = setInterval(function () { // Stel een timer in die elke seconde controleert of het alarm overeenkomt met de huidige tijd.
            var date = new Date(); // Maak een nieuw Date-object om de huidige tijd te verkrijgen.
            var dateHour = date.getHours(); // Haal het huidige uur op.
            var dateMinute = date.getMinutes(); // Haal de huidige minuten op.

            if (hour === dateHour && minute === dateMinute) { // Controleer of de ingestelde tijd overeenkomt met de huidige tijd.
                audio.play(); // Speel het alarmgeluid af als de tijden overeenkomen.
            }
        }, 1000); // Controleer elke seconde (1000 milliseconden).
    }
    else { // Als de toggle is uitgeschakeld (alarm staat uit).
        dialogue.style.display = "none"; // Verberg het dialoogvenster.
        toggle.classList.remove("alarm__toggle--checked"); // Verwijder de CSS-klasse voor de ingeschakelde status van de toggle.
        clearTimeout(getTimerOut); // Annuleer de eventuele time-out timer.
        clearInterval(timer); // Stop het interval dat de tijd controleert.
    }
}
