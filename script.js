const ramos = [
  { id: 1, nombre: "Introducción a las Matemáticas", semestre: 1 },
  { id: 2, nombre: "Tecnología de la Información I", semestre: 1 },
  { id: 3, nombre: "Administración I", semestre: 1 },
  { id: 4, nombre: "Desafíos de la Ingeniería Comercial", semestre: 1 },
  { id: 5, nombre: "Contabilidad I", semestre: 1 },
  { id: 6, nombre: "Electivo de Comunicación", semestre: 1 },
  { id: 7, nombre: "Álgebra", semestre: 2, prereq: [1] },
  { id: 8, nombre: "Tecnología de la Información II", semestre: 2, prereq: [2] },
  { id: 9, nombre: "Introducción a la Economía", semestre: 2, prereq: [1] },
  { id: 10, nombre: "Administración II", semestre: 2, prereq: [3] },
  { id: 11, nombre: "Contabilidad II", semestre: 2, prereq: [5] },
  { id: 12, nombre: "Electivo de Comunicación", semestre: 2 },
  { id: 13, nombre: "Cálculo I", semestre: 3, prereq: [7] },
  { id: 14, nombre: "Macroeconomía", semestre: 3, prereq: [9] },
  { id: 15, nombre: "Comportamiento Organizacional", semestre: 3, prereq: [10] },
  { id: 16, nombre: "Contabilidad de Costos", semestre: 3, prereq: [11] },
  { id: 17, nombre: "Inglés I", semestre: 3 },
  { id: 18, nombre: "Electivo de Desarrollo del Pensamiento", semestre: 3 },
  { id: 19, nombre: "Cálculo II", semestre: 4, prereq: [13] },
  { id: 20, nombre: "Estadística I", semestre: 4, prereq: [7] },
  { id: 21, nombre: "Microeconomía", semestre: 4, prereq: [9, 13] },
  { id: 22, nombre: "Creación de Nuevos Negocios", semestre: 4, prereq: [15] },
  { id: 23, nombre: "Inglés II", semestre: 4, prereq: [17] },
  { id: 24, nombre: "Estadística II", semestre: 5, prereq: [20] },
  { id: 25, nombre: "Economía Aplicada a las Organizaciones", semestre: 5, prereq: [14, 21] },
  { id: 26, nombre: "Marketing", semestre: 5, prereq: [10] },
  { id: 27, nombre: "Finanzas I", semestre: 5, prereq: [16] },
  { id: 28, nombre: "Inglés III", semestre: 5, prereq: [23] },
  { id: 29, nombre: "Electivo de Desarrollo Personal", semestre: 5 },
  { id: 30, nombre: "Econometría", semestre: 6, prereq: [24] },
  { id: 31, nombre: "Dirección de Personas", semestre: 6, prereq: [22] },
  { id: 32, nombre: "Marketing Estratégico", semestre: 6, prereq: [26] },
  { id: 33, nombre: "Finanzas II", semestre: 6, prereq: [20, 27] },
  { id: 34, nombre: "Derecho Empresarial", semestre: 6, prereq: [10] },
  { id: 35, nombre: "Inglés IV", semestre: 6, prereq: [28] },
  { id: 36, nombre: "Dirección de Operaciones", semestre: 7, prereq: [24] },
  { id: 37, nombre: "Investigación de Mercado", semestre: 7, prereq: [24, 32] },
  { id: 38, nombre: "Finanzas III", semestre: 7, prereq: [33] },
  { id: 39, nombre: "Derecho Tributario", semestre: 7, prereq: [34] },
  { id: 40, nombre: "Inglés V", semestre: 7, prereq: [35] },
  { id: 41, nombre: "Electivo de Ética", semestre: 7 },
  { id: 42, nombre: "Globalización y Economía del Conocimiento", semestre: 8, prereq: [25, 32] },
  { id: 43, nombre: "Dirección Estratégica", semestre: 8, prereq: [32] },
  { id: 44, nombre: "Creatividad, Innovación y Emprendimiento", semestre: 8, prereq: [26] },
  { id: 45, nombre: "Preparación y Evaluación de Proyectos", semestre: 8, prereq: [33] },
  { id: 46, nombre: "Inglés VI", semestre: 8, prereq: [40] },
  { id: 47, nombre: "Electivo de Responsabilidad Social", semestre: 8 },
  { id: 48, nombre: "Control Estratégico de Gestión", semestre: 9, prereq: [43] },
  { id: 49, nombre: "Desarrollo de Habilidades Directivas", semestre: 9 },
  { id: 50, nombre: "Coaching Laboral", semestre: 9, prereq: [45] },
  { id: 51, nombre: "Especialidad 1", semestre: 9 },
  { id: 52, nombre: "Especialidad 2", semestre: 9 },
  { id: 53, nombre: "Especialidad 3", semestre: 9 },
  { id: 54, nombre: "Juego de Negocios", semestre: 10, prereq: [42, 43, 44, 45] },
  { id: 55, nombre: "Especialidad 4", semestre: 10 },
  { id: 56, nombre: "Especialidad 5", semestre: 10 },
  { id: 57, nombre: "Especialidad 6", semestre: 10 },
];

const aprobados = new Set();

function render() {
  const mallaDiv = document.getElementById("malla");
  mallaDiv.innerHTML = "";
  const porSemestre = {};
  ramos.forEach(r => {
    if (!porSemestre[r.semestre]) porSemestre[r.semestre] = [];
    porSemestre[r.semestre].push(r);
  });

  Object.keys(porSemestre).sort((a,b) => a - b).forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h3>Semestre ${sem}</h3>`;
    porSemestre[sem].forEach(r => {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";
      ramoDiv.textContent = r.nombre;

      const requisitosCumplidos = !r.prereq || r.prereq.every(p => aprobados.has(p));
      if (!requisitosCumplidos) ramoDiv.classList.add("bloqueado");
      if (aprobados.has(r.id)) ramoDiv.classList.add("aprobado");

      ramoDiv.onclick = () => {
        if (!requisitosCumplidos) return;
        if (aprobados.has(r.id)) {
          aprobados.delete(r.id);
        } else {
          aprobados.add(r.id);
        }
        render();
      };
      semDiv.appendChild(ramoDiv);
    });
    mallaDiv.appendChild(semDiv);
  });
}

render();
