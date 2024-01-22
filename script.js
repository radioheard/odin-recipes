const display = (() => {
    const title = document.getElementById('title');
    const body = document.getElementById('body');
    const home = document.getElementById('switch');
    const nav = document.getElementById('nav');
    const list = document.getElementById('list');
    let img = document.createElement('img');
    let switchMode = 'menu'
    home.addEventListener('click', () =>{
        if (switchMode === 'home') {
            body.textContent = '';
            showMenu();
            img.src = 'images/icons/menu.png'
            home.appendChild(img);
            switchMode = 'menu'
        } else if (switchMode === 'menu'){
            nav.style.visibility = 'visible';
            switchMode = 'list'
        } else {
            nav.style.visibility = 'hidden';
            switchMode = 'menu';
        }
        document.documentElement.scrollTop = 0;
    })
    const clearMenu = (e) => {
        body.textContent = '';
        home.textContent = '';
        img.src = 'images/icons/home.png'
        home.appendChild(img);
        switchMode = 'home';
        nav.style.visibility = 'hidden';
        recipeBuilder(e.target.id);
        document.documentElement.scrollTop = 0;
    }
    const showMenu = () => {
        let foodId = 0;
        recipeBook.recipes.forEach(recipe => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.style.backgroundImage = `url('${recipe.img}')`;
            const name = document.createElement('h3');
            name.classList.add('hvr-sweep-to-right');
            let nameT = document.createTextNode(`${recipe.name}`);

            name.id = foodId;
            name.addEventListener('click', clearMenu)
            name.appendChild(nameT);
            card.appendChild(name);
            body.appendChild(card);
            foodId++;
        });
    }
    const foodList = () => {
        let foodId = 0;
        recipeBook.recipes.forEach(recipe => {
            let foodItem = document.createElement('li')
            let foodLink = document.createElement('a')
            let nameT = document.createTextNode(`${recipe.name}`);
            foodLink.id = foodId;
            foodLink.addEventListener('click', clearMenu)
            foodLink.appendChild(nameT);
            foodItem.appendChild(foodLink);
            list.appendChild(foodItem);
            foodId++;
        });
    }

    const recipeBuilder = (id) => {
        // title set up
        const foodImages = () => {
            const foodImg = document.createElement('div');
            foodImg.style.backgroundImage = `url('${recipeBook.recipes[id].img}')`
            foodTitle.appendChild(foodImg)
        }
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');
        const foodTitle = document.createElement('div');
        foodTitle.classList.add('food-title');
        const foodHeader = document.createElement('h2');
        let foodHeaderT = document.createTextNode(`${recipeBook.recipes[id].name}`);
        foodHeader.appendChild(foodHeaderT);
        
        foodImages();
        foodTitle.appendChild(foodHeader);
        foodImages();
        recipe.appendChild(foodTitle);
        body.appendChild(recipe);

        // ingredients set up

        const ingredients = document.createElement('div');
        ingredients.classList.add('ingredients');
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const copy = document.createElement('button');
        copy.classList.add('copy');
        const copyImg = document.createElement('img');
        copyImg.src= 'images/icons/copy.png';
        copy.appendChild(copyImg);

        function showSnackBar() {
            const sb = document.getElementById("snackbar");
          
            //this is where the class name will be added & removed to activate the css
            sb.classList.add("show");
          
            setTimeout(()=>{ sb.className = sb.className.replace("show", ""); }, 3000);
          }

        copy.addEventListener('click', () => {
            navigator.clipboard.writeText(ingList.innerText);
            console.log('Content copied to clipboard');
            showSnackBar();
          })
        const mp = document.createElement('button');
        mp.textContent = 'Meal Prep!';
        mp.classList.add('mp');
        mp.addEventListener('click', () => {
            let mpIngredients=[];
            recipeBook.recipes[id].ingredients.forEach(ingredient => {
                let text = ingredient;
                let checkArr = text.split(' ');
                let item = checkArr[0];
                if (isNaN(item) == false) {
                    item = Number(item)*recipeBook.recipes[id].mpIndex;
                    checkArr[0] = item;
                    let newIng = checkArr.join(' ');
                    mpIngredients.push(newIng);
                } else {
                    mpIngredients.push(text);
                }
            })
            ingList.textContent = '';
            liMaker (mpIngredients, ingList);
            mp.classList.add('prepped');
        })

        if (isNaN(recipeBook.recipes[id].mpIndex) === true ) {
            mp.style.visibility = 'hidden'
        }

        buttons.appendChild(mp);
        buttons.appendChild(copy);

        const ingH = document.createElement('h4');
        const ingredientsT = document.createTextNode('Ingredients:');
        ingH.appendChild(ingredientsT);
        ingredients.appendChild(ingH);

        const ingList = document.createElement('ul');
        const liMaker = (source, destination) => {
            source.forEach(ingredient => {
                const li = document.createElement('li');
                let liT = document.createTextNode(`${ingredient}`);
                li.appendChild(liT);
                destination.appendChild(li);
            })
        };
        liMaker(recipeBook.recipes[id].ingredients, ingList);
        ingredients.appendChild(ingList);
        ingredients.appendChild(buttons);
        recipe.appendChild(ingredients);

        // instructions set up

        const inst = document.createElement('div');
        inst.classList.add('steps');

        const instH = document.createElement('h4');
        const instT = document.createTextNode('Instructions:');
        instH.appendChild(instT);
        inst.appendChild(instH);

        const instList = document.createElement('ol');
        liMaker(recipeBook.recipes[id].steps, instList);
        inst.appendChild(instList);
        recipe.appendChild(inst);
    }
    return {title, body, clearMenu, showMenu, foodList};
})();

const recipeBook = (() => {
    let recipes = [
        {
            'name': 'Oatmeal Protein Cookies',
            'img': 'images/cookies.jpeg',
            'ingredients': ['2 cups of rolled oats', '2 scoops of vanilla protein', '4 teaspoons of Maca powder', '1 teaspoon of Baking soda', 'A pinch of salt', 'Bit of sugar', '100 grs of butter', '1 egg', '1 teaspoon of vanilla extract', 'Chocolate chips'],
            'steps': ['Preheat oven to 180 degrees celsius.', 'Run one cup of rolled oats on a food processor until the oats look like flour, then mix with all the dry ingredients (except sugar) and leave it there.', 'Soften the butter on microwave a few seconds and then cream it on a separate bowl with the sugar until well combined. Add egg and vanilla extract and mix thoroughly.', 'Slowly add the contents of the dry bowl to the creamed mixture, and start combinin everything together. If it gets rough near the end you can use your hands instead of a mixer.', 'Finally, add the chocolate chips to the mixture with the help of a wooden spoon to mix it. Put the dough on the fridge while setting up a cooking tray sprayed with fritolin and some parchment paper. The smooth side of the paper should go upwards and you can spray it again with fritolin.', 'Now that the dough is a bit cooler it will be easier to create the dough balls that will become our cookies. Use a tablespoon to grab the correct measuremont of dough. It should yield aproximately 12 cookies.', 'Bake for 8-10 minutes until the bottoms are brown and done!'],
            'mpIndex': 2
        },
        {
            'name': 'KFC Popcorn Chicken',
            'img': 'images/kfc-chicken.jpg',
            'ingredients': ['300 grs diced chicken breast', '0.5 teaspoons of baking powder', '2 tablespoons of flour', 'oil cooking spray', '1 egg, beaten', '1 tablespoon of salt', '1 teaspoon of basil', '1 teaspoon of thyme', '2 teaspoons of oregano', '1 teaspoon of black pepper', '0.5 teaspoon of white pepper', '2 teaspoons of paprika', '1 teaspoon of garlic powder', '1 teaspoon of ground ginger', '2 teaspoons of mustard', 'Panko'],
            'steps': ['Dice your chicken in cubes or strips.', 'Mix all the spices with the flour and do not forget the baking powder!', 'Coat chicken with the flour mixture.', 'Quickly dip the chicken in the egg, and give it a second round of coating with panko.', 'Spray with cooking oil and transfer to medium high oven or airfryer. It should be done in 10-15 minutes but you can stop halfway through and freeze the precooked chicken for mealprep!'],
            'mpIndex': 4
        },
        {
            'name': 'Tarta de Calabaza',
            'img': 'images/tart-calab.jpg',
            'ingredients': ['1 calabaza chica (con dos normales haces tres tartas)', 'Aceite de oliva', 'Sal y Pimienta', '1 cebolla', '1 morron', '2 huevos, batidos', '2 cucharadas de queso crema', '200 grs de queso (mozzarella, cremoso, parmesano, etc)', 'Tapas para tarta'],
            'steps': ['Partir calabaza en dos y sacarle las semillas.', 'Cubrir con aceite de oliva, salpimentar y llevar a horno medio-alto durante 1hr aprox. (Hasta que este blando al pincharlo con un tenedor)', 'Sacar la parte de adentro y llevar a un bowl. Hacer un pure lo mas smooth posible.', 'Picar y saltear cebolla y morron durante 5-7 minutos', 'Mezclar la cebolla y el morron con el pure que teniamos, y agregar los huevos, queso crema y mezclar', 'Agregar el otro queso y revolver.', 'Poner la tapa de tarta en la tartera y disponer la mezcla. Tapar con la otra tapa, repulgue, 20-30 minutos de horno y adentro! (Dejar enfriar primero)'],
            'mpIndex': 3
        },
        {
            'name': 'Ropa Vieja',
            'img': 'images/ropa-vieja.jpg',
            'ingredients': ['1 kg de carne, idealmente entrania, pero puede ser vacio o bola de lomo', 'Sal y pimienta a gusto(bastante)', '1 cebolla grande picada', '1 cebolla de verdeo picada', '1 morron rojo, verde y amarillo (1 de cada uno, no un morron arcoiris)', '3 dientes de ajo pelados y apretados', '1 cucharada sopera de ajo deshidratado', '1 cucharadita de ajo en polvo', '1 cucharadita de oregano', '1 cucharadita de paprika', '1 cucharadita de comino', '260 ml de pure de tomate', '1 cucharada de azucar', 'Agua segun haga falta', '1 lima, solo el jugo'],
            'steps': ['Calentar una olla piola y agregar un poco de aceite. Salpimentar la carne y cortarla en pedazos grandes tipo estofado para que entren en la olla.', 'Por tandas, ir tirando la carne en la olla a fuego medio alto hasta dorar de ambos lados, para luego reservarlos en un bowl a parte. Conservar lo quemadito de la olla.', 'Agregar cebollas, ajos y morrones ya picados y darles un toque de sal. Cocinar a fuego moderado hasta que doren.', 'Agregar las especias (polvo de ajo, oregano paprika y comino), revolver y cocinar un minuto mas. Luego agregar el pure de tomate y el jugo de una lima, y volver a incorporar la carne en la olla. Empujarla hacia el fondo de la olla para que quede tapada y de no haber suficiente liquido, agregar agua.', 'Cocinar a fuego mas que minimo por 1hr o hr y media, hasta que la carne se pueda desarmar facilmente.', 'Con la ayuda de dos tenedores, deshilachar la carne y volverla a la olla. Checkear sal y pimienta y estamos. Se come con arroz blanco o en taco. O en lo que quieras, ya estas grande.'],
            'mpIndex': 2
        },
        {
            'name': 'Lemon Garlic Pasta',
            'img': 'images/lemon-pasta.jpg',
            'ingredients': ['500 grs tallarini', '2 garlic cloves', 'Olive oil', '1 lemon, juice and zest', '1 tbsp chili flakes', '200 ml heavy cream', 'Salt and pepper', 'Fresh parsley'],
            'steps': ['Heat up water to cook your pasta with some salt', 'In a pan, add olive oil with minced garlic cloves and chili flakes. Cook until browned, add lemon juice and let it simmer for a bit.', 'Add heavy cream, lemon zest, parsley, salt and pepper. Let it simmer on very low heat while you start cooking your pasta in your already boiling water.', 'When pasta is al dente, grab a cup of the pasta water and rinse the rest. Add the pasta and the water to the sauce.', 'Top it with parsley and cheese and enjoy!']
        },
        {
            'name': 'Ragu Bolognesa',
            'img': 'images/ragu.jpg',
            'ingredients': ['400 grs de carne picada especial', '150 grs de panceta ahumada', '2 ramas de apio', '1 zanahoria', '300 ml de leche', '250 ml de caldo', '250 gr de pure de tomate', 'Vino blanco'],
            'steps': ['Picar panceta bien chica como si fuera carne picada y reservar. Picar todas las verduras lo mas chikito posible.', 'Hervir la leche para separar la nata, una vez que salga esa gordura guardarla para mas adelante xq la vamos a usar.', 'Calentar una buena ollarda y dorar la panceta. Normalmente no ahce falta echarle aceite pero si le queres darle un toque, be my guest. Una vez que esta dorada agregar la carne picada y dale hasta que se dore todo.', 'Retirar la carne un toque de la olla. Agregar un poco de manteca para cocinar las verdures, y agregar dichas verduras que para este punto estan chikitas. Darle un toque de sal a todo.', 'Una vez que se doran las verduras volver a agregar la carne.', 'Agregar caldo y pure de tomate,revolver bien y dejar hasta que empiece a "pipiare", que es cuando empieza ese burbujeo pesado plop plop que rico brodiii.', 'Salpimentar y bajar a fuego mas que minimo. Cocinar 1 hr semi tapado, revolviendo ocasionalmente.', 'Agregar la mitad de la leche y cocinar 45 minutos mas.', 'Agregar la otra mitad de la leche y cocinar otros 45 min', 'Agregar la nata que teniamos guardada y revolver bien hasta que se deshaga. Cocinar otros 5 minutos y estamos listos!'],
            'mpIndex':3
        },
        {
            'name': 'NY Pizza Dough',
            'img':'images/pizza.jpeg',
            'ingredients': ['5 cups of flour, plus more fore dusting', '2 tablespoons of sugar', '1.5 tablespoons of salt', '1 pack of instant yeast (10g)', '3 tablespoons of olive oil', '2 cups of lukewarm water'],
            'steps': ['Combine flour, sugar and yeast in bowl, then make a hole in the center and pour in the water. Start kneeding until a basic dough is formed, it will be messy!', 'Once the dough is formed, take it out of the bowl and pour half the oil inside the bowl, place the dough inside again, and pour the other half on top of the dough. Kneed inside the bowl until everyhthing is absorbed.', 'Stretch the dough by hand (do NOT use a rolling pin ever), and add the salt and any spice you like(i.e rosemary is really good!). Kneed the dough vigorously for 10 minutes or until the surface looks smooth.', 'Divide the dough into 3-4 pieces and rest overnight. You can also store it in containers and freeze them right away!' ,'Before cooking the dough, allow it to rest at room temperature for at least 30 min. If doughs are frozen, let them unthaw on the fridge for 24-48 hrs beforehand!'],
            'mpIndex':2
        },
        {
            'name': 'Tacos de Pollo',
            'img':'images/taco-pollo.jpg',
            'ingredients': ['0.5 cebolla cortada a la mitad', '2 clavos', '500 g. de pechuga', '4 dientes de ajo', '1 hoja de laurel', '1 cucharadita de tomillo', '1 cucharadita de oregano', 'PARA LA SALSA:', '4 cucharadas de Aceite de Oliva', '1 cebolla', '1 morron', '3 dientes de ajo picados finos', '260 grs de pure de tomate', '1 cucharadita de azúcar moreno', '2 hojas de laurel', '1 cucharadita de tomillo', '1.5 cucharaditas de oregano', '1 cucharadita de pimienta', '1 aji picante', 'Sal a gusto'],
            'steps': ['Incrustamos los clavos en la cebolla y la introducimos en la olla junto con la carne, el ajo, la hoja de laurel, el orégano, el tomillo y una pizca de sal. Cubrimos de agua y llevamos el conjunto a ebullición, bajamos el fuego y cocemos a fuego lento, hasta que la carne esté tierna(aprox 1hr segun el grosor de la carne).', 'Retiramos la olla del fuego y dejamos que la carne se enfríe en el líquido de cocción. Sacamos el pollo y lo cortamos en tiras.', 'Para la salsa, calentamos el aceite en una sartén, añadimos la otra cebolla, el morron, el ajo y freímos unos 6 minutos a fuego lento, removiendo de vez en cuando, hasta que la cebolla esté translúcida. Agregamos el tomate y el azúcar y rehogamos 10 minutos más.', 'Incorporamos las hojas de laurel, el tomillo y el orégano, los clavos, la pimienta y el aji picado chiquito. Cocemos todo hasta que espese la salsa. Después, añadimos la carne en tiras y sazonamos.'],
            'mpIndex':3
        },
        {
            'name': 'Arrabbiata Sauce',
            'img': 'images/arrabiata.jpg',
            'ingredients': ['4 tablespoons olive oil', '8-10 cloves garlic, minced','2 tablespoons crushed red pepper flakes', '1 big yellow onion, finely chopped', '2 400grs cans EACH: crushed tomatoes AND whole tomatoes', '1 small can (150grs) of tomato paste', '2 teaspoons english sauce', '1 plant woth of basil leaves, torn by hand'],
            'steps': ['In a large saucepan over low heat, add the olive oil, minced garlic and red pepper flakes and sauté for 5 minutes stirring occasionally so nothing burns but the flavor infuses in the oil and is fragrant.', 'Then, kick up the heat to medium-high, add the onions and continue to stir and cook for an additional 3-4 minutes, stirring as necessary.', 'Add all the tomato products along with the fish sauce, ½ teaspoon of salt, and allow the sauce to reach a simmer before lowering the heat. Take a wooden spoon and gently mash the larger tomatoes to help break them down.', ' Allow the sauce to continue simmering for 30-40 minutes over low heat. Add the basil into the sauce around the last 15 minutes. Taste and adjust with additional salt as desired. For a looser sauce, cook 30 minutes for a more concentrated flavor, let it cook for 40 minutes. I prefer it at the 40-minute mark.', 'Use the sauce immediately with prepared pasta or allow for it to come to room temperature before storing in containers. The sauce can be refrigerated for up to 1 week or frozen for up to 3 months.']
        },
        {
            'name': 'Pastel de Papa God',
            'img': 'images/pastel-papa.jpg',
            'ingredients': ['1 Cebolla Morada (o Blanca)', '3 Tallos de Cebollita de Verdeo', '1 Morrón','1 Tomate', '2 Dientes de Ajo', '1 Vaso de Vino Tinto', '2 cucharaditas de pimenton', '2 cucharaditas de aji molido', '2 hojas de laurel', '1.5kg Roast Beef', '1.5kg Papas', '50gr Manteca', 'Nuez moscada', '1 huevo', '150gr Queso Cremoso', '50gr Queso Parmesano'],
            'steps': ['En una olla grande saltear ajo, cebolla morada, cebolla de verdeo (solo la parte blanca), morron y tomate durante 5-7 minutos.', 'Agregar vino, pimenton, laurel, aji molido y una buena cantidad de agua (arranca por una taza y vas viendo).', 'Meter la carne, sal gruesa a gusto y cocinar tapado durante 2 hrs aprox, hasta que se desarme la carne.', 'Mientras tanto, hervir las papas para hacer un pure. Cuando esten cocidas pisar lo mas fino posible y agregar manteca, sal, nuez moscada, el huevo y la parte verde de las cebillas de verdeo que no usamos hoy.', 'Una vez lista la carne, desmechar con tenedores o con la mano y agregar una parte del caldo y las verduras que quedaron.', 'Precalentar el horno a temperatura media-alta(200C aprox). Para el armado, empezar en una fuente grande de horno con una capa de la mitad del pure, una capa con toda la carne, una capa de queso creomoso, otra capa de pure y finalizar con queso parmesano arriba para que se gratine. Llevar a horno durante 30 minutos y te queda flamoide!']
        },{
            'name':'Chocolate Babka',
            'img': 'images/babka.jpg',
            'ingredients': ['FOR THE DOUGH:','4½ cups all-purpose flour (540g)', '½ cup granulated sugar (100g)', '1 packet instant yeast', '4 large eggs', '½ cup whole milk', '1½ teaspoons kosher salt', '10 tablespoons room-temp unsalted butter (142g)', 'FOR THE FILLING:', '½ cup unsalted butter cubed (113g)', '½ cup heavy cream (120mL)', '8 ounces chopped dark chocolate (225g)', '¾ cup powdered sugar (90g)', '⅓ cup unsweetened cocoa powder (30g)', 'FOR THE SYRUP:', '⅓ cup granulated sugar (66g)', '⅓ cup water (80mL)'],
            'steps': ['Whisk together the flour, sugar, and yeast in the bowl of a stand mixer. Add the eggs, milk, and salt and mix on low speed using the dough hook attachment until combined and a dough starts to form, for about 2 minutes.', 'Add the butter a tablespoon or so at a time, waiting for the butter to be incorporated before adding more. Once all the butter has been added, continue kneading until a smooth elastic dough forms, about 10 minutes, scraping down the sides of the bowl occasionally. The dough will still feel sticky but will be very stretchy.', 'Transfer the dough to a large oiled bowl, turning to coat. Then cover and chill overnight or for at least 8 hours.', 'In a small saucepan, combine butter and cream. Heat over medium heat until butter is melted and the mixture is steaming. Add the chocolate and stir until melted, then remove from the heat. Whisk in the powdered sugar and cocoa powder. Transfer to a bowl and let cool until thickened to a spreadable consistency, about 1 hour.', 'For the Assebly: Butter 2 (8x4-inch) loaf pans or spray with baking spray with flour. Then line with parchment paper.', 'On a lightly floured surface, divide the chilled dough in half, and return one dough ball to the fridge. Gently roll the dough into a 12x16-inch rectangle. Spread half of the filling on dough all the way to the edge on three sides, leaving a 1-inch border on one short side. (The dough may pull a little bit while spreading, but it shouldn’t tear.) Starting at the short side opposite the border, roll the dough into a tight coil, and pinch the seam to seal.', 'Using a large sharp knife, cut the dough in half lengthwise. Position each half parallel to each other with the cut sides facing up. Twist the halves together, keeping the cut sides facing up, and tuck the ends under. Gently place in a prepared loaf pan.', 'Repeat with the second half of the dough and the remaining filling.', 'Loosely cover the pans and let rise in a warm place for 1 1/2 to 2 hours or until noticeably puffed. (It won’t quite double in size)', 'Preheat the oven to 350F.', 'Bake the risen loaves for 40 minutes or until the tops are golden brown, and a wooden pick can be inserted into the center without resistance and comes out clean.', 'For the syrup: While the babkas are baking, combine the sugar and water in a small saucepan. Bring to a simmer over medium heat, stirring until the sugar is fully dissolved. Remove from the heat.', 'Brush the loaves with the syrup immediately when they come out of the oven. Let the babkas cool for 30 minutes in the pans. Serve warm or at room temperature.']
        },{
            'name':'Chicken Sriracha Cheese Sauce',
            'img': 'images/mac.jpg',
            'ingredients': ['500 grs de pechuga de pollo', '2 dientes de ajo', 'Una cucharada o ramita de romero', '2 hojas de laurel', '45 grs de manteca', '3 cucharadas de harina', '2 tazas de leche', '2 cucharadas de sriracha', '2 cucharadas de queso crema', '170 grs de cheddar', '115 grs de mozzarella', ' 0.5 cucharadas de sal, pimienta, ajo en polvo, cebolla en polvo, comino, aji molido'],
            'steps': ['Salpimentar y sellar las pechugas en una sarten u olla profunda con un poco de aceite. Aromatizar con los dientes de ajo y el romero.', 'Trasferir a una olla con agua hirviendo que cubra completamente la carne y agregar el laurel. Hervir a fuego bajo hasta que las pechugas se puedan desmechar con facilidad(aprox. 0 minutos pero depende del tamaño de las mismas)', 'Desmechar en un recipiente separado añadiendo un poco del caldo de coccion para humectar un la carne.', 'En la sarten donde se cocinaron las pechugas (aprovechando los pedacitos quemados del fondo), preparar un roux derritiendo la manteca a fuego moderado. Añadir la harina y una vez se forma la pasta añadir tambien las especias combinadas. Agregar la sriracha y tambien la leche lentamente, revolviendo constantemente para que no se formen grumos.', 'Una vez integrado todo, bajar el fuego y añadir los quesos cortados en trozos pequeños para facilitar su derreticion. Este paso lleva un tiempo hasta que todo queda homogeneo asi que paciencia. Revolver esporadicamente.', 'Una vez incorporado toda la mezcla agregar las pechugas desmenuzadas y ya podes usar esta salsa con la pasta de tu preferencia, pero recomiendo coditos para simular el clasico mac and cheese. Si la salsa te queda muy espesa podes usar el caldo del pollo para aflojarla un poco, eso va en preferencia.'],
            'mpIndex':2
        }, {
            'name': 'Chicken Pot Pie',
            'img': 'images/potpie.jpg',
            'ingredients': ['1.5 pechugas de pollo', '1 zanahoria', '2 puerros', '1 cebolla', '1 diente de ajo', '1 lata de arvejas', ' 1 cda de manteca', '1 cda de harina', '1 vaso de leche', 'un chorrito de crema de leche', '2 tapas de tarta criollas', '1 cda de oregano', 'sal y pimienta'],
            'steps': ['Picar la cebolla y el ajo. Cortar los puerros en rodajas. La zanahoria, en trozos pequeños. Saltear estas verduras en 1 cucharada de manteca durante 2 o 3 minutos.', 'Agregar el pollo cortado en trozos: si está cocido, saltear 2 minutos más. Si está crudo, cocinar hasta que esté dorado, serán unos 5 mintuos más o menos.', 'Sumar las arvejas y salpimentar. También se le puede poner choclo en grano (en ese caso, media lata y media lata). Revolver hasta que las arvejas tomen calor. Salpimentar y agregar el orégano', 'Espolvorear con la cucharada de harina. Mover sobre fuego medio la preparación durante 2 minutos aproximadamente.', 'Entibiar en el microondas (o en un cacharrito y al fuego)  el vaso de leche. Agregar a la preparación y revolver. Se va a formar una especie de bechamel o salsa blanca y va a quedar una preparación súper cremosa. Agregar el chorro de crema de leche e integrar.', 'Poner una de las masas en una tartera con profundidad aceitada, sumar la preparación y volver a cubrir con la otra masa. Lo ideal para esta tarta de pollo es hacerle algunos agujeros pequeños para que salga el vapor (o pincharla)', 'Hornear a 180º hasta que la masa se vea dorada y servir. El relleno rinde para un tarton o dos tardas chiquitas (recomiendo el meal prep que rinde joya para 3 tartas sustanciosas.)'],
            'mpIndex': 2
        }, {
            'name': 'Oven Baked Beef Brisket',
            'img': 'images/brisket.jpg',
            'ingredients': ['2.5kg of brisket (tapa de asado)', 'FOR THE RUB:', '2 tablespoons brown sugar', '2 tablespoons paprika smoked', '2 teaspoons dry mustard', '2 teaspoons garlic powder', '2 teaspoons onion powder', '2 teaspoons salt', '½ teaspoon cumin', '½ teaspoon dried basil', '½ teaspoon dried thyme', '¼ teaspoon cayenne pepper', 'FOR THE SAUCE:', '1 tablespoon vegetable or canola oil', '1 big chopped onion', '3 chopped celery branches', '1 chopped green bell pepper', '3 garlic cloves minced', '⅛ teaspoon cayenne pepper', '3 tablespoons wine vinegar', '3 tablespoons Worcestershire sauce (salsa inglesa)', '½ cup ketchup', '3 cups beef broth', '2 bay leaves'],
            'steps': ['If the brisket has a thick layer of fat, trim it down to ¼-inch. Mix together rub ingredients. Rub all over brisket, wrap it in plastic wrap or place in in a sealable container and refrigerate overnight, or for at least 8 hours.', 'Preheat the oven to 300°F. Place the brisket in a roasting pan and cover the baking pan with a lid, or seal it well with foil. Bake for 3 hours.', 'Meanwhile, heat the oil in a small pot over medium heat. Add the onion, celery, bell pepper and garlic and sauté for 3 minutes until the vegetables start to soften. Add the cayenne, vinegar, ketchup, Worcestershire sauce, vinegar, broth and bay leaves. Bring to a simmer and simmer for 10 minutes until it reduces slightly. Remove from the heat.', 'Take the brisket from the oven, turn it over, and pour the half of the sauce into the pan over the brisket, recover the pan (if using foil, cover the pan tightly, using towels to protect your hands from the hot pan). Reserve the rest of the sauce in the pot. Continue cooking in the oven for another 2 hours or so, or until the meat is just about fork tender. Remove the foil and continue baking for another 30 minutes until the outside of the brisket has browned up and gotten a bit crusty.', 'Remove from the oven, take the brisket out of the pan, and let it sit on a cutting board tented with foil (with a little moat to catch the juices!) for 20 minutes before slicing across the grain. If there is any sauce left in the pan, skim off the fat and add it to the remaining sauce in the pot, and heat it again before serving the brisket with the additional sauce for people to drizzle over their meat if they like. If you want a smother sauce you can strain out the solids, or puree it with a blender.']
        }, {
            'name': 'Life-Changing Breakfast Burrito',
            'img': 'images/brburrit.jpeg',
            'ingredients': [' 6 Tortillas (might be more)', '1 lbs of quite lean ground beef', '12 large eggs', '450grs whipped lowfat cottage cheese (could be ricotta or mozzarella)', '½ bunch of kale, spinach or broccoli (roughly 2 cups), chopped', '1 Tbsp (8 g) chili powder', '1/2 tsp (2 g) paprika, smoked preferably', '1 tsp (3 g) onion powder', '1 tsp (3.5 g) garlic powder', '1/2 Tbsp (4 g) cumin', '1/2 Tbsp oregano', '1 tsp (2 g) black pepper', '1 tsp (9g) salt (or to taste)'],
            'steps': ['Brown and cook meat in pan onmedium-high heat. After a few minutes add spices and keep cooking.', 'Add the cottage cheese and mix well', 'Add in the kale or other veg and cook down until starting to thicken', 'Put meat in a bowl or on a plate to cool and thicken', 'Lightly scramble eggs over medium-high heat until cooked and creamy', 'Portion out fillings into 6 Ultimate Tortillas (or however much) and wrap', 'Place burritos into a baking dish or onto a tray to let freeze']
        }, {
            'name': 'Chicken Burrito Bowl',
            'img': 'images/burrito-bowl.jpg',
            'ingredients': ['BURRITO SEASONING:', '1 tsp each onion powder, dried oregano, salt', '2 tsp each dried cumin powder, paprika', '1 tsp black pepper', 'CHICKEN FILLING:', '600 g, sliced in half ', '2 tbsp olive oil ', '0.5 onion chopped', '2 garlic cloves , finely minced', '1 red capsicum/bell pepper , diced', '400 g black or kidney beans', '0.25 cups of water', 'FOR THE RICE:', '1.5 tbsp olive oil', '2 garlic cloves , minced', '0.5 white onion , finely chopped', '1 cup long grain white rice', '435 ml chicken or vegetable broth', '2.5 tbsp tomato paste', 'salt', '1 serrano or jalapeno pepper'],
            'steps': ['START WITH THE RICE:', 'Heat oil in a large saucepan over medium heat. Add garlic, stir briefly, then add onion. Cook for 4 - 5 minutes until translucent (not browned / golden).', 'Add rice, broth, salt and tomato paste. Stir until tomato paste is dissolved.', 'Plonk in jalapeno. Cover, bring to simmer, then lower heat to low so the water is simmering gently.', 'Cook for 15 minutes or until the liquid is absorbed (tilt pot to check).', 'Remove from heat, leave lid on and rest for 10 minutes (KEY STEP). The residual liquid on the surface of the rice will get absorbed and rice will go from sticky to fluffy.', 'luff with fork then serve! (Optional: garnish with extra coriander)', 'FOR THE BURRITO FILLING(and while rice is cooking):', 'Mix Seasoning ingredients. Drizzle 1 tbsp oil over chicken, mix to coat. Sprinkle with Seasoning, toss to coat.', ' Heat 1 tbsp oil in a large skillet over high heat. Add chicken, cook 2 minutes. Turn and cook 1.5 minutes. Remove, rest 2 minutes then chop.', ' In the same skillet, add onion and garlic, cook 1 minute. Add capsicum, cook 2 minutes until onion is translucent.', 'Saute 1 garlic clove minced in a little oil until golden. Add 1 can pinto, red kidney or black beans  with 1/4 cup of the liquid in the can, 1/2 tsp each cumin, onion and paprika powder. Stir few minutes until beans thoroughly heated then mash or puree.', 'Add refried beans, diced chicken and water. Stir and cook for 2 minutes until reduces slightly. Should be thick and juicy, not watery and not dry/stodgy! Let cool 5 minutes - will thicken. Can also add cheddar sauce!'],
            'mpIndex': 2
        }, {
            'name': 'Ultimate Tortillas',
            'img': 'images/ult-tortilla.jpg',
            'ingredients': ['4 All-purpose Flour', '1.5 cups Hot water', '2 tbsp olive oil', '1 tbsp salt'],
            'steps': ['Mix ingredients (except oil), in a bowl using a wooden spoon. Once a rough dough i formed add olive oil and take out of bowl into kneading surface.', 'Knead dough for 10 minutes aprox or until smooth, then rest covered for 30 minutes.', 'Do your best to divide into 7 equal balls, then roll each ball as thin as possible (real thin)', 'Cook tortillas on high heat, both sides, and then cover. Serve or use once cool and pliable.']
        }
    ];
    return {recipes}
})();

display.showMenu();
display.foodList();