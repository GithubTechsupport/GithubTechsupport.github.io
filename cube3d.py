from math import pi, sin, cos

from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from direct.actor.Actor import Actor
from direct.interval.IntervalGlobal import Sequence
from panda3d.core import Point3

class MyApp(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        base.enableParticles()
        self.taskMgr.add(self.spinBoxTask, "SpinBoxTask")

        self.camera.setPos(0, 0, 0)
        self.camera.setHpr(0, 0, 0)

        self.boxModel = loader.loadModel("models/box")
        self.pivotNode = render.attachNewNode('root')
        self.boxModel.reparentTo(self.pivotNode)
        self.boxModel.setPos(-.5, -.5, -.5)
        self.pivotNode.setPos(0,10,0)
        self.pivotNode.setH(30.0)

    def spinBoxTask(self, task):
        angleDegrees = task.time * 100.0
        angleRadians = angleDegrees * (pi / 180.0)
        self.pivotNode.setHpr(angleDegrees, angleDegrees, angleDegrees)
        return Task.cont

    def spinCameraTask(self, task):
        angleDegrees = task.time * 6.0
        angleRadians = angleDegrees * (pi / 180.0)
        self.camera.setPos(20 * sin(angleRadians), -20 * cos(angleRadians), 3)
        self.camera.setHpr(angleDegrees, 0, 0)
        return Task.cont

app = MyApp()
app.run()