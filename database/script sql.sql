create database db_controle_jogos_bb;
use db_controle_jogos_bb;
create table tbl_jogo(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    versao varchar(10) not null,
    tamanho varchar(10),
    descricao text,
    foto_capa varchar(200),
    link varchar(200)
);

create table tbl_sexo(
	id int not null primary key auto_increment,
	sexo varchar(15) not null
);

create table tbl_plataforma(
	id int not null primary key auto_increment,
    plataforma varchar(45)
);

create table tbl_idioma(
	id int not null primary key auto_increment,
    idioma varchar(45) not null
);

create table tbl_classificacao_etaria(
	id int not null primary key auto_increment,
    classificacao_etaria varchar(5)
);

create table tbl_categoria(
	id int not null primary key auto_increment,
    categoria varchar(45)
);

show tables;

desc tbl_jogo;