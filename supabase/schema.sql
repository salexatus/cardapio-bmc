-- ============================================================
--  Balneário Monte Castelo — Schema do Supabase
--  Cole TUDO no SQL Editor do seu projeto Supabase e clique em "Run".
--  Cria tabelas, segurança (RLS), bucket de imagens e dados iniciais.
-- ============================================================

-- ----------- TABELAS -----------

create table if not exists public.categories (
  id    text primary key,
  label text not null,
  icon  text default '',
  sort  int  default 0
);

create table if not exists public.menu_items (
  id          uuid primary key default gen_random_uuid(),
  category    text not null references public.categories(id) on update cascade,
  name        text not null,
  description text default '',
  price       numeric(10,2) not null default 0,
  serves      text default '',
  image       text default '',
  badge       text default '',
  best_seller boolean default false,
  tags        text[] default '{}',
  available   boolean default true,
  sort        int default 0,
  created_at  timestamptz default now()
);

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  day         text default '',
  month       text default '',
  weekday     text default '',
  time        text default '',
  artist      text default '',
  description text default '',
  image       text default '',
  tag         text default '',
  sort        int default 0,
  created_at  timestamptz default now()
);

create table if not exists public.gallery (
  id         uuid primary key default gen_random_uuid(),
  src        text not null,
  alt        text default '',
  span       text default '',
  sort       int default 0,
  created_at timestamptz default now()
);

create table if not exists public.site_config (
  id               int primary key default 1,
  name             text,
  tagline          text,
  description      text,
  whatsapp         text,
  whatsapp_message text,
  instagram        text,
  instagram_handle text,
  address          text,
  maps_query       text,
  maps_embed       text,
  url              text,
  hours            text,
  constraint single_row check (id = 1)
);

-- ----------- SEGURANÇA (RLS) -----------
-- Leitura pública (site); escrita só para usuários autenticados (admin).

alter table public.categories  enable row level security;
alter table public.menu_items  enable row level security;
alter table public.events      enable row level security;
alter table public.gallery     enable row level security;
alter table public.site_config enable row level security;

do $$
declare t text;
begin
  foreach t in array array['categories','menu_items','events','gallery','site_config'] loop
    execute format('drop policy if exists "public read %1$s" on public.%1$s;', t);
    execute format('drop policy if exists "auth write %1$s" on public.%1$s;', t);
    execute format('create policy "public read %1$s" on public.%1$s for select using (true);', t);
    execute format('create policy "auth write %1$s" on public.%1$s for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ----------- STORAGE (imagens) -----------

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
drop policy if exists "auth upload images" on storage.objects;
drop policy if exists "auth update images" on storage.objects;
drop policy if exists "auth delete images" on storage.objects;

create policy "public read images" on storage.objects
  for select using (bucket_id = 'images');
create policy "auth upload images" on storage.objects
  for insert to authenticated with check (bucket_id = 'images');
create policy "auth update images" on storage.objects
  for update to authenticated using (bucket_id = 'images');
create policy "auth delete images" on storage.objects
  for delete to authenticated using (bucket_id = 'images');

-- ============================================================
--  DADOS INICIAIS (semente) — rode apenas uma vez
-- ============================================================

insert into public.categories (id, label, icon, sort) values
  ('refeicoes',   'Refeições',     '🍛', 1),
  ('hamburgueres','Hambúrgueres',  '🍔', 2),
  ('porcoes',     'Porções',       '🍟', 3),
  ('bebidas',     'Bebidas',       '🥤', 4),
  ('drinks',      'Drinks',        '🍹', 5)
on conflict (id) do nothing;

insert into public.site_config (id, name, tagline, description, whatsapp, whatsapp_message,
  instagram, instagram_handle, address, maps_query, maps_embed, url, hours)
values (1,
  'Balneário Monte Castelo',
  'Às margens do Rio Urupá',
  'Comida no fogão a lenha, música ao vivo e o som das águas do Rio Urupá. Um refúgio para a família, com sabor de Rondônia.',
  '5569999999999',
  'Olá! Vim pelo cardápio digital do Balneário Monte Castelo e gostaria de fazer um pedido. 🌿',
  'https://instagram.com/balneariomontecastelo',
  '@balneariomontecastelo',
  'Rio Urupá, Ji-Paraná — Rondônia',
  'Rio Urupá, Ji-Paraná - RO',
  'https://www.google.com/maps?q=Rio%20Urup%C3%A1%20Ji-Paran%C3%A1%20RO&output=embed',
  'https://balneariomontecastelo.com.br',
  'Terça a Domingo • 09h às 23h')
on conflict (id) do nothing;

-- Refeições
insert into public.menu_items (category, name, description, price, serves, image, badge, best_seller, tags, sort) values
('refeicoes','Peixe na Telha do Urupá','Filé de tambaqui assado no fogão a lenha, servido na telha com purê de banana, arroz, farofa crocante e vinagrete da casa.',89.90,'Serve 2 pessoas','https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=70','Chef',true,'{"fogão a lenha","peixe","regional"}',1),
('refeicoes','Costela Fogo de Chão','Costela bovina assada lentamente por 8 horas na lenha, desmanchando ao toque. Acompanha mandioca dourada e farofa de bacon.',99.90,'Serve 2 a 3 pessoas','https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=70','Destaque',true,'{"fogão a lenha","carne"}',2),
('refeicoes','Galinha Caipira na Panela','Galinha caipira cozida no tacho de ferro com açafrão da terra, servida com arroz, quiabo e pirão cremoso.',74.90,'Serve 2 pessoas','https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=70','',false,'{"caseiro","regional"}',3),
('refeicoes','Tilápia Frita Completa','Tilápia inteira frita na hora, crocante por fora e macia por dentro. Acompanha arroz, batata frita e molho tártaro.',69.90,'Serve 2 pessoas','https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=800&q=70','',false,'{"peixe","frito"}',4),
('refeicoes','Picanha na Brasa','Picanha selada na brasa no ponto que você preferir, com arroz, vinagrete, farofa e fritas. Sabor de churrasco à beira-rio.',109.90,'Serve 2 a 3 pessoas','https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=70','Premium',false,'{"carne","brasa"}',5);

-- Hambúrgueres
insert into public.menu_items (category, name, description, price, serves, image, badge, best_seller, tags, sort) values
('hamburgueres','Monte Castelo Burger','Blend artesanal 180g, cheddar maturado, bacon na lenha, cebola caramelizada e molho da casa no pão brioche.',38.90,'','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=70','Mais Pedido',true,'{"artesanal","bacon"}',6),
('hamburgueres','Smash do Rio','Dois smash burgers suculentos, queijo prato derretido, picles e maionese defumada. Crocância e sabor em cada mordida.',34.90,'','https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=70','',false,'{"smash","duplo"}',7),
('hamburgueres','Burger Caipira','Hambúrguer de costela, queijo coalho grelhado, ovo caipira, alface e tomate. Uma homenagem ao interior.',36.90,'','https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=70','',false,'{"costela","ovo"}',8),
('hamburgueres','Veggie do Balneário','Burger de grão-de-bico e legumes, queijo, rúcula, tomate seco e maionese de ervas no pão australiano.',32.90,'','https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=70','Veg',false,'{"vegetariano"}',9);

-- Porções
insert into public.menu_items (category, name, description, price, serves, image, badge, best_seller, tags, sort) values
('porcoes','Isca de Tilápia','Iscas de tilápia empanadas e fritas na hora, douradinhas, com molho tártaro e limão. Perfeita para compartilhar.',54.90,'Serve 3 a 4 pessoas','https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=70','Destaque',true,'{"peixe","compartilhar"}',10),
('porcoes','Mandioca com Costelinha','Mandioca cozida e frita até dourar, servida com costelinha suína na lenha e geleia de pimenta artesanal.',49.90,'Serve 3 a 4 pessoas','https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=70','',false,'{"fogão a lenha","porco"}',11),
('porcoes','Frango a Passarinho','Frango temperado com alho dourado e cheiro-verde, frito crocante. Aquele petisco clássico de beira de rio.',44.90,'Serve 3 pessoas','https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=70','',false,'{"frango","frito"}',12),
('porcoes','Batata Rústica Trufada','Batatas rústicas com alecrim, parmesão e um toque de azeite trufado. Crocância irresistível.',36.90,'Serve 2 a 3 pessoas','https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=70','',false,'{"vegetariano"}',13),
('porcoes','Tábua de Frios da Casa','Seleção de queijos, embutidos artesanais, azeitonas, geleia e torradas. Ótima para acompanhar os drinks.',64.90,'Serve 4 pessoas','https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=70','Premium',false,'{"compartilhar","queijos"}',14);

-- Bebidas
insert into public.menu_items (category, name, description, price, serves, image, badge, best_seller, tags, sort) values
('bebidas','Suco Natural da Fruta','Sucos naturais feitos na hora: maracujá, abacaxi com hortelã, acerola ou laranja. Pergunte os do dia.',12.90,'','https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=70','',false,'{"natural","sem álcool"}',15),
('bebidas','Água de Coco Gelada','Água de coco natural, servida bem gelada. A bebida perfeita para os dias de sol à beira do rio.',9.90,'','https://images.unsplash.com/photo-1536759808958-93c95f4a76a9?auto=format&fit=crop&w=800&q=70','',false,'{"natural","sem álcool"}',16),
('bebidas','Cerveja Long Neck','Cervejas geladas em garrafa long neck. Pilsen, puro malte e opções sem glúten. Estupidamente gelada.',11.90,'','https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=70','',false,'{"cerveja"}',17),
('bebidas','Refrigerante Lata','Linha completa de refrigerantes em lata, sempre gelados. Versões zero açúcar disponíveis.',7.90,'','https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=70','',false,'{"sem álcool"}',18);

-- Drinks
insert into public.menu_items (category, name, description, price, serves, image, badge, best_seller, tags, sort) values
('drinks','Caipirinha do Urupá','Cachaça artesanal, limão-taiti e açúcar mascavo, com um toque de capim-santo. O clássico repaginado.',24.90,'','https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=70','Assinatura',true,'{"coquetel","cachaça"}',19),
('drinks','Pôr do Sol Tropical','Rum, maracujá, laranja e xarope de mel, em camadas que lembram o entardecer no rio. Drink autoral.',29.90,'','https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=70','Autoral',false,'{"coquetel","tropical"}',20),
('drinks','Gin Tônica de Frutas','Gin premium, água tônica, frutas vermelhas e ervas frescas. Refrescante e aromático.',32.90,'','https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=70','',false,'{"coquetel","gin"}',21),
('drinks','Mojito da Casa','Rum branco, hortelã do quintal, limão e soda. Borbulhante, leve e perfeito para o calor.',27.90,'','https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=70','',false,'{"coquetel","refrescante"}',22);

-- Eventos
insert into public.events (title, day, month, weekday, time, artist, description, image, tag, sort) values
('Sexta do Sertanejo Raiz','20','JUN','Sexta-feira','20h','Duo Viola & Sanfona','Música ao vivo na beira do rio com o melhor do sertanejo raiz, fogueira e clima de viola.','https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=70','Música ao vivo',1),
('Feijoada à Beira-Rio','22','JUN','Domingo','12h','Samba de Roda','Feijoada completa servida no capricho, acompanhada de roda de samba e caipirinha gelada.','https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=70','Gastronomia',2),
('Luau Monte Castelo','28','JUN','Sábado','19h','Banda Maré Cheia','Pôr do sol, voz e violão, drinks autorais e os pés na areia. Uma noite inesquecível à beira do Urupá.','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=70','Especial',3);

-- Galeria
insert into public.gallery (src, alt, span, sort) values
('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=70','Ambiente do restaurante','row-span-2',1),
('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=70','Mesa servida','',2),
('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=700&q=70','Comida na brasa','',3),
('https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=700&q=70','Café e doces','col-span-2',4),
('https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=700&q=70','Rio ao entardecer','row-span-2',5),
('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=70','Almoço em família','',6),
('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=700&q=70','Drinks coloridos','',7),
('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=70','Chopp gelado','col-span-2',8);

-- ============================================================
--  Pronto! Agora crie seu usuário admin:
--  Authentication → Users → Add user (e-mail + senha) e marque "Auto Confirm".
-- ============================================================
