---
waltz:
  title: Educational Game Design Document Template
meta:
  version: 0.0.2
  gdd authors:
    - Hansen Shi, Seth Prentice
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---

# Math Magician

## Elevator Pitch

Math Magician is a cute dungeon-crawler wherein the player will utilize an array of spells revolving around mathematics to defeat enemies in turn based battles. Player's gain new mathematical 'powers' after beating the boss of each level thereby increasing the complexity of the puzzles and enemies. Concepts includes basic addition, subtraction, multiplication, division, etc.

## Influences (Brief)

- Counting Kingdom:
  - Medium: Game
  - Explanation: Arithmetic puzzle-esque game, our game is a similar concept
- Darkest Dungeon:
  - Medium: Game
  - Explanation: This game uses a turn based combat system. Fights tend to have gimmicks or puzzle elements which is similar to our game as fights will be turn based and puzzle-esque. 
- Cat Quest:
  - Medium: Game
  - Explanation: This game is cute has heck and it has a similar aesthetic to what we want to emulate for our game. The 2.5d gameplay is also similar to what the non-combat portions of our game would be.
- Indivisible 
  - Medium: Game
  - Explanation: A recent title that blended 2-d platforming with party based, real time combat. For our game we envisioned something similar wherein the player can navigate a 2-d platformer world and then launch into an rpg style turn based gameplay style when encountering enemies.

## Core Gameplay Mechanics (Brief)

- Enter into a level
- Collect consumable "number shards"
- Navigate the level by running and jumping
- Run into enemies to engage in combat
- Combat is turn based
- Form spells by combining number shards
- Spells damage is based on the values and how they are combined (ex. addition vs. multiplication)
- Each level has a boss
- Defeating the boss completes the level and will give the player a new ability

# Learning Aspects

## Learning Domains

- Basic arithmetic 

## Target Audiences

- Younger demographics who may be struggling with arithmetic
- Younger demographics who want an entertaining way to practice their mathematical skills

## Target Contexts

- This game can act as one of the various options available to elementary/middleschool students during computer lab sessions
- This game could be used as an additional source of practice outside the classroom 

## Learning Objectives

- Apply the Big 4: After playing, students should be able to solve simple math problems revolving around the 4 arithmetic operators
- Determine Other Solutions: After playing, students should be able to evaluate a simple math problem and propose a variety of solutions given that more than one exists
- Mix and Match : After playing, students should be able to combine and utilize different operators to solve mathematical problems

## Prerequisite Knowledge

- Players should be able to recognize common mathematical operators (+, -, x, ÷, /)
- Players should have some amount of experience using these operators
- Players should ideally have some level of experience with 2-d platformers to be able to navigate the game world adeptly

## Assessment Measures

- One could have a pre-test and post-test where each student is given a time limit (let's say 15 minutes). We would then compare the overall completeness and correctness of the pre-tests against the post-tests.
- A variation on this method would present the students with a pre-test and post test and they would be timed to see how long it takes them to complete each. We would then compare the average time needed to complete each test and the average scores on each test.

# What sets this project apart?

- The dichotomy between the two gameplay styles (2-d platformer and turn-based rpg) creates an engaging experience and in regards to its educational aspects, presents a natural "break" timer inbetween the "learning" sections (combat)
- Mathematics is generally considered a difficult subject and often disliked by students. Presenting it in a more palatable form to a younger audience may help them develop their skills and interests in the subject early on leading to a smoother transition later when math becomes an integral part of their academics
- Creating a decent educational game centered around math is a difficult science, therefore we should dedicate more efforts towards finding various solutions to this conundrum
- It's gonna be cute as heck (hopefully)

# Player Interaction Patterns and Modes

## Player Interaction Pattern

The game is single player with keyboard and mouse controls. Navigation is done with the arrow keys and combat sections will be played with the mouse (clicking and dragging).

## Player Modes

- Start screen/menu: The player can navigate a menu, tweak options, and start the game
- SinglePlayer: The player progresses through various levels until they defeat the final boss and effectively win
- (fun idea) Grownup Mode: Similar to singleplayer mode but enemies are more difficult and tougher math concepts are convered. Meant to be rather challenging.

# Gameplay Objectives

- Get to the loot room:
    - Description: At the end of the of the dungeon there is a treasure you are searching for, maybe a powerful math artifact
    - Alignment: You learn math concepts along the way


# Procedures/Actions

- Players will be able to move left and right and jump
- Players will be able to change screens and progress by going through doors
- When the player collides with an enemy they will enter into combat mode wherein you combine number crystals to cast spells and do damage 
- When the player finds number shards you can pick them up to add to your set of spells.
- Defeating the boss of an area unlocks a door and gives the player access to a new operator or other game mechanic

# Rules

- The player has a limited amount of health, if health is reduced to zero then the player loses
- If a player loses, they will either respawn at a checkpoint or at the beginning of the level
- Health can be resotred by picking up potions which are scattered around the environment
- There are various enemies roaming around, when a player collides with an enemy they will be transitioned into a battle scene
- Enemies have limited health which is displayed above their head, they deal a set amount of damage also displayed above their head
- To defeat an enemy the player must combine their number shards with magical operators to make spells that deal damage. Once an enemies health reaches zero the battle ends.
- The player has a limited amount of number shards which are consumed when using spells
- Number shards drop from defeated enemies and chests. They can also be found in the environment
- If the player were to run out of number shards they would be reduced to only using number fragments (shards with a value of 1) so they aren't softlocked from progressing
- At the end of each area there will be a boss 
- Defeating the boss results in the player gaining a new power/operator
- The player can only progress to the next area after defeating the boss

# Objects/Entities

- Young nimble wizard 
- Number crystals
- Health potions
- Basic enemies, skeletons, slimes, ect.
- Doors
- Boss enemies, hydra, ogre, dragon, etc.

## Core Gameplay Mechanics (Detailed)

- The player can move horizontally and vertically through the world with the arrow keys or WASD keys. They must traverse the platforming sections of each level in search of a very obviously labled boss who guards the door to the next area
- There are various "loot" items scattered around the world which are collected when the player character touches them. These items include health potions and all degrees of number shards
- There are enemies roaming around the area. The player can avoid combatting by avoiding contact with them. However, upon contact with an enemy the player will be launched into battle wherein the player character will be on the left and the enemy on the right
- Combat is turn based with the player having the first action. Players can create and cast spells by combining number shards along with the operators they have access to. The spell will deal the sum of the equation as damage to the enemy (whose health total is displayed above their head)
- In combat, during the player's turn, they will be able to see the enemy's "intent" via a symbol. This shows the player what action the enemy will perform when they end their turn. Ex. a sword symbol would mean that the enemy is going to attack
- At 0 health you lose
- Collide with health potions to heal
- Use chests to generate a bunch of items

    
## Feedback

- When you get a monsters equation correct it flashes and dies
- When you pick up an item a sound plays
- When you beat the game a sound plays


*Describe what longer-term feedback you detect and give that guides the player in their learning and lets them know how they are doing in regards to the learning objectives.*

- Congradulation for beating game

# Story and Gameplay

## Presentation of Rules

*Briefly describe how the player will learn the gameplay mechanics. Avoid using walls of text, since people will not read them. Think instead of natural ways of teaching mechanics iteratively and slowly.*

- At the start of the dungeon the mechanics of the game will be laid out in short signs, having to complete the actions described to progress.



## Presentation of Content

*Briefly describe how the player will be taught the core material they are meant to learn. Avoid using walls of text, since people will not read them. Think instead of natural ways of teaching material iteratively and slowly.*

Learners will have to solve arithmetic equations repeatedly and will be rewarded for solving them correctly.

## Story (Brief)

You are a brave Math magician who is delving into the depths of the arithmetic dungeon to get rid of monsters and find treasure!

## Storyboarding

Ex 1. Tutorial 
-	The player is a special kid in a number world who was born with the power of 0
-	At a young age of 10, his dad had only taught him about addition and a basic spell: number + number
-	One day the father wants the player to go out and bring back a rabbit
-	He hands the player a ‘2’ shard and send them off
-	The player must find a rabbit and engage in combat by running into it
-	The player appears on the left, and the rabbit on the right
-	The rabbit has 2 health and displays the intent to ‘flee’ meaning that the player must end the fight this turn
-	To cast a spell the player must follow the spell his father taught him
-	So, the player must follow: Number + Operator + Number
-	The player selects the 2 his father gave him, the + symbol he was taught, and his innate 0 to give 2 + 0 and launches an attack at the rabbit, depleting its health to 0 and winning the fight

Ex 2. Tutorial Pt. 2
-	The player, rabbit in hand must make his way home
-	The player unluckily runs into a stray wolf who runs into the player initiating combat
-	The player manages to find a stray 3 crystal on the ground
-	The wolf has 5 health and shows the intent to attack for 3
-	The player gains the option to cast a defensive spell
-	The player then selects: 3, +, and the innate 0 to cast a shield that blocks for 3
-	The wolf’s attack is diverted but now the player has no number shards to attack with and the wolf is again displaying the intent to attack
-	The player’s father shows up in the nick of time and casts a big spell, 10 + 10
-	This destroys the wolf and he states to the player that he used too strong a spell and that as a result the wolf would drop no loot


# Assets Needed

## Aethestics

*Give a sense of the aesthetics of your game, the spirit and atmosphere. Use descriptive, evocative words that can help the reader understand the emotional response of your game.*

A dark dungeon but with soft looking enemies as to give the atmosphere of a dungeon without scaring cildren playing the game.

## Graphical

- Characters List
  - The Mathmagician
  - Skeleton
  - Goblin
  - Hydra
  - Ogre of Operations
- Textures:
  - Dungeon background
  - Doors
  - Math Crystals (1-15)
  - Health Potioins
  - Chests


## Audio


*Game region/phase/time are ways of designating a particularly important place in the game.*

- Music List (Ambient sound)
  - Overworld music *calm/mystical music*
  - Battle music *high energy fast music*
  - Boss music *intesne music*
  
*Game Interactions are things that trigger SFX, like character movement, hitting a spiky enemy, collecting a coin.*

- Sound List (SFX)
  - picking up a math crystal *plink*
  - picking up a bottle *glug*
  - hitting an enemy *TTSTSsSsSs*
  - getting hit *oof*


# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
