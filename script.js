// Menu hambúrguer (celular)
var botaoMenu = document.getElementById("botaoMenu");
var menu = document.getElementById("menu");

// Abre e fecha o menu quando clica no hambúrguer
botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("aberto");
});

// Fecha o menu depois de clicar em um link
var linksMenu = menu.querySelectorAll("a");
linksMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
  });
});

// Filtro de produtos
var botoesFiltro = document.querySelectorAll(".filtro-botao");
var cards = document.querySelectorAll(".card");

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botoesFiltro.forEach(function (b) {
      b.classList.remove("active");
    });
    botao.classList.add("active");

    var filtro = botao.getAttribute("data-filtro");

    cards.forEach(function (card) {
      // Alguns produtos pertencem a mais de uma categoria (ex: "salgados kits"),
      // por isso a gente separa o texto por espaço e verifica se o filtro está na lista
      var categorias = card.getAttribute("data-categoria").split(" ");
      if (filtro === "todos" || categorias.indexOf(filtro) !== -1) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Quando uma pergunta abre, fecha as outras (deixa só uma aberta por vez)
var perguntas = document.querySelectorAll(".pergunta");

perguntas.forEach(function (pergunta) {
  pergunta.addEventListener("toggle", function () {
    if (pergunta.open) {
      perguntas.forEach(function (outra) {
        if (outra !== pergunta) {
          outra.removeAttribute("open");
        }
      });
    }
  });
});

// ================================================

// WhatsApp com mensagens prontas
var numeroWhatsApp = "5545998064748"; // número 45 99806-4748

function abrirWhatsApp(mensagem) {
  var url =
    "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  // 1. Botão flutuante (canto da tela)
  var botaoFlutuante = document.querySelector(".botao-whatsapp");
  if (botaoFlutuante) {
    botaoFlutuante.href =
      "https://wa.me/" +
      numeroWhatsApp +
      "?text=" +
      encodeURIComponent(
        "Olá! Vi o site da Dolce Delícias e quero fazer um pedido.",
      );
  }

  // 2. Hero - "Fazer Pedido pelo WhatsApp"
  var heroBtn = document.querySelector(".hero button");
  if (heroBtn) {
    heroBtn.addEventListener("click", function () {
      abrirWhatsApp("Olá! Vim pelo site da Dolce Delícias e quero saber mais.");
    });
  }

  // 3. Produtos - "Ver todos os produtos"
  var verTodosBtn = document.querySelector(".botao-ver-todos");
  if (verTodosBtn) {
    verTodosBtn.addEventListener("click", function () {
      abrirWhatsApp("Olá! Quero ver o cardápio completo da Dolce Delícias.");
    });
  }

  // 4. Encomendas - "Quero fazer uma encomenda"
  var encomendaBtn = document.querySelector(".encomendas .botao-encomenda");
  if (encomendaBtn) {
    encomendaBtn.addEventListener("click", function () {
      abrirWhatsApp(
        "Olá! Vi o site da Dolce Delícias e quero fazer uma encomenda.",
      );
    });
  }

  // 5. Dúvidas - "Fale com a gente pelo WhatsApp →"
  var duvidasLink = document.querySelector(".duvidas-cta-link");
  if (duvidasLink) {
    duvidasLink.style.cursor = "pointer";
    duvidasLink.addEventListener("click", function () {
      abrirWhatsApp("Olá! Tenho uma dúvida.");
    });
  }
});
