name := """Play-Server"""
organization := "de.htwg"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.12"

//libraryDependencies += guice
//libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "de.htwg.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "de.htwg.binders._"
libraryDependencies += guice

libraryDependencies += "org.scalatest" %% "scalatest" % "3.2.9" % "test"

libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test

//libraryDependencies += "com.h2database" % "h2" % "1.4.196"

//libraryDependencies += "com.fasterxml.jackson.module" %% "jackson-module-scala" % "2.12.5"
//libraryDependencies += "com.fasterxml.jackson.core" % "jackson-databind" % "2.12.5"
//dependencyOverrides += "com.fasterxml.jackson.core" % "jackson-core" % "2.12.5"
includeFilter in (Assets, LessKeys.less) := "rules.less" | "index.less" | "main.less"
javaOptions ++= Seq("", "-Djdk.lang.Process.allowAmbiguousCommands=true")