document.addEventListener('DOMContentLoaded', function () {
    // Ambil elemen navbar burger
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Periksa apakah ada navbar burger
    if ($navbarBurgers.length > 0) {
      // Tambahkan event click ke setiap navbar burger
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle class "is-active" pada navbar burger
          $el.classList.toggle('is-active');
          // Toggle class "is-active" pada navbar menu
          $target.classList.toggle('is-active');
        });
      });
    }
  });

  