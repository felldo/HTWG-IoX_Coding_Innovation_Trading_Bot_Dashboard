package controllers

import akka.actor.{ActorRef, Props}

object CheckersWebSocketActorFactory {
  def create(out: ActorRef, homeController: HomeController) = {
    Props(new CheckersWebSocketActor(out, homeController))
  }
}
