const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  const categories = [
    {
      id: 1,
      title: "Arcade",
      slug: "arcade",
      image: "arcade.jpg",
      core: "arcade",
    },
    {
      id: 2,
      title: "Atari",
      slug: "atari",
      image: "atari.jpg",
      core: "atari2600",
    },
    {
      id: 3,
      title: "MAME 2003",
      slug: "mame-2003",
      image: "mame.jpg",
      core: "mame2003",
    },
    {
      id: 4,
      title: "SNES",
      slug: "nes",
      image: "super-nintendo.jpg",
      core: "snes",
    },
    {
      id: 5,
      title: "Nintendo 64",
      slug: "nintendo-64",
      image: "n64.jpg",
      core: "n64",
    },
    {
      id: 6,
      title: "PlayStation",
      slug: "playstation",
      image: "playstation.jpg",
      core: "psx",
    },
    {
      id: 7,
      title: "Sega Mega Drive",
      slug: "sega-mega-drive",
      image: "sega.jpg",
      core: "segaMD",
    },
  ];

  const games = [
    {
      id: 1,
      title: "Cadillacs and Dinosaurs",
      slug: "cadillacs-and-dinosaurs",
      image: "cadillacs-and-dinosaurs.jpg",
      description: "This is the game description.",
      game_url: "dino.zip",
      published: true,
      categories: [1],
    },
    {
      id: 2,
      title: "Asterix and the Great Rescue",
      slug: "asterix-and-the-great-rescue",
      image: "asterix-and-the-great-rescue.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [1],
    },
    {
      id: 3,
      title: "Disney's Hercules",
      slug: "disney-s-hercules",
      image: "disney-s-hercules.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [1],
    },
    {
      id: 4,
      title: "Biaofeng Zhanjing",
      slug: "biaofeng-zhanjing",
      image: "biaofeng-zhanjing.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [1],
    },
    {
      id: 5,
      title: "Street Fighter II",
      slug: "street-fighter-ii",
      image: "street-fighter-ii.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [1],
    },
    {
      id: 6,
      title: "Captain Commando",
      slug: "captain-commando",
      image: "captain-commando.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [1],
    },
    {
      id: 7,
      title: "Super Mario 64",
      slug: "super-mario-64",
      image: "super-mario-64.jpg",
      description: "This is the game description.",
      game_url: "mario.zip",
      published: true,
      categories: [5],
    },
    {
      id: 8,
      title: "Automobili Lamborghini",
      slug: "automobili-lamborghini",
      image: "automobili-lamborghini.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [5],
    },
    {
      id: 9,
      title: "Centre Court Tennis",
      slug: "centre-court-tennis",
      image: "centre-court-tennis.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [5],
    },
    {
      id: 10,
      title: "Rayman 2 - The Great Escape",
      slug: "rayman-2-the-great-escape",
      image: "rayman-2-the-great-escape.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [5],
    },
    {
      id: 11,
      title: "X-Men - Children Of The Atom",
      slug: "x-men-children-of-the-atom",
      image: "rayman-2-the-great-escape.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [1],
    },
    {
      id: 12,
      title: "Teenage Mutant Hero Turtles",
      slug: "teenage-mutant-hero-turtles",
      image: "teenage-mutant-hero-turtles.jpg",
      description: "This is the game description.",
      game_url: "your-game-here.zip",
      published: true,
      categories: [1],
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        id: category.id,
      },
      update: {
        title: category.title,
        image: category.image,
        core: category.core,
        slug: category.slug,
      },
      create: {
        id: category.id,
        title: category.title,
        image: category.image,
        core: category.core,
        slug: category.slug,
      },
    });
  }

  for (const game of games) {
    await prisma.game.upsert({
      where: {
        id: game.id,
      },
      update: {
        title: game.title,
        slug: game.slug,
        image: game.image,
        description: game.description,
        game_url: game.game_url,
        published: game.published,
        categories: {
          set: game.categories.map((categoryId) => ({ id: categoryId })),
        },
      },
      create: {
        id: game.id,
        title: game.title,
        slug: game.slug,
        image: game.image,
        description: game.description,
        game_url: game.game_url,
        published: game.published,
        categories: {
          connect: game.categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });
  }


  const password = await bcrypt.hash("password", 12);
  const email = "admin@admin.com"

  const user = await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      name: "Admin",
      email: email,
      password: password,
      role: "admin"
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })