#!/usr/bin/env zsh

# Generates a localhost self signed certificate
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt

open localhost.crt
