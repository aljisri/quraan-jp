# Dockerfile

# PHP 8.2とApacheサーバーがプリインストールされた公式イメージをベースにします
FROM php:8.2-apache

# MySQLデータベースに接続するためのPHP拡張機能をインストールします
RUN docker-php-ext-install pdo_mysql mysqli

# ApacheのURL書き換えモジュールを有効にします（きれいなURLを使う場合）
RUN a2enmod rewrite
