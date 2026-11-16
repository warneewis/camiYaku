/**
 * CamiYaku - JavaScript (ODS 6: Agua Limpia y Saneamiento)
 * Control dinámico de pestañas, interruptores de alerta y registro de recordatorios.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECCIÓN DE ELEMENTOS DEL DOM
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const alertToggles = document.querySelectorAll('.toggle-alert');
    const btnAddReminder = document.getElementById('btn-add-reminder');
    const btnAddAlert = document.getElementById('btn-add-alert');
    const goToLinks = document.querySelectorAll('[data-goto]');
    const tabsNav = document.getElementById('main-tabs');
    const tabsToggle = document.getElementById('tabs-toggle');

    // 2. NAVEGACIÓN ENTRE PESTAÑAS
    // Igual que en el diseño: la pestaña de la vista actual cambia su texto a "Inicio".
    function mostrarVista(idVista) {
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === idVista);
        });

        tabButtons.forEach(btn => {
            const esActual = btn.dataset.tab === idVista;
            btn.classList.toggle('active', esActual);
            btn.textContent = esActual ? 'Inicio' : btn.dataset.label;
            btn.setAttribute('aria-current', esActual ? 'page' : 'false');
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Si la pestaña ya está activa (dice "Inicio"), volvemos al inicio.
            const destino = button.classList.contains('active') ? 'tab-inicio' : button.dataset.tab;
            mostrarVista(destino);
        });
    });

    // Enlaces de las tarjetas del inicio ("Mas detalle", "Descubrir más")
    goToLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarVista(link.dataset.goto);
        });
    });

    // Botón circular bajo las pestañas: oculta o muestra la barra.
    tabsToggle.addEventListener('click', () => {
        const oculta = tabsNav.classList.toggle('collapsed');
        tabsToggle.setAttribute('aria-expanded', String(!oculta));
        tabsToggle.setAttribute('aria-label', oculta ? 'Mostrar pestañas' : 'Ocultar pestañas');
    });

    // 3. SWITCHES DE ALERTAS DE FUGAS
    alertToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const alertContainer = e.target.closest('.alert-switch-item');
            const alertName = alertContainer ? alertContainer.querySelector('strong').textContent : 'Alerta';
            const isChecked = e.target.checked;

            if (isChecked) {
                alert(`Has ACTIVADO la alerta: "${alertName}". El sistema monitoreará anomalías de flujo.`);
            } else {
                alert(`Atención: Has DESACTIVADO la alerta: "${alertName}". Te sugerimos mantenerla activa para evitar desperdicio.`);
            }
        });
    });

    // 4. AGREGAR RECORDATORIOS ECOLÓGICOS
    if (btnAddReminder) {
        btnAddReminder.addEventListener('click', () => {
            const newHabit = prompt('Ingresa el nuevo hábito o recordatorio para cuidar el agua (ODS 6):');
            if (newHabit && newHabit.trim() !== '') {
                alert(`Recordatorio guardado exitosamente: "${newHabit}". ¡Sigue sumando al cuidado del agua!`);
            }
        });
    }

    // 5. AÑADIR NUEVA ALERTA (mismo comportamiento de prueba)
    if (btnAddAlert) {
        btnAddAlert.addEventListener('click', () => {
            const nuevaAlerta = prompt('¿Qué alerta deseas añadir? (ej.: Consumo nocturno inusual)');
            if (nuevaAlerta && nuevaAlerta.trim() !== '') {
                alert(`Alerta "${nuevaAlerta}" registrada de prueba.`);
            }
        });
    }

    // 6. ESTADO INICIAL: mostrar la vista de inicio
    mostrarVista('tab-inicio');
});
