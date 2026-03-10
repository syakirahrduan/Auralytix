document.addEventListener("DOMContentLoaded", () => {
  // Masukkan part header dari file header.html
  fetch("header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").insertAdjacentHTML("beforeend", data);
      triggerFadeIn(); // lepas masuk header, buat animation fade-in
    });

  // Masukkan part footer dari file footer.html
  fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").insertAdjacentHTML("beforeend", data);
      triggerFadeIn(); //// animation fade-in untuk footer jugak
    });
});

//// Function untuk animation fade-in untuk content2 dalam page
function triggerFadeIn() {
  const elements = document.querySelectorAll(".fade-in:not(.visible)");
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, i * 100);
  });
}

const form = document.getElementById("skinForm");
form.addEventListener("submit", displayResult); //// Bila user tekan submit, panggil function displayResult

function displayResult(event) {
  event.preventDefault();
  //check semua input yang user masukkan termasuk yang user tak isi
  const concernInput = document.querySelector('input[name="concern"]:checked');
  const frequencyInput = document.querySelector('input[name="frequency"]:checked');
  const sensitivityInput = document.querySelector('input[name="react"]:checked');
  const rednessInput = document.querySelector('input[name="redness"]:checked');

  //kalau user ada tak pilih, keluar alert
  if (!concernInput || !frequencyInput || !sensitivityInput || !rednessInput) {
    alert("Please answer all questions before submitting.");
    return;
  }

  //semua dah ada value sebab dah check, so simpan value yang user pilih
  const concern = concernInput.value;
  const frequency = frequencyInput.value;
  const sensitivity = sensitivityInput.value;
  const redness = rednessInput.value;

  // guna Fetch API instead of older XMLHttpRequest method and update terus w/o load the page
  fetch('skinalyze.json')
    .then(response => response.json())
    .then(data => {
      const traits = new Set();
      /* "Set" ni macam bekas yang tak bagi masuk benda sama dua kali.
         So kalau “Sensitive” masuk 2 kali pun, dia simpan sekali je. */

      if (data.concern[concern]) traits.add(data.concern[concern]);
      if (data.frequency[frequency]) traits.add(data.frequency[frequency]);
      if (data.sensitivity[sensitivity]) traits.add(data.sensitivity[sensitivity]);
      if (data.redness[redness]) traits.add(data.redness[redness]); /*Kat sini, dia check 
      setiap jawapan user, kalau ada skin type yg match dgn yg ada dalam json, dia masukkan 
      dalam kotak traits tadi. Contohnya, kalau user pilih dryness, dia ambil “Dry” masuk dalam kotak.*/

      const allTraits = Array.from(traits); // tukar Set ke array biasa

      // Buang “Normal” kalau ada trait lain yang lagi penting
      const filteredTraits = allTraits.filter(t => t !== 'Normal');

      // listkan apa yang kita nak utamakan dulu
      const priority = ['Sensitive', 'Acne Prone', 'Dry', 'Oily', 'Aging / Dull'];

      // Susun ikut keutamaan — mana lagi penting letak depan
      const sortedTraits = filteredTraits.sort((a, b) => {
        const aPriority = priority.indexOf(a);
        const bPriority = priority.indexOf(b);
        return (aPriority === -1 ? 999 : aPriority) - (bPriority === -1 ? 999 : bPriority);
      });

      // Ambik maksimum 2 traits je — contohnya “Dry and Sensitive” tak boleh "Dry and Acne-Prone and Sensitive"
      const finalTraits = sortedTraits.slice(0, 2);

      // Gabungkan jadi satu string
      const skinType = finalTraits.join(" or ");

      document.getElementById("skinConcernResult").textContent = concern;
      document.getElementById("frequencyResult").textContent = frequency;
      document.getElementById("sensitivityResult").textContent = sensitivity;
      document.getElementById("skinTypeResult").textContent = skinType;
      document.getElementById("skinTypeSearch").textContent = skinType;

      document.getElementById("form-content").style.display = "none";
      document.getElementById("result-content").style.display = "block";
    })
    .catch(error => {
      console.error("Error loading JSON:", error);
    });
}