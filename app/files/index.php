<html>
    <head>
        <title>Calculate the factorial of a non-negative integer</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link href="assets/style.css" rel="stylesheet">
        <script>
            
        </script>
    </head>
    <body class="text-center">
    
        <main class="form-signin">
        <form method="post" action="<?php echo htmlspecialchars($_SERVER[" PHP_SELF "]);?>">
            <h1 class="h3 mb-3 fw-normal">Calculate the factorial of a non-negative integer</h1>
        
            <div class="form-floating">
              <input type="number" name="yournumber" min="0" class="form-control" id="floatingInput" placeholder="Enter a number" required>
              <label for="floatingInput">Enter a number</label>
            </div>
            <p class="mb-3 fw-normal">
            <?php if (!empty($_POST)): ?>  
              <?php      
                function factorial($n)
                  {
                      if ($n == 0)
                          return 1;
                      return $n * factorial($n - 1);
                  }
                  $num = htmlspecialchars($_POST["yournumber"]);; 
                  echo "<p class='font-weight-bold'>Factorial of ", $num, " is ", factorial($num), "</p>";           
              ?>    
              <?php endif;?>
            </p>
            <button class="w-100 btn btn-lg btn-primary" onclick="calculateAmount()">Calculate value</button>
          </form>
        </main>
        <script type = ?text/javascript?>  
          function calculateAmount() {  
              var tot_price = val * 500;  
              var divobj = document.getElementById('tot_amount');  
              divobj.value = tot_price;  
          }  
      </script>  
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </body>
</html>