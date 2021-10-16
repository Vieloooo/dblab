/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2021/10/11 14:29:21                          */
/*==============================================================*/



#drop index if exists msg_url if exists on Msgs ;

drop database if exists Saltfish;
CREATE DATABASE Saltfish DEFAULT CHARACTER SET utf8;
use Saltfish;

#drop trigger if exists Del_after_user ;

#drop VIEW if exists Profits;

/*==============================================================*/
/* Table: Address                                               */
/*==============================================================*/

create table Address
(
   addr_zip             int not null,
   addr_full      text not null,
   primary key (addr_zip)
);

/*==============================================================*/
/* Table: Charts                                                */
/*==============================================================*/
create table Charts
(
   user_account         bigint not null,
   item_id              bigint not null,
   chart_date           timestamp not null,
   primary key (user_account, item_id)
);

/*==============================================================*/
/* Table: Comments                                              */
/*==============================================================*/
create table Comments
(
   comment_id           bigint not null,
   user_account         bigint not null,
   comment_content      text not null,
   comment_to           bigint,
   primary key (comment_id)
);

/*==============================================================*/
/* Table: Items                                                 */
/*==============================================================*/
create table Items
(
   item_id              bigint not null,
   item_name            text not null,
   type_id              bigint,
   user_account         bigint not null,
   item_info            text,
   item_price           int not null,
   store                int,
   primary key (item_id)
);

/*==============================================================*/
/* Table: Msgs                                                  */
/*==============================================================*/
create table Msgs
(
   msg_id               bigint not null,
   user_account         bigint not null,
   msg_content          text not null,
   send_to                   bigint not null,
   primary key (msg_id)
);

/*==============================================================*/
/* Index: msg_url                                               */
/*==============================================================*/
create unique index msg_url on Msgs
(
   send_to
);

/*==============================================================*/
/* Table: Shipping                                              */
/*==============================================================*/
create table Shipping
(
   provider_id          bigint not null,
   addr_zip             int not null,
   provider_name        char(20) not null,
   provider_detail_addr text,
   primary key (provider_id)
);

/*==============================================================*/
/* Table: Transactions                                          */
/*==============================================================*/
create table Transactions
(
   tx_id                bigint not null,
   item_id              bigint not null,
   user_account         bigint not null,
   provider_id          bigint,
   tx_stamp             timestamp not null,
   tx_gas               float(8,2) not null,
   tx_state             smallint,
   primary key (tx_id)
);

/*==============================================================*/
/* Table: Types                                                 */
/*==============================================================*/
create table Types
(
   type_id              bigint not null,
   type_name            char(20) not null,
   type_detail          text,
   primary key (type_id)
);

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table Users
(
   user_account         bigint not null,
   user_name            char(26) not null,
   addr_zip             int,
   user_detail_addr     text,
   passwd               char(26) not null,
   balance              float(12,2),
   primary key (user_account)
);

/*==============================================================*/
/* View: Profits                                                */
/*==============================================================*/
create VIEW  Profits
 as
select Transactions.user_account, sum(Items.item_price) as profit
from Transactions, Items 
where Transactions.item_id = Items.item_id 
group by (Transactions.user_account);

alter table Charts add constraint FK_Charts foreign key (user_account)
      references Users (user_account) on delete restrict on update restrict;

alter table Charts add constraint FK_Charts2 foreign key (item_id)
      references Items (item_id) on delete restrict on update restrict;

alter table Comments add constraint FK_send_comment foreign key (user_account)
      references Users (user_account) on delete restrict on update restrict;

alter table Items add constraint FK_type_item foreign key (type_id)
      references Types (type_id) on delete restrict on update restrict;

alter table Items add constraint FK_user_item foreign key (user_account)
      references Users (user_account) on delete restrict on update restrict;

alter table Msgs add constraint FK_send_msg foreign key (user_account)
      references Users (user_account) on delete restrict on update restrict;

alter table Shipping add constraint FK_shipping_provider_addr foreign key (addr_zip)
      references Address (addr_zip) on delete restrict on update restrict;

alter table Transactions add constraint FK_delivery foreign key (provider_id)
      references Shipping (provider_id) on delete restrict on update restrict;

alter table Transactions add constraint FK_tx_contains_item foreign key (item_id)
      references Items (item_id) on delete restrict on update restrict;

alter table Transactions add constraint FK_user_send_tx foreign key (user_account)
      references Users (user_account) on delete restrict on update restrict;

alter table Users add constraint FK_user_addr foreign key (addr_zip)
      references Address (addr_zip) on delete restrict on update restrict;


create trigger Del_before_user
after delete on Users
for each row 
    delete from Items
    where Items.user_account = old.user_account;
    

