package controllers

import akka.actor.{Actor, ActorRef}
import com.fasterxml.jackson.databind.JsonNode
import play.libs.Json
import util.Observer

class CheckersWebSocketActor(out: ActorRef, homeController: HomeController) extends Actor with Observer{
    homeController.controller.add(this)

    def receive = {
      case msgString: String =>{
        println(msgString)
        val msg: JsonNode = Json.parse(msgString)

        msg.get("action").asText() match {
          case m if m.startsWith("EVENT") =>
            homeController.outs.foreach(outBroadcast => {
              if (!out.equals(outBroadcast)){
                outBroadcast ! (msgString)
              }
            }
            )
          case _ => {
            println("COMMAND: "+msg.get("action").asText()  + " " + msg.get("data").asText())
          homeController.process.processInputLine(msg.get("action").asText() + " " + msg.get("data").asText(), homeController.controller)
        }
        }

      }
    }

    //remove observer on reload etc.
    override def postStop(): Unit = {
      super.postStop()
      homeController.controller.remove(this)
      homeController.outs = homeController.outs.filter(_ != out)
    }

    def sanitizeInput(msg: String): String ={
      msg.replace("/","")
        .replaceAll("\\?[A-z].*=", " ")
        .replace("%20", " ")
    }

    override def update(): Unit = {
      println(homeController.generateFullJSON(homeController.controller.getGameData(), homeController.process.returnMessage.value))
      out ! (homeController.generateFullJSON(homeController.controller.getGameData(), homeController.process.returnMessage.value))
      println("UPDATE: " + homeController.process.returnMessage.value)
    }
}
