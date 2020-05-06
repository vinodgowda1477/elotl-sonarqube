FROM ubuntu:18.04
USER root
RUN apt-get update -y && \
apt-get install -y vim && \
apt-get install -y python3 && \
apt-get install -y python3-pip && \
apt-get -y install nodejs && \
apt-get install -y npm


ARG MOCK_CLUSTERS
ARG NAMESPACE_IS_HIDDEN

ENV MOCK_CLUSTERS=${MOCK_CLUSTERS}
ENV NAMESPACE_IS_HIDDEN=${NAMESPACE_IS_HIDDEN}


ADD api/ /app/api

ADD elotl-dashboard-UI /app/elotl-dashboard-UI

WORKDIR /app/elotl-dashboard-UI

RUN npm install -g npm

RUN npm install

RUN npm run build

WORKDIR /app/api

RUN pip3 install -r ./requirements.txt

ENTRYPOINT [ "./gunicorn.sh" ]