document.addEventListener('DOMContentLoaded', function () {
    const asignaturas = [
        // Semestre I
        { id: 'IND-111', nombre: 'Álgebra Lineal', semestre: 1, prerequisitos: [] },
        { id: 'IND-112', nombre: 'Cálculo I', semestre: 1, prerequisitos: [] },
        { id: 'IND-113', nombre: 'Com. en Ingeniería', semestre: 1, prerequisitos: [] },
        { id: 'IND-114', nombre: 'Introducción Ingeniería', semestre: 1, prerequisitos: [] },
        { id: 'IFG-100', nombre: 'Inglés I', semestre: 1, prerequisitos: [] },
        // Semestre II
        { id: 'IND-121', nombre: 'Álgebra Lineal', semestre: 2, prerequisitos: ['IND-111'] },
        { id: 'IND-122', nombre: 'Cálculo II', semestre: 2, prerequisitos: ['IND-112'] },
        { id: 'IND-123', nombre: 'Química', semestre: 2, prerequisitos: ['IND-113'] },
        { id: 'IND-124', nombre: 'Computac. I', semestre: 2, prerequisitos: ['IND-114'] },
        { id: 'IFG-200', nombre: 'Inglés II', semestre: 2, prerequisitos: ['IFG-100'] },
        // Semestre III
        { id: 'IND-213', nombre: 'Prob. y Estadística', semestre: 3, prerequisitos: ['IND-121'] },
        { id: 'IND-211', nombre: 'Cálculo III', semestre: 3, prerequisitos: ['IND-122'] },
        { id: 'IND-212', nombre: 'Física I', semestre: 3, prerequisitos: ['IND-123'] },
        { id: 'IND-214', nombre: 'Computac. II', semestre: 3, prerequisitos: ['IND-124'] },
        { id: 'IFG-300', nombre: 'Inglés III', semestre: 3, prerequisitos: ['IFG-200'] },
        { id: 'IND-334', nombre: 'Módulo Integ. CC.BB.', semestre: 3, prerequisitos: ['IND-214'] },
        // Semestre IV
        { id: 'IND-223', nombre: 'Análisis Multivariado', semestre: 4, prerequisitos: ['IND-213'] },
        { id: 'IND-221', nombre: 'Ecuaciones Diferenciales', semestre: 4, prerequisitos: ['IND-211'] },
        { id: 'IND-222', nombre: 'Física II', semestre: 4, prerequisitos: ['IND-212'] },
        // Semestre V
        { id: 'IND-311', nombre: 'M. M. y Estocástico', semestre: 5, prerequisitos: ['IND-223'] },
        { id: 'IND-313', nombre: 'Diseño Ind. y Dib. Téc.', semestre: 5, prerequisitos: ['IND-221'] },
        { id: 'IND-312', nombre: 'Termodinám.', semestre: 5, prerequisitos: ['IND-222'] },
        { id: 'IND-314', nombre: 'Adm. y RRHH', semestre: 5, prerequisitos: ['IND-334'] },
        { id: 'MFG-114', nombre: 'Introducción a la Fe', semestre: 5, prerequisitos: [] },
        // Semestre VI
        { id: 'IND-322', nombre: 'Logística', semestre: 6, prerequisitos: ['IND-311'] },
        { id: 'IND-321', nombre: 'Elect. Ind. y Automatiz.', semestre: 6, prerequisitos: ['IND-313'] },
        { id: 'IND-324', nombre: 'Contab. y Finanzas', semestre: 6, prerequisitos: ['IND-312', 'IND-314'] },
        { id: 'IND-323', nombre: 'Economía', semestre: 6, prerequisitos: ['IND-314'] },
        { id: 'IND-325', nombre: 'Base de Datos', semestre: 6, prerequisitos: ['IND-334'] },
        { id: 'MFG-215', nombre: 'Ética Cristiana', semestre: 6, prerequisitos: ['MFG-114'] },
        // Semestre VII
        { id: 'IND-411', nombre: 'Investiga. Operaciones', semestre: 7, prerequisitos: ['IND-322'] },
        { id: 'IND-412', nombre: 'Procesos Industriales', semestre: 7, prerequisitos: ['IND-321'] },
        { id: 'IND-413', nombre: 'Emprend. y Creación Empresas', semestre: 7, prerequisitos: ['IND-324'] },
        { id: 'IND-414', nombre: 'Ingeniería Económica', semestre: 7, prerequisitos: ['IND-323'] },
        { id: 'IND-415', nombre: 'Metodología Investigac.', semestre: 7, prerequisitos: ['IND-325'] },
        // Semestre VIII
        { id: 'IND-421', nombre: 'Gestión de Operaciones', semestre: 8, prerequisitos: ['IND-411'] },
        { id: 'IND-422', nombre: 'Control de Gestión', semestre: 8, prerequisitos: ['IND-412'] },
        { id: 'IND-423', nombre: 'Des. Personal y Liderazgo', semestre: 8, prerequisitos: ['IND-413'] },
        { id: 'IND-424', nombre: 'Creatividad Prototipos Negocios', semestre: 8, prerequisitos: ['IND-414'] },
        { id: 'IND-425', nombre: 'Módulo Integ. Lic. (Práctica 1)', semestre: 8, prerequisitos: ['IND-415'] },
        { id: 'CFG', nombre: 'Certificación CFG', semestre: 8, prerequisitos: ['MFG-215'] },
        // Semestre IX
        { id: 'IND-511', nombre: 'Optimiza.', semestre: 9, prerequisitos: ['IND-421'] },
        { id: 'IND-512', nombre: 'Gestión Información', semestre: 9, prerequisitos: ['IND-422'] },
        { id: 'IND-513', nombre: 'Formal. y Ev. de Proyectos', semestre: 9, prerequisitos: ['IND-423', 'IND-425'] },
        { id: 'IND-514', nombre: 'Propiedad Intelectual', semestre: 9, prerequisitos: ['IND-424'] },
        { id: 'IND-515', nombre: 'Marketing Estrat. Comer. Tec.', semestre: 9, prerequisitos: ['IND-425'] },
        { id: 'CFG-2', nombre: 'Certificación II CFG', semestre: 9, prerequisitos: ['CFG'] },
        // Semestre X
        { id: 'IND-521', nombre: 'Gestión Calidad', semestre: 10, prerequisitos: ['IND-511'] },
        { id: 'IND-522', nombre: 'Electivo Ev. Proyectos', semestre: 10, prerequisitos: ['IND-512'] },
        { id: 'IND-523', nombre: 'Plan. Estrat. y Gestión Negocios', semestre: 10, prerequisitos: ['IND-513'] },
        { id: 'IND-524', nombre: 'Gestión Proyectos I+D+e', semestre: 10, prerequisitos: ['IND-514'] },
        { id: 'IND-525', nombre: 'Inteligencia Comp. y Vig. Tec.', semestre: 10, prerequisitos: ['IND-515'] },
        { id: 'CFG-3', nombre: 'Certificación III CFG', semestre: 10, prerequisitos: ['CFG-2'] },
        // Semestre XI
        { id: 'IND-611', nombre: 'Electivo G. Oper. y Prod.', semestre: 11, prerequisitos: ['IND-521'] },
        { id: 'IND-612', nombre: 'Electivo Gestión Negocios', semestre: 11, prerequisitos: ['IND-522', 'IND-523'] },
        // Titulación
        { id: 'IND-613', nombre: 'Módulo Integrador Formación Profesional (Práctica 2 Profesional)', semestre: 12, prerequisitos: ['IND-524'] }
    ];

    const container = document.getElementById('malla-curricular');
    const totalSemestres = 12;
    const claveLocalStorage = 'aprobados_civil_industrial_ucm';

    // --- Lógica de la Ventana Modal ---
    const modal = document.getElementById('modal-bloqueo');
    const spanCerrar = document.getElementsByClassName('cerrar-modal')[0];
    spanCerrar.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function mostrarModalBloqueo(faltantes) {
        const listaUl = document.getElementById('lista-prerrequisitos');
        listaUl.innerHTML = ''; // Limpiar lista anterior
        faltantes.forEach(id => {
            const asignatura = asignaturas.find(a => a.id === id);
            if (asignatura) {
                const li = document.createElement('li');
                li.textContent = `${asignatura.nombre} (${asignatura.id})`;
                listaUl.appendChild(li);
            }
        });
        modal.style.display = "block";
    }

    // --- Lógica de la Malla ---

    function getAprobados() {
        return JSON.parse(localStorage.getItem(claveLocalStorage)) || [];
    }

    function saveAprobados(aprobados) {
        localStorage.setItem(claveLocalStorage, JSON.stringify(aprobados));
    }

    function actualizarMalla() {
        const aprobados = getAprobados();
        asignaturas.forEach(asignatura => {
            const el = document.getElementById(asignatura.id);
            if (!el) return;

            el.classList.remove('aprobado', 'disponible', 'bloqueado');

            const prerrequisitosCumplidos = asignatura.prerequisitos.every(p => aprobados.includes(p));

            if (aprobados.includes(asignatura.id)) {
                el.classList.add('aprobado');
            } else if (prerrequisitosCumplidos) {
                el.classList.add('disponible');
            } else {
                el.classList.add('bloqueado');
            }
        });
    }

    container.addEventListener('click', (e) => {
        const elAsignatura = e.target.closest('.asignatura');
        if (!elAsignatura) return;

        const id = elAsignatura.id;
        const asignatura = asignaturas.find(a => a.id === id);
        let aprobados = getAprobados();

        if (elAsignatura.classList.contains('disponible')) {
            aprobados.push(id);
            saveAprobados(aprobados);
        } else if (elAsignatura.classList.contains('aprobado')) {
            aprobados = aprobados.filter(aId => aId !== id);
            saveAprobados(aprobados);
        } else if (elAsignatura.classList.contains('bloqueado')) {
            const faltantes = asignatura.prerequisitos.filter(p => !aprobados.includes(p));
            mostrarModalBloqueo(faltantes);
        }
        
        actualizarMalla();
    });

    // --- Inicialización de la Malla ---
    function inicializar() {
        // Crear columnas de semestres
        for (let i = 1; i <= totalSemestres; i++) {
            const columna = document.createElement('div');
            columna.classList.add('semestre-columna');
            columna.id = `semestre-${i}`;
            const titulo = document.createElement('div');
            titulo.classList.add('semestre-titulo');
            titulo.textContent = i <= 11 ? `SEMESTRE ${i}` : 'TITULACIÓN';
            columna.appendChild(titulo);
            container.appendChild(columna);
        }

        // Añadir asignaturas a sus columnas
        asignaturas.forEach(asignatura => {
            const columna = document.getElementById(`semestre-${asignatura.semestre}`);
            const asignaturaDiv = document.createElement('div');
            asignaturaDiv.className = 'asignatura';
            asignaturaDiv.id = asignatura.id;
            asignaturaDiv.innerHTML = `
                <div class="asignatura-nombre">${asignatura.nombre}</div>
                <div class="asignatura-codigo">${asignatura.id}</div>
            `;
            columna.appendChild(asignaturaDiv);
        });

        actualizarMalla();
    }

    inicializar();
});
