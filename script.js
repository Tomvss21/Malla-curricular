document.addEventListener('DOMContentLoaded', function() {
    const ramos = document.querySelectorAll('.ramo');
    const svgContainer = document.getElementById('lines-container');
    const mallaContainer = document.querySelector('.malla-container');

    // Mapeo de todos los ramos con sus sucesores (los que lo requieren)
    const successorMap = new Map();

    function initializeSuccessorMap() {
        ramos.forEach(ramo => successorMap.set(ramo.id, []));
        ramos.forEach(ramo => {
            const reqs = ramo.getAttribute('data-reqs').split(',').filter(Boolean);
            reqs.forEach(reqId => {
                if (successorMap.has(reqId)) {
                    successorMap.get(reqId).push(ramo.id);
                }
            });
        });
    }

    function getElementCenter(element) {
        const rect = element.getBoundingClientRect();
        const containerRect = mallaContainer.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
        };
    }

    function drawLine(startEl, endEl, isHighlighted = false) {
        const start = getElementCenter(startEl);
        const end = getElementCenter(endEl);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // Curva de Bézier para que las líneas sean suaves
        const d = `M ${start.x} ${start.y} C ${start.x + 50} ${start.y}, ${end.x - 50} ${end.y}, ${end.x} ${end.y}`;
        
        path.setAttribute('d', d);
        path.setAttribute('data-start', startEl.id);
        path.setAttribute('data-end', endEl.id);
        if (isHighlighted) {
            path.classList.add('highlight');
        }
        svgContainer.appendChild(path);
    }
    
    function drawAllLines() {
        svgContainer.innerHTML = ''; // Limpiar líneas existentes
        ramos.forEach(ramo => {
            const reqs = ramo.getAttribute('data-reqs').split(',').filter(Boolean);
            if (reqs[0] === 'ALL-PREVIOUS') return; // No dibujar líneas para este caso especial

            reqs.forEach(reqId => {
                const reqEl = document.getElementById(reqId);
                if (reqEl) {
                    drawLine(reqEl, ramo);
                }
            });
        });
    }

    function resetStyles() {
        ramos.forEach(r => {
            r.classList.remove('selected', 'prereq', 'successor');
        });
        document.querySelectorAll('#lines-container path').forEach(p => {
            p.classList.remove('highlight');
        });
    }
    
    function highlightPrereqsAndSuccessors(selectedRamo) {
        resetStyles();
        
        selectedRamo.classList.add('selected');

        // Función recursiva para encontrar y resaltar todos los prerrequisitos
        function highlightPrereqsRecursive(ramoId) {
            const ramo = document.getElementById(ramoId);
            if (!ramo) return;

            const reqs = ramo.getAttribute('data-reqs').split(',').filter(Boolean);
            
            if (reqs[0] === 'ALL-PREVIOUS') {
                 const selectedSemesterIndex = Array.from(ramo.parentElement.parentElement.children).indexOf(ramo.parentElement);
                 for (let i = 0; i < selectedSemesterIndex; i++) {
                     const semestre = document.getElementById(`semestre-${i+1}`);
                     semestre.querySelectorAll('.ramo').forEach(r => {
                        if (r.id !== ramo.id) r.classList.add('prereq');
                     });
                 }

            } else {
                 reqs.forEach(reqId => {
                    const reqEl = document.getElementById(reqId);
                    if (reqEl) {
                        reqEl.classList.add('prereq');
                        document.querySelector(`path[data-start='${reqId}'][data-end='${ramoId}']`)?.classList.add('highlight');
                        highlightPrereqsRecursive(reqId); // Llamada recursiva
                    }
                });
            }
        }

        // Función recursiva para encontrar y resaltar todos los sucesores
        function highlightSuccessorsRecursive(ramoId) {
            const successors = successorMap.get(ramoId) || [];
            successors.forEach(succId => {
                const succEl = document.getElementById(succId);
                if (succEl) {
                    succEl.classList.add('successor');
                     document.querySelector(`path[data-start='${ramoId}'][data-end='${succId}']`)?.classList.add('highlight');
                    highlightSuccessorsRecursive(succId); // Llamada recursiva
                }
            });
        }
        
        highlightPrereqsRecursive(selectedRamo.id);
        highlightSuccessorsRecursive(selectedRamo.id);
    }
    
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            if (ramo.classList.contains('selected')) {
                resetStyles();
            } else {
                highlightPrereqsAndSuccessors(ramo);
            }
        });
    });

    // Dibujar líneas iniciales y adaptar si la ventana cambia de tamaño
    initializeSuccessorMap();
    drawAllLines();
    window.addEventListener('resize', drawAllLines);
});
