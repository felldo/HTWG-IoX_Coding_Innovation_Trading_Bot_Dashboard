package controllers

import aview.{Tui, UI}
import com.google.inject.{Guice, Injector}
import controller.ControllerInterface
import model.CheckersModule
import play.api.libs.json.{JsObject, Json}
import play.api.mvc._

import javax.inject._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

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
    Ok(views.html.index(controller.getGame.getField.getFieldMatrix, message))
  }

  def undo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("undo", controller)
    Ok(views.html.index(controller.getGame.getField.getFieldMatrix, message))
  }

  def redo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("redo", controller)
    Ok(views.html.index(controller.getGame.getField.getFieldMatrix, message))
  }

  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("load", controller)
    Ok(views.html.index(controller.getGame.getField.getFieldMatrix, message))
  }

  def save(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("save", controller)
    Ok(views.html.index(controller.getGame.getField.getFieldMatrix, message))
  }

  def rules(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.rules())
  }

  def gameJson(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(controller.getGameData())
  }

  def generateFullJSON(json: String, message: String): String={
    val playJson = Json.parse(json)
    Json.prettyPrint(playJson.as[JsObject] + ("message" -> Json.toJson(message)))
  }
}
