import React, { useState } from "react";


function Menu() {
  const menuData = [
    {
      category: "Entrées",
      items: [
        {
          title: "Salade César",
          description:
            "Laitue romaine, croûtons, poulet grillé, vinaigrette César",
          price: 9.99,
        },
        {
          title: "Soupe à l'oignon",
          description:
            "Soupe à base de bouillon de boeuf, oignons, croûtons et fromage gratiné",
          price: 7.99,
        },
        {
          title: "Calamars frits",
          description: "Calamars panés et frits, servi avec une sauce tartare",
          price: 12.99,
        },
        {
          title: "Salade de chèvre chaud",
          description: "Laitue, chèvre chaud, noix, vinaigrette miel-moutarde",
          price: 10.99,
        },
        {
          title: "Tartare de saumon",
          description:
            "Saumon frais, échalotes, câpres, citron, huile d'olive, pain grillé",
          price: 13.99,
        },
        {
          title: "Assiette de charcuterie",
          description: "Saucisson, jambon cru, pâté, cornichons, pain frais",
          price: 14.99,
        },
        {
          title: "Carpaccio de boeuf",
          description:
            "Boeuf finement tranché, parmesan, roquette, huile d'olive, citron",
          price: 12.99,
        },
      ],
    },
    {
      category: "Plats principaux",
      items: [
        {
          title: "Burger classique",
          description:
            "Pain, steak haché, fromage, salade, tomate, oignon, frites",
          price: 14.99,
        },
        {
          title: "Poulet rôti",
          description: "Poulet rôti, légumes de saison, pommes de terre rôties",
          price: 17.99,
        },
        {
          title: "Steak grillé",
          description:
            "Steak grillé, sauce au poivre, frites, légumes de saison",
          price: 21.99,
        },
        {
          title: "Pâtes à la carbonara",
          description:
            "Pâtes fraîches, lardons, crème fraîche, oeufs, parmesan",
          price: 16.99,
        },
        {
          title: "Pizza Margherita",
          description: "Tomate, mozzarella, basilic",
          price: 14.35,
        },
        {
          title: "Ratatouille",
          description: "Légumes d'été mijotés, servi avec du riz",
          price: 12.65,
        },
        {
          title: "Pad thaï",
          description:
            "Nouilles sautées, crevettes, poulet, légumes, cacahuètes",
          price: 15.36,
        },
      ],
    },
    {
      category: "Desserts",
      items: [
       
        {
          title: "Crème brûlée",
          description: "Crème brûlée à la vanille, servi avec un biscuit",
          price: 6.99,
        },
        {
          title: "Assiette de fromages",
          description:
            "Assiette de fromages variés, servie avec des noix et de la confiture",
          price: 9.99,
        },
        {
          title: "Tarte aux pommes",
          description:
            "Tarte aux pommes maison avec une boule de glace vanille",
          price: 6.99,
        },

        {
          title: "Brownie au chocolat",
          description: "Brownie au chocolat avec une boule de glace vanille",
          price: 7.99,
        },
        {
          title: "Profiteroles",
          description: "Choux à la crème glacée, nappés de chocolat chaud",
          price: 9.99,
        },
      ],
    },
  ];

  const menuDataWithMenus = [
    {
      category: "Menus",
      items: [
        {
          title: "Menu du jour",
          description: "Plat du jour + dessert du jour",
          options: [
            { title: "Poulet rôti", price: 18.99 },
            { title: "Steak grillé", price: 22.99 },
            { title: "Pâtes à la carbonara", price: 16.99 },
          ],
          dessert: [
            {
              title: "Tarte aux pommes maison avec une boule de glace vanille",
              price: 7.99,
            },
            {
              title: "Tarte aux framboises",
              price: 7.99,
            },
            {
              title: "Pannacota du chef Michant",
              price: 7.99,
            },
          ],
          price: 24.99,
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Entrées");
  const [showMenus, setShowMenus] = useState(false);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowMenus(false);
  };

  const handleMenusClick = () => {
    setShowMenus(true);
    setActiveCategory(null);
  };

  return (
    <div className="menu_container">
      <h1 className="menu_title">La carte du chef Michant</h1>
      <div className="btn_swap_menu">
        {menuData.map((categoryData) => (
          <button
            key={categoryData.category}
            onClick={() => handleCategoryClick(categoryData.category)}
            className={activeCategory === categoryData.category ? "active" : ""}
          >
            {categoryData.category}
          </button>
        ))}
        <button
          onClick={handleMenusClick}
          className={showMenus ? "active" : ""}
        >
          Menus
        </button>
      </div>
      {showMenus ? (
        <div className="section_container_food">
          {menuDataWithMenus.map((category) => (
            <div key={category.category}>
              {category.items.map((item) => (
                <div key={item.title}>
                  <h3 className="title_food">{item.title}</h3>
                  <p className="price_food">{item.price} €</p>
                  <p className="description_food">{item.description}</p>
                  <h2 className="flat">Plat</h2>
                  <ul className="options_food">
                    {item.options.map((option) => (
                      <li key={option.title}>
                        <h2>{option.title}</h2>
                        <p>{option.price} €</p>  
                      </li>
                    ))}
                  </ul>
                  <h1>Dessert</h1>
                  <ul className="options_food">
                    {item.dessert.map((dessert) => (
                      <li key={dessert.title}>
                        <p>{dessert.title}</p> 
                        <p><b>{dessert.price} €</b></p> 
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {menuData
            .find((categoryData) => categoryData.category === activeCategory)
            .items.map((items) => (
              <div className="container_general" key={items.title}>
                <h2 className="menu_title_general">{items.title}</h2>
                <p className="menu_description_general">{items.description}</p>
                <p className="menu_price_general">{items.price} €</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
