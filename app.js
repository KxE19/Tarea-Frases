const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            nuevaFrase: '',          // Texto de la nueva frase a agregar
            nuevoAutor: '',          // Autor de la nueva frase
            fraseEditada: {          // Objeto para almacenar los datos de la frase que se está editando
                frase: '', 
                autor: ''
            },
            indiceEditado: null,     // Índice de la frase que se está editando
            indiceEliminar: null,    // Índice de la frase que se desea eliminar
            mensajeAlerta: '',       // Mensaje de alerta para mostrar en el modal
            frasesOriginales: [      // Array de frases y autores iniciales
                { frase: '"El código es como el humor. Cuando tienes que explicarlo, es malo."', autor: "Cory House" },
                { frase: '"Primero resuelve el problema. Luego, escribe el código."', autor: "John Johnson" },
                { frase: '"Hablar es barato. Enséñame el código."', autor: "Linus Torvalds" },
                { frase: '"Los programas deben ser escritos para que las personas los lean y solo incidentalmente para que las máquinas los ejecuten."', autor: "Harold Abelson" },
                { frase: '"Cualquier tonto puede escribir un código que una computadora entienda. Los buenos programadores escriben código que los humanos pueden entender."', autor: "Martin Fowler" }
            ]
        };
    },
    computed: {
        // Computed property to count the number of phrases
        contadorFrases() {
            return this.frasesOriginales.length;
        }
    },
    methods: {
        // Método para añadir una nueva frase a la lista
        agregarFrase() {
            if (this.nuevaFrase.trim() === '' || this.nuevoAutor.trim() === '') {
                this.mostrarAlerta('Por favor, completa ambos campos antes de añadir una nueva frase.');
                return;
            }

            // Añadir la nueva frase al principio del array
            this.frasesOriginales.unshift({
                frase: this.nuevaFrase,
                autor: this.nuevoAutor
            });

            // Limpiar los campos de entrada
            this.nuevaFrase = '';
            this.nuevoAutor = '';
        },
        // Método para mostrar un mensaje de alerta en un modal
        mostrarAlerta(mensaje) {
            this.mensajeAlerta = mensaje;
            $('#alertaModal').modal('show'); // Mostrar el modal de alerta usando jQuery
        },
        // Método para abrir el modal de edición con los datos de la frase seleccionada
        abrirModalEditar(indice) {
            this.indiceEditado = indice;
            this.fraseEditada = { ...this.frasesOriginales[indice] };
            $('#modalEditar').modal('show'); // Mostrar el modal de edición usando jQuery
        },
        // Método para guardar los cambios realizados en la frase editada
        guardarEdicion() {
            if (this.indiceEditado !== null) {
                this.frasesOriginales[this.indiceEditado] = { ...this.fraseEditada };
                $('#modalEditar').modal('hide'); // Ocultar el modal de edición usando jQuery
            }
        },
        // Método para abrir el modal de confirmación de eliminación
        eliminarFrase(indice) {
            this.indiceEliminar = indice;
            $('#confirmarEliminarModal').modal('show'); // Mostrar el modal de confirmación usando jQuery
        },
        // Método para confirmar y realizar la eliminación de la frase seleccionada
        confirmarEliminacion() {
            if (this.indiceEliminar !== null) {
                this.frasesOriginales.splice(this.indiceEliminar, 1);
                this.indiceEliminar = null;
                $('#confirmarEliminarModal').modal('hide'); // Ocultar el modal de confirmación usando jQuery
            }
        }
    }
});

app.mount('#app');
