const projects = [
  {
    title: "Olympic Gymnastics Edit",
    description: "Short-form social media edit with fast cuts and beat-driven transitions.",
    video: "videos/project1.mp4"
  },
   {
    title: "Olympic Tabeltennis Edit",
    description: "Short-form social media edit with fast cuts and beat-driven transitions.",
    video: "videos/project4.mp4"
  },
  {
    title: "Olympic Iceskating Highlights",
    description: "Elegant highlight edit focusing on impact and emotional storytelling.",
    video: "videos/project2.mp4"
  },
  { title: "Garcia x Cancelo Highlights",
    description: "Short-form social media edit with fast cuts and beat-driven transitions.",
    video: "videos/project3.mp4"
  }
];

const gallery = document.getElementById("gallery");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project";

  card.innerHTML = `
    <video src="${project.video}" controls muted playsinline></video>
    <div class="project-content">
      <h2>${project.title}</h2>
      <p>${project.description}</p>
    </div>
  `;

  gallery.appendChild(card);
});