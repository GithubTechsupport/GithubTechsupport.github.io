from math import pi, sin, cos

from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from direct.actor.Actor import Actor
from direct.interval.IntervalGlobal import Sequence
from panda3d.core import *
from panda3d.physics import LinearVectorForce

class MyApp(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        base.enableParticles()
        self.taskMgr.add(self.spinBoxTask, "SpinBoxTask")
        self.taskMgr.add(self.spinBoxTaskXY, "SpinBoxTaskXY")

        self.camera.setPos(0, 0, 0)
        self.camera.setHpr(0, 0, 0)

        self.coreModel = loader.loadModel("models/ball")
        self.pivotNodeX = render.attachNewNode('rootX')
        self.pivotNodeY = render.attachNewNode('rootY')
        self.pivotNodeXY = render.attachNewNode('rootXY')
        self.pivotNodeYX = render.attachNewNode('rootYX')
        self.coreModel.reparentTo(self.pivotNodeX)
        self.coreModel.setPos(0, 0, 0)
        self.coreModel.setScale(1.5)
        self.pivotNodeX.setPos(0,10,0)
        self.pivotNodeY.setPos(0,10,0)
        self.pivotNodeXY.setPos(0,10,0)
        self.pivotNodeYX.setPos(0,10,0)

        self.eModel = loader.loadModel("models/ball")
        self.eModel2 = loader.loadModel("models/ball")
        self.eModel3 = loader.loadModel("models/ball")
        self.eModel4 = loader.loadModel("models/ball")
        self.eModel5 = loader.loadModel("models/ball")
        self.eModel6 = loader.loadModel("models/ball")
        self.eModel.reparentTo(self.pivotNodeX)
        self.eModel2.reparentTo(self.pivotNodeX)
        self.eModel3.reparentTo(self.pivotNodeY)
        self.eModel4.reparentTo(self.pivotNodeY)
        self.eModel5.reparentTo(self.pivotNodeXY)
        self.eModel6.reparentTo(self.pivotNodeYX)
        self.eModel.setPos(1.75,0,0)
        self.eModel2.setPos(-1.75,0,0)
        self.eModel3.setPos(0,0,1.75)
        self.eModel4.setPos(0,0,-1.75)
        self.eModel5.setPos(-1.75,0,0)
        self.eModel6.setPos(1.5,0,1.75)
        self.eModel.setColor(1,0,0,1)
        self.eModel2.setColor(1,0,0,1)
        self.eModel3.setColor(1,0,0,1)
        self.eModel4.setColor(1,0,0,1)

    def spinBoxTask(self, task):
        angleDegrees = task.time * 120.0
        angleRadians = angleDegrees * (pi / 180.0)
        self.pivotNodeX.setHpr(angleDegrees + 10, 0, 0)
        self.pivotNodeY.setHpr(0, angleDegrees, 0)
        return Task.cont

    def spinBoxTaskXY(self, task):
        angleDegrees = task.time * 120.0
        angleRadians = angleDegrees * (pi / 180.0)
        self.pivotNodeXY.setHpr(0, 0, 45)
        return Task.cont

    def spinCameraTask(self, task):
        angleDegrees = task.time * 6.0
        angleRadians = angleDegrees * (pi / 180.0)
        self.camera.setPos(20 * sin(angleRadians), -20 * cos(angleRadians), 3)
        self.camera.setHpr(angleDegrees, 0, 0)
        return Task.cont

app = MyApp()
app.run()