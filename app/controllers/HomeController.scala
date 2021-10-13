package controllers

import aview.{Tui, UI}
import com.google.inject.{Guice, Injector}
import controller.ControllerInterface
import model.CheckersModule
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
    Ok(views.html.index(controller.matrixToString))
  }

  def move(jumps: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("move " + jumps, controller)
    Ok(views.html.index(controller.matrixToString, message))
  }

  def newGame(gamesize: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("new " + gamesize, controller)
    Ok(views.html.index(controller.matrixToString, message))
  }

  def undo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("undo", controller)
    Ok(views.html.index(controller.matrixToString, message))
  }

  def redo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("redo", controller)
    Ok(views.html.index(controller.matrixToString, message))
  }

  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("load", controller)
    Ok(views.html.index(controller.matrixToString, message))
  }

  def save(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val message = process.processInputLine("save", controller)
    Ok(views.html.index(controller.matrixToString, message))
  }

}
