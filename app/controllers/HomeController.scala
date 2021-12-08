package controllers

import akka.actor.{ActorRef, ActorSystem}
import akka.stream.Materializer
import aview.UI
import com.fasterxml.jackson.databind.JsonNode
import com.google.inject.{Guice, Injector}
import controller.ControllerInterface
import model.CheckersModule
import play.api.libs.json.{JsObject, JsValue, Json}
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import javax.inject._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends BaseController {

  val injector: Injector = Guice.createInjector(new CheckersModule)
  val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])

  val process: UI = () => {
  }

  def index(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    println(controller.matrixToString)
    println(controller.getGame.getField.getFieldMatrix)
    Ok(views.html.index(controller.getGame.getField.getFieldMatrix,""))
  }

  def move(jumps: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("move " + jumps, controller)
    Ok(generateFullJSON(controller.getGameData(), message))
  }

  def newGame(gamesize: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("new " + gamesize, controller)
    Ok(generateFullJSON(controller.getGameData(), message))
  }

  def undo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("undo", controller)
    Ok(generateFullJSON(controller.getGameData(), message))
  }

  def redo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("redo", controller)
    Ok(generateFullJSON(controller.getGameData(), message))
  }

  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("load", controller)
    Ok(generateFullJSON(controller.getGameData(), message))
  }

  def save(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("save", controller)
    Ok(generateFullJSON(controller.getGameData(), message))
  }

  def rules(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.rules())
  }

  def gameJson(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    println(controller.getGameData())
    Ok(controller.getGameData())
  }

  def generateFullJSON(json: String, message: String): String={
    val playJson = Json.parse(json)
    Json.prettyPrint(playJson.as[JsObject] + ("message" -> Json.toJson(message)))
  }

  var outs = Vector[ActorRef]()
  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      outs = outs:+out;
      CheckersWebSocketActorFactory.create(out, this)
    }
  }
}
