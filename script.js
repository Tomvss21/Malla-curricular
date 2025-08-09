document.addEventListener('DOMContentLoaded', () => {

    // --- Definición de todos los ramos de la malla ---
    // Se estructura como un array de objetos para facilitar su manejo.
    // Cada objeto contiene: id (código único), nombre, semestre y prerrequisitos.
    const ramos = [
        // Semestre I
        { id: 'IND-111', nombre: 'Álgebra', semestre: 1, prerequisitos: [] },
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
        { id: 'IND-213', nombre: 'Prob. y Estadística', semestre: 3, prerequisitos: ['IND-121', 'IND-122'] },
        { id: 'IND-211', nombre: 'Cálculo III', semestre: 3, prerequisitos: ['IND-122'] },
        { id: 'IND-212', nombre: 'Física I', semestre: 3, prerequisitos: ['IND-122'] },
        { id: 'IND-214', nombre: 'Computac. II', semestre: 3, prerequisitos: ['IND-124'] },
        { id: 'IFG-300', nombre: 'Inglés III', semestre: 3, prerequisitos: ['IFG-200'] },

        // Semestre IV
        { id: 'IND-223', nombre: 'Análisis Multivariado', semestre: 4, prerequisitos: ['IND-213'] },
        { id: 'IND-221', nombre: 'Ecuaciones Diferenciales', semestre: 4, prerequisitos: ['IND-211'] },
        { id: 'IND-222', nombre: 'Física II', semestre: 4, prerequisitos: ['IND-212'] },
        { id: 'IND-334', nombre: 'Módulo Integ. CC.BB.', semestre: 4, prerequisitos: ['IND-223', 'IND-221', 'IND-214'] },

        // Semestre V
        { id: 'IND-311', nombre: 'M. M. y Estocástico', semestre: 5, prerequisitos: ['IND-223'] },
        { id: 'IND-313', nombre: 'Diseño Ind. y Dib. Tec.', semestre: 5, prerequisitos: ['IND-221', 'IND-222'] },
        { id: 'IND-324', nombre: 'Contab. y Finanzas', semestre: 5, prerequisitos: [] },
        { id: 'IND-314', nombre: 'Adm. y RRHH', semestre: 5, prerequisitos: [] },
        { id: 'IND-325', nombre: 'Base de Datos', semestre: 5, prerequisitos: ['IND-334'] },
        { id: 'MFG-114', nombre: 'Introducción a la Fe', semestre: 5, prerequisitos: [] },
        
        // Semestre VI
        { id: 'IND-322', nombre: 'Logística', semestre: 6, prerequisitos: ['IND-311'] },
        { id: 'IND-321', nombre: 'Elect. Ind. y Automatiz.', semestre: 6, prerequisitos: ['IND-313'] },
        { id: 'IND-323', nombre: 'Economía', semestre: 6, prerequisitos: ['IND-314'] },
        { id: 'MFG-214', nombre: 'Etica Cristiana', semestre: 6, prerequisitos: ['MFG-114'] },

        // Semestre VII
        { id: 'IND-411', nombre: 'Investiga. Operaciones', semestre: 7, prerequisitos: ['IND-311'] },
        { id: 'IND-412', nombre: 'Procesos Industriales', semestre: 7, prerequisitos: ['IND-321'] },
        { id: 'IND-413', nombre: 'Emprend. y Creación Empresas', semestre: 7, prerequisitos: [] },
        { id: 'IND-423', nombre: 'Des. Personal y Liderazgo', semestre: 7, prerequisitos: [] },
        { id: 'IND-414', nombre: 'Ingeniería Económica', semestre: 7, prerequisitos: ['IND-323'] },
        { id: 'IND-415', nombre: 'Metodología Investigac.', semestre: 7, prerequisitos: [] },
        { id: 'IND-425', nombre: 'Módulo Integ. Lic. (Práctica 1)', semestre: 7, prerequisitos: ['IND-412', 'IND-413', 'IND-423'] },

        // Semestre VIII
        { id: 'IND-421', nombre: 'Gestión de Operaciones', semestre: 8, prerequisitos: ['IND-411'] },
        { id: 'IND-422', nombre: 'Control de Gestión', semestre: 8, prerequisitos: ['IND-412', 'IND-414'] },
        { id: 'IND-424', nombre: 'Creatividad Prototipos Negocios', semestre: 8, prerequisitos: ['IND-413'] },
        { id: 'CFG-1', nombre: 'Certificación I', semestre: 8, prerequisitos: [] },
        
        // Semestre IX
        { id: 'IND-511', nombre: 'Optimiza.', semestre: 9, prerequisitos: ['IND-421'] },
        { id: 'IND-512', nombre: 'Gestión Información', semestre: 9, prerequisitos: ['IND-422'] },
        { id: 'IND-513', nombre: 'Formal. y Ev. de Proyectos', semestre: 9, prerequisitos: ['IND-415', 'IND-425'] },
        { id: 'IND-514', nombre: 'Propiedad Intelectual', semestre: 9, prerequisitos: ['IND-424'] },
        { id: 'IND-515', nombre: 'Marketing Estrat.', semestre: 9, prerequisitos: [] },
        { id: 'CFG-2', nombre: 'Certificación II', semestre: 9, prerequisitos: ['CFG-1'] },

        // Semestre X
        { id: 'IND-521', nombre: 'Gestión Calidad', semestre: 10, prerequisitos: ['IND-511'] },
        { id: 'IND-522', nombre: 'Electivo Ev. Proyectos', semestre: 10, prerequisitos: ['IND-513'] },
        { id: 'IND-523', nombre: 'Plan. Estrat. y Gestión Negocios', semestre: 10, prerequisitos: ['IND-512', 'IND-513'] },
        { id: 'IND-524', nombre: 'Gestión Proyectos I+D+e', semestre: 10, prerequisitos: ['IND-514'] },
        { id: 'IND-525', nombre: 'Inteligencia Comp. y Vig. Tec.', semestre: 10, prerequisitos: ['IND-515'] },
        { id: 'CFG-3', nombre: 'Certificación III', semestre: 10, prerequisitos: ['CFG-2'] },

        // Semestre XI
        { id: 'IND-611', nombre: 'Electivo G. Oper. y Proc. Indu.', semestre: 11, prerequisitos: ['IND-521'] },
        { id: 'IND-612', nombre: 'Electivo Gestión Negocios', semestre: 11, prerequisitos: ['IND-523'] },
        { id: 'IND-613', nombre: 'Módulo Integrador Formación Profesional', semestre: 11, prerequisitos: ['IND-522', 'IND-524'] },
    ];

    const container = document.getElementById('malla-container');
    let ramosAprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobadosUCM')) || []);

    const numeroDeSemestres = Math.max(...ramos.map(r => r.semestre));

    // --- Funciones ---

    // Genera el HTML de la malla
    function generarMalla() {
        // Crear las columnas de los semestres
        for (let i = 1; i <= numeroDeSemestres; i++) {
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            semestreDiv.id = `semestre-${i}`;
            semestreDiv.innerHTML = `<div class="semestre-titulo">${toRoman(i)}</div>`;
            container.appendChild(semestreDiv);
        }

        // Añadir cada ramo a su semestre correspondiente
        ramos.forEach(ramo => {
            const ramoDiv = document.createElement('div');
            ramoDiv.className = 'ramo';
            ramoDiv.id = ramo.id;
            ramoDiv.dataset.prerequisitos = ramo.prerequisitos.join(',');
            
            ramoDiv.innerHTML = `
                <div class="ramo-nombre">${ramo.nombre}</div>
                <div class="ramo-codigo">${ramo.id}</div>
            `;
            
            document.getElementById(`semestre-${ramo.semestre}`).appendChild(ramoDiv);
            ramoDiv.addEventListener('click', () => handleRamoClick(ramo.id));
        });
    }

    // Maneja el clic en un ramo
    function handleRamoClick(ramoId) {
        const ramo = document.getElementById(ramoId);
        const prerequisitos = ramo.dataset.prerequisitos.split(',').filter(p => p);
        
        let prerrequisitosFaltantes = [];
        for (const prereqId of prerequisitos) {
            if (!ramosAprobados.has(prereqId)) {
                prerrequisitosFaltantes.push(prereqId);
            }
        }

        if (prerrequisitosFaltantes.length > 0) {
            const nombresFaltantes = prerrequisitosFaltantes.map(id => ramos.find(r => r.id === id).nombre);
            alert(`Ramo bloqueado. Debes aprobar:\n- ${nombresFaltantes.join('\n- ')}`);
            return;
        }

        // Aprobar o desaprobar el ramo
        if (ramosAprobados.has(ramoId)) {
            ramosAprobados.delete(ramoId);
        } else {
            ramosAprobados.add(ramoId);
        }

        guardarEstado();
        actualizarUI();
    }

    // Actualiza la interfaz (colores y estados de los ramos)
    function actualizarUI() {
        ramos.forEach(ramoInfo => {
            const ramoDiv = document.getElementById(ramoInfo.id);
            if (!ramoDiv) return;

            // Resetear clases
            ramoDiv.classList.remove('aprobado', 'bloqueado');
            
            // Marcar como aprobado si está en la lista
            if (ramosAprobados.has(ramoInfo.id)) {
                ramoDiv.classList.add('aprobado');
                return; // Si está aprobado, no puede estar bloqueado
            }
            
            // Verificar si está bloqueado
            const prerequisitos = ramoInfo.prerequisitos;
            let bloqueado = false;
            for (const prereqId of prerequisitos) {
                if (!ramosAprobados.has(prereqId)) {
                    bloqueado = true;
                    break;
                }
            }

            if (bloqueado) {
                ramoDiv.classList.add('bloqueado');
            }
        });
    }

    // Guarda el estado en localStorage
    function guardarEstado() {
        localStorage.setItem('ramosAprobadosUCM', JSON.stringify([...ramosAprobados]));
    }
    
    // Función auxiliar para convertir número a romano
    function toRoman(num) {
        const roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let str = '';
        for (let i of Object.keys(roman)) {
            let q = Math.floor(num / roman[i]);
            num -= q * roman[i];
            str += i.repeat(q);
        }
        return str;
    }


    // --- Inicialización ---
    generarMalla();
    actualizarUI();
});
