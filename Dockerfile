FROM hseeberger/scala-sbt:11.0.9.1_1.4.4_2.12.12

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y npm

ADD . /sources
WORKDIR /sources
RUN sbt compile
CMD sbt run