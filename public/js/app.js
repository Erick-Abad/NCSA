async function fetchCourses() {
  const list = document.getElementById("courses");
  list.innerHTML = '<div class="text-muted">Cargando...</div>';
  try {
    const res = await fetch("/api/courses");
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      list.innerHTML = '<div class="text-muted">Sin cursos disponibles.</div>';
      return;
    }
    list.innerHTML = data.map(c => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h3 class="h5 card-title">${c.title}</h3>
            <p class="card-text">${c.short_desc ?? ""}</p>
            <span class="badge bg-secondary">${new Date(c.created_at).toLocaleString()}</span>
          </div>
        </div>
      </div>
    `).join("");
  } catch (e) {
    list.innerHTML = '<div class="text-danger">Error cargando cursos.</div>';
  }
}

async function addDemoCourse() {
  try {
    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Nuevo curso demo " + new Date().toLocaleTimeString(),
        short_desc: "Insertado desde el frontend"
      })
    });
    fetchCourses();
  } catch {}
}

document.getElementById("addDemo").addEventListener("click", addDemoCourse);
fetchCourses();
