var total = 0; //Suma de los precios de los productos

function listar()
{
    total = 0;
    $("#tbldatos").html('');
    if(localStorage.getItem("datos") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("datos"));

        for(var i = 0; i<arrayTabla.length; i++)
        {
            // Crear fila
            var fila = "";
            fila += "<tr>";
            fila += "<td>"+arrayTabla[i][1]+"</td>";
            fila += "<td>s/ "+arrayTabla[i][2]+"</td>";
            fila += "<td>"+arrayTabla[i][3]+"</td>";
            fila += "<td>s/ "+arrayTabla[i][4]+"</td>";
            fila+="<td>"+'<button class="btn btn-sm btn-info" onclick="eliminar('+arrayTabla[i][0]+')">X</button>'+"</td>";
            fila += "</tr>";

            $("#tbldatos").append(fila);
            total = parseInt(total) + parseInt(arrayTabla[i][4]);
        }
    }

    var fila = "";
    fila += "<tr>";
    fila += "<td></td>";
    fila += "<td></td>";
    fila += "<th>"+"Total:"+"</th>";
    fila += "<th>s/ "+total+"</th>";
    fila += "<td></td>";
    fila += "</tr>";

    $("#tbldatos").append(fila);
}

function agregarProducto(producto, precio)
{
  if(localStorage.getItem("datos") == null)
  {
      var arrayFila = [1, producto, precio, 1, precio];
      var arrayTabla = [arrayFila];
      var arrayTableJSON = JSON.stringify(arrayTabla);
      localStorage.setItem("datos", arrayTableJSON);
  }
  else
  {
      var arrayTabla = JSON.parse(localStorage.getItem("datos"));
      var existe = false;

      for(var i = 0; i<arrayTabla.length; i++)
      {
        if (arrayTabla[i][1] == producto){
          existe = true;
          break;
        }
      }

      // Insertar a array tabla
      if(existe==true){
        arrayTabla[i][3] ++;
        arrayTabla[i][4] = arrayTabla[i][2] * arrayTabla[i][3];
      }
      else
      {
        var arrayFilaInsertar = [arrayTabla.length, producto, precio, 1, precio];
        arrayTabla.push(arrayFilaInsertar);
      }

      // Convertir array a JSON(cadena) y guardar en localStorage
      localStorage.setItem("datos", JSON.stringify(arrayTabla));
  }

  listar();
}

function eliminar(fila)
{
    if(localStorage.getItem("datos") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("datos"));

        for(var i = 0; i<arrayTabla.length; i++)
        {
            if(arrayTabla[i][0] == fila)
            {
                arrayTabla.splice(i, 1);
            }
        }
        localStorage.setItem("datos", JSON.stringify(arrayTabla));
        listar();
    }
}

function enviarCompra(nombre, email)
{
    var arrayTabla
    //Verificar si nuestra variable datos no existe
    if(localStorage.getItem("compra") == null)
    {
        var arrayFila = [1, nombre, email, localStorage.getItem("datos"), total];
        arrayTabla = [arrayFila];
        var arrayTableJSON = JSON.stringify(arrayTabla);
        localStorage.setItem("compra", arrayTableJSON);
    }
    else
    {
        var arrayTabla = JSON.parse(localStorage.getItem("compra"));

        // Insertar a array tabla
        var arrayFilaInsertar = [arrayTabla.length, nombre, email, localStorage.getItem("datos"), total];
        arrayTabla.push(arrayFilaInsertar);

        // Convertir array a JSON(cadena) y guardar en localStorage
        localStorage.setItem("compra", JSON.stringify(arrayTabla));
    }

    alert("Su compra ha sido Registrada\n" + nombre + "\n" + email + "\nTotal de la compra: " + total);
    nuevaCompra();
}

function realizarCompra()
{
    //Se leen los campos
    var nombre = document.getElementById("txtnombre").value;
    var email = document.getElementById("txtemail").value;

    //Aquí se valida que no están vacíos los campos
    if(nombre == ""){
      alert("Complete su nombre por favor");
    }
    else{
      if(email == ""){
        alert("Complete su correo por favor");
      }
      else{
          enviarCompra(nombre, email); //Se llama a la función y se guarda la compra
        }
      }
}

//Para una vez guardar la compra, limpiar los datos de la tabla
function nuevaCompra(){
  localStorage.removeItem("datos");
  listar();
}


(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);