$(document).ready(function () {
    // URL del servidor Flask
    const API_URL_USER1 = 'https://flask3-nu.vercel.app/api/users/user1';
    const API_URL_ALL_USERS = 'https://flask3-nu.vercel.app/api/users';
    const API_URL_USER = 'https://flask3-nu.vercel.app/api/users';

    // Ocultar formulario
    $('.contenedorFormulario').hide();

    // Evento al hacer clic en el botón de imprimir el primer usuario
    $('.botonSacarPrimero button').on('click', function () {
        $('.contenedorTarjetas .card').remove();
        // Realiza la petición AJAX
        $.ajax({
            url: API_URL_USER1,
            method: 'GET',
            success: function (user) {
                console.log('Usuario recibido:', user);
                // Llama a la función para crear la tarjeta
                addCard(user, "user1");
            },
            error: function (error) {
                console.error('Error al obtener el usuario:', error);
            }
        });
    });

    // Evento al hacer clic en el botón de imprimir todos los usuarios
    $('.botonSacarTodos button').on('click', function () {
        // Elimina todas las tarjetas previas
        $('.contenedorTarjetas .card').remove();

        // Realiza la petición AJAX para obtener todos los usuarios
        $.ajax({
            url: API_URL_ALL_USERS,
            method: 'GET',
            success: function (users) {
                console.log('Usuarios recibidos:', users);
                // Llama a la función para crear una tarjeta para cada usuario
                users.forEach(user => {
                    addCard(user, `user${user.id}`);
                });
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    });

    // Evento al hacer clic en el botón de imprimir un usuario específico
    $('.botonEnviarId button').on('click', function () {
        const userId = $('.inputBuscar input').val();  // Obtener la ID del input

        if (userId) {  // Solo si hay ID
            // Elimina todas las tarjetas previas
            $('.contenedorTarjetas .card').remove();

            // Realiza la petición AJAX para obtener el usuario con la ID proporcionada
            $.ajax({
                url: `${API_URL_USER}/${userId}`,  // Usar la ID en la URL
                method: 'GET',
                success: function (user) {
                    // Llama a la función para crear la tarjeta
                    addCard(user);
                },
                error: function () {
                    alert('No se encontró el usuario con esa ID.');
                }
            });
        } else {
            alert('Por favor, ingresa una ID.');
        }
    });

    // Añadir un nuevo usuario
    $('.anhadirNuevo').on('click', function () {
        $('.contenedorFormulario').show();

        // Enviar los datos del nuevo usuario
        $('#formularioUsuario').off('submit').on('submit', function (event) {
            event.preventDefault();

            const name = $('#name').val();

            $.ajax({
                url: API_URL_USER,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({name }),
                success: function (response) {
                    alert('Usuario añadido: ' + response.name);
                    $('.contenedorFormulario').hide();
                },
                error: function (xhr) {
                    alert('Error: ' + xhr.responseJSON.error);
                }
            });
        });
    });

    // Función para crear y añadir una tarjeta
    function addCard(user, userId) {
        const cardHtml = `
            <div class="card" data-id="${userId}">
                <div class="face face1">
                    <div class="content">
                        <img src="user.png" alt="User Image">
                        <h3>${user.name}</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <p>ID: ${user.id}</p>
                    </div>
                </div>
            </div>
        `;
        // Añade la tarjeta al contenedor
        $('.contenedorTarjetas .container').append(cardHtml);
    }
});
