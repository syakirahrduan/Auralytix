const map = L.map('map').setView([4.2105, 101.9758], 6); // Center map dekat Malaysia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

//untuk cari product innisfree tu face2face, boleh tgk branch yang ada dekat malaysia
const branches = [
  { name: 'INNISFREE Pavilion KL', coords: [3.1478, 101.7120] },       
  { name: 'INNISFREE KL SOGO', coords: [3.1536, 101.7070] },           
  { name: 'INNISFREE Sunway Pyramid', coords: [3.0725, 101.6072] },   
  { name: 'INNISFREE The Exchange TRX', coords: [3.1690, 101.7135] },
  { name: 'INNISFREE Mid Valley Megamall', coords: [3.1181, 101.6767] },
  { name: 'INNISFREE IOI City Mall', coords: [2.9269, 101.6810] },
  { name: 'INNISFREE Central i‑City', coords: [3.0736, 101.5110] },
  { name: 'INNISFREE Sunway Velocity', coords: [3.1600, 101.7130] },
  { name: 'INNISFREE One Utama', coords: [3.1482, 101.6158] },
  { name: 'INNISFREE Johor Southkey', coords: [1.4565, 103.7860] },
  { name: 'INNISFREE Mahkota Parade', coords: [2.1941, 102.2486] },
  { name: 'INNISFREE Paradigm Mall PJ', coords: [3.0470, 101.6352] },
  { name: 'INNISFREE AEON Tebrau City JB', coords: [1.5264, 103.7854] },
  { name: 'INNISFREE Gurney Plaza Penang', coords: [5.4200, 100.3350] },
  { name: 'INNISFREE Pavilion Bukit Jalil', coords: [3.0625, 101.6580] },
  { name: 'INNISFREE Suria Sabah KK', coords: [5.9804, 116.0735] },
  { name: 'INNISFREE Pavilion Damansara', coords: [3.1700, 101.6350] },
  { name: 'INNISFREE Aman Central Alor Setar', coords: [6.1175, 100.3690] },
  { name: 'INNISFREE Vivacity Megamall Kuching', coords: [1.5303, 110.3094] }
];

branches.forEach(branch => { // add marker untuk each branch
  L.marker(branch.coords).addTo(map)
    .bindPopup(branch.name);
});

if (navigator.geolocation) { // check kalau user punya geolocation is supported
  navigator.geolocation.getCurrentPosition( // get user location using geolocation
    (position) => { // kalau success
      const userCoords = [position.coords.latitude, position.coords.longitude]; // userCoords = [latitude, longitude]
      L.marker(userCoords).addTo(map) // add marker
        .bindPopup("You are here").openPopup(); // popup kat marker
      map.setView(userCoords, 9); //
    },
    () => alert("Unable to retrieve your location.") // kalau error
  );
} else {
  alert("Geolocation is not supported by your browser."); // kalau geolocation is not supported
}
