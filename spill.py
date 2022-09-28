from random import randrange

names = ["a", "b", "c", "d"]

from random import randrange

names = ["a", "b", "c", "d"]

class monster:
    def __init__(self, hp, dmg, hit_chance, name = names[randrange(5)]):
        self.name = name
        self.hp = hp
        self.dmg = dmg
        self.hit_chance = hit_chance
        
    def monsterAngrep(self, spiller):
        if (randrange(11) < self.hit_chance):
            spiller.hp -= self.dmg

m = monster(5, 1, 1)

class spiller:
    def __init__(self, hp, dmg, hit_chance):
        self.hp = hp
        self.dmg = dmg
        self.hit_chance = hit_chance

    def spillerAngrep(self, monster):
        if (randrange(11) < self.hit_chance):
            monster.hp -= self.dmg

s = spiller(3, 1, 5)

s.spillerAngrep(m)

print(m.hp)
