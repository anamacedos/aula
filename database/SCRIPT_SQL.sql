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

alter table tbl_jogo
add id_classificacao_etaria int;

alter table tbl_jogo
add foreign key (id_classificacao_etaria) references tbl_classificacao_etaria(id);

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

create table tbl_empresa(
	id int not null primary key auto_increment,
    nome varchar(160) not null,
    email varchar(60) not null,
    cnpj varchar(25) not null,
    senha varchar(20) not null,
    telefone varchar(20) not null,
    bio varchar(500),
    ano_fundacao date,
    ceo varchar(60),
    logo varchar(100)
    
);

create table tbl_usuario(
	id int not null primary key auto_increment,
    nome varchar(160) not null,
    email varchar(60) not null,
    telefone varchar(20) not null,
    senha varchar(20) not null,
    data_nascimento date,
    bio varchar(500),
    foto_perfil varchar(100),
    id_sexo int not null,
    constraint fk_sexo foreign key (id_sexo) references tbl_sexo(id)
		
);

show tables;
desc tbl_jogo;

select * from tbl_plataforma order by id desc;