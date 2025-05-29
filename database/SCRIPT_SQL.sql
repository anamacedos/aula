create database db_controle_jogos_bb;
show databases;
use db_controle_jogos_bb;



drop table tbl_jogo;

create table tbl_jogo(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    versao varchar(10) not null,
    tamanho varchar(10),
    descricao text,
    foto_capa varchar(200),
    link varchar(200),
    id_classificacao_etaria int not null,
    constraint id_classificacao_etaria foreign key (id_classificacao_etaria) references tbl_classificacao_etaria(id)
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
    constraint fk_sexo foreign key (id_sexo) references tbl_sexo(id),
    id_idioma int not null,
    constraint fk_idioma foreign key(id_idioma) references tbl_idioma(id)
		
);


create table tbl_jogo_empresa(
	id int not null primary key auto_increment,
    id_jogo int not null,
    constraint fk_jogo foreign key(id_jogo) references tbl_jogo(id),
    id_empresa int not null,
    constraint fk_empresa foreign key(id_empresa) references tbl_empresa(id)
);

create table tbl_jogo_categoria(
	id int not null primary key auto_increment,
    id_jogo int not null,
    constraint fk_jogo_categoria foreign key(id_jogo) references tbl_jogo(id),
    id_categoria int not null,
    constraint fk_categoria foreign key(id_categoria) references tbl_categoria(id)
);

create table tbl_jogo_plataforma(
	id int not null primary key auto_increment,
    id_jogo int not null,
    constraint fk_jogo_plataforma foreign key(id_jogo) references tbl_jogo(id),
    id_plataforma int not null,
    constraint fk_plataforma foreign key(id_plataforma) references tbl_plataforma(id)
);

create table tbl_jogo_idioma(
	id int not null primary key auto_increment,
    id_jogo int not null,
    constraint fk_jogo_idioma foreign key(id_jogo) references tbl_jogo(id),
    id_idioma int not null,
    constraint fk_idioma_jogo foreign key(id_idioma) references tbl_idioma(id)
);

create table tbl_biblioteca(
	id int not null primary key auto_increment,
    id_jogo int not null,
    constraint fk_jogo_biblioteca foreign key(id_jogo) references tbl_jogo(id),
    id_usuario int not null,
    constraint fk_usuario_biblioteca foreign key(id_usuario) references tbl_usuario(id),
    data_compra timestamp default current_timestamp
);

show tables;
desc tbl_jogo;

select * from tbl_plataforma order by id desc;


