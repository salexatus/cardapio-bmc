"""Popula o banco com os dados iniciais do cardápio.

Idempotente: usa get_or_create por nome/título, então rodar de novo não
duplica. Mesmos dados que estavam no supabase/schema.sql (placeholders de
imagem do Unsplash — substituir pelas fotos reais do cliente depois).
"""
from decimal import Decimal

from django.core.management.base import BaseCommand

from apps.cardapio.models import Category, Event, GalleryImage, MenuItem, SiteConfig

CATEGORIES = [
    ("refeicoes", "Refeições", "🍛", 1),
    ("hamburgueres", "Hambúrgueres", "🍔", 2),
    ("porcoes", "Porções", "🍟", 3),
    ("bebidas", "Bebidas", "🥤", 4),
    ("drinks", "Drinks", "🍹", 5),
]

SITE_CONFIG = dict(
    name="Balneário Monte Castelo",
    tagline="Às margens do Rio Urupá",
    description=(
        "Comida no fogão a lenha, música ao vivo e o som das águas do Rio Urupá. "
        "Um refúgio para a família, com sabor de Rondônia."
    ),
    whatsapp="5569999999999",
    whatsapp_message=(
        "Olá! Vim pelo cardápio digital do Balneário Monte Castelo e gostaria "
        "de fazer um pedido. 🌿"
    ),
    instagram="https://instagram.com/balneariomontecastelo",
    instagram_handle="@balneariomontecastelo",
    address="Rio Urupá, Ji-Paraná — Rondônia",
    maps_query="Rio Urupá, Ji-Paraná - RO",
    maps_embed=(
        "https://www.google.com/maps?q=Rio%20Urup%C3%A1%20Ji-Paran%C3%A1%20RO&output=embed"
    ),
    url="https://balneariomontecastelo.com.br",
    hours="Terça a Domingo • 09h às 23h",
)

U = "https://images.unsplash.com/"

# (category, name, description, price, serves, image, badge, best_seller, tags, sort)
MENU = [
    ("refeicoes", "Peixe na Telha do Urupá", "Filé de tambaqui assado no fogão a lenha, servido na telha com purê de banana, arroz, farofa crocante e vinagrete da casa.", "89.90", "Serve 2 pessoas", U + "photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=70", "Chef", True, ["fogão a lenha", "peixe", "regional"], 1),
    ("refeicoes", "Costela Fogo de Chão", "Costela bovina assada lentamente por 8 horas na lenha, desmanchando ao toque. Acompanha mandioca dourada e farofa de bacon.", "99.90", "Serve 2 a 3 pessoas", U + "photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=70", "Destaque", True, ["fogão a lenha", "carne"], 2),
    ("refeicoes", "Galinha Caipira na Panela", "Galinha caipira cozida no tacho de ferro com açafrão da terra, servida com arroz, quiabo e pirão cremoso.", "74.90", "Serve 2 pessoas", U + "photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=70", "", False, ["caseiro", "regional"], 3),
    ("refeicoes", "Tilápia Frita Completa", "Tilápia inteira frita na hora, crocante por fora e macia por dentro. Acompanha arroz, batata frita e molho tártaro.", "69.90", "Serve 2 pessoas", U + "photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=800&q=70", "", False, ["peixe", "frito"], 4),
    ("refeicoes", "Picanha na Brasa", "Picanha selada na brasa no ponto que você preferir, com arroz, vinagrete, farofa e fritas. Sabor de churrasco à beira-rio.", "109.90", "Serve 2 a 3 pessoas", U + "photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=70", "Premium", False, ["carne", "brasa"], 5),
    ("hamburgueres", "Monte Castelo Burger", "Blend artesanal 180g, cheddar maturado, bacon na lenha, cebola caramelizada e molho da casa no pão brioche.", "38.90", "", U + "photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=70", "Mais Pedido", True, ["artesanal", "bacon"], 6),
    ("hamburgueres", "Smash do Rio", "Dois smash burgers suculentos, queijo prato derretido, picles e maionese defumada. Crocância e sabor em cada mordida.", "34.90", "", U + "photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=70", "", False, ["smash", "duplo"], 7),
    ("hamburgueres", "Burger Caipira", "Hambúrguer de costela, queijo coalho grelhado, ovo caipira, alface e tomate. Uma homenagem ao interior.", "36.90", "", U + "photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=70", "", False, ["costela", "ovo"], 8),
    ("hamburgueres", "Veggie do Balneário", "Burger de grão-de-bico e legumes, queijo, rúcula, tomate seco e maionese de ervas no pão australiano.", "32.90", "", U + "photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=70", "Veg", False, ["vegetariano"], 9),
    ("porcoes", "Isca de Tilápia", "Iscas de tilápia empanadas e fritas na hora, douradinhas, com molho tártaro e limão. Perfeita para compartilhar.", "54.90", "Serve 3 a 4 pessoas", U + "photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=70", "Destaque", True, ["peixe", "compartilhar"], 10),
    ("porcoes", "Mandioca com Costelinha", "Mandioca cozida e frita até dourar, servida com costelinha suína na lenha e geleia de pimenta artesanal.", "49.90", "Serve 3 a 4 pessoas", U + "photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=70", "", False, ["fogão a lenha", "porco"], 11),
    ("porcoes", "Frango a Passarinho", "Frango temperado com alho dourado e cheiro-verde, frito crocante. Aquele petisco clássico de beira de rio.", "44.90", "Serve 3 pessoas", U + "photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=70", "", False, ["frango", "frito"], 12),
    ("porcoes", "Batata Rústica Trufada", "Batatas rústicas com alecrim, parmesão e um toque de azeite trufado. Crocância irresistível.", "36.90", "Serve 2 a 3 pessoas", U + "photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=70", "", False, ["vegetariano"], 13),
    ("porcoes", "Tábua de Frios da Casa", "Seleção de queijos, embutidos artesanais, azeitonas, geleia e torradas. Ótima para acompanhar os drinks.", "64.90", "Serve 4 pessoas", U + "photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=70", "Premium", False, ["compartilhar", "queijos"], 14),
    ("bebidas", "Suco Natural da Fruta", "Sucos naturais feitos na hora: maracujá, abacaxi com hortelã, acerola ou laranja. Pergunte os do dia.", "12.90", "", U + "photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=70", "", False, ["natural", "sem álcool"], 15),
    ("bebidas", "Água de Coco Gelada", "Água de coco natural, servida bem gelada. A bebida perfeita para os dias de sol à beira do rio.", "9.90", "", U + "photo-1536759808958-93c95f4a76a9?auto=format&fit=crop&w=800&q=70", "", False, ["natural", "sem álcool"], 16),
    ("bebidas", "Cerveja Long Neck", "Cervejas geladas em garrafa long neck. Pilsen, puro malte e opções sem glúten. Estupidamente gelada.", "11.90", "", U + "photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=70", "", False, ["cerveja"], 17),
    ("bebidas", "Refrigerante Lata", "Linha completa de refrigerantes em lata, sempre gelados. Versões zero açúcar disponíveis.", "7.90", "", U + "photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=70", "", False, ["sem álcool"], 18),
    ("drinks", "Caipirinha do Urupá", "Cachaça artesanal, limão-taiti e açúcar mascavo, com um toque de capim-santo. O clássico repaginado.", "24.90", "", U + "photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=70", "Assinatura", True, ["coquetel", "cachaça"], 19),
    ("drinks", "Pôr do Sol Tropical", "Rum, maracujá, laranja e xarope de mel, em camadas que lembram o entardecer no rio. Drink autoral.", "29.90", "", U + "photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=70", "Autoral", False, ["coquetel", "tropical"], 20),
    ("drinks", "Gin Tônica de Frutas", "Gin premium, água tônica, frutas vermelhas e ervas frescas. Refrescante e aromático.", "32.90", "", U + "photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=70", "", False, ["coquetel", "gin"], 21),
    ("drinks", "Mojito da Casa", "Rum branco, hortelã do quintal, limão e soda. Borbulhante, leve e perfeito para o calor.", "27.90", "", U + "photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=70", "", False, ["coquetel", "refrescante"], 22),
]

# (title, day, month, weekday, time, artist, description, image, tag, sort)
EVENTS = [
    ("Sexta do Sertanejo Raiz", "20", "JUN", "Sexta-feira", "20h", "Duo Viola & Sanfona", "Música ao vivo na beira do rio com o melhor do sertanejo raiz, fogueira e clima de viola.", U + "photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=70", "Música ao vivo", 1),
    ("Feijoada à Beira-Rio", "22", "JUN", "Domingo", "12h", "Samba de Roda", "Feijoada completa servida no capricho, acompanhada de roda de samba e caipirinha gelada.", U + "photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=70", "Gastronomia", 2),
    ("Luau Monte Castelo", "28", "JUN", "Sábado", "19h", "Banda Maré Cheia", "Pôr do sol, voz e violão, drinks autorais e os pés na areia. Uma noite inesquecível à beira do Urupá.", U + "photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=70", "Especial", 3),
]

# (src, alt, span, sort)
GALLERY = [
    (U + "photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=70", "Ambiente do restaurante", "row-span-2", 1),
    (U + "photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=70", "Mesa servida", "", 2),
    (U + "photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=700&q=70", "Comida na brasa", "", 3),
    (U + "photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=700&q=70", "Café e doces", "col-span-2", 4),
    (U + "photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=700&q=70", "Rio ao entardecer", "row-span-2", 5),
    (U + "photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=70", "Almoço em família", "", 6),
    (U + "photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=700&q=70", "Drinks coloridos", "", 7),
    (U + "photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=70", "Chopp gelado", "col-span-2", 8),
]


class Command(BaseCommand):
    help = "Popula o banco com os dados iniciais do cardápio (idempotente)."

    def handle(self, *args, **options):
        for cid, label, icon, sort in CATEGORIES:
            Category.objects.update_or_create(
                id=cid, defaults={"label": label, "icon": icon, "sort": sort}
            )
        self.stdout.write(f"Categorias: {Category.objects.count()}")

        SiteConfig.objects.update_or_create(id=1, defaults=SITE_CONFIG)
        self.stdout.write("Configuração do site: ok")

        for cat, name, desc, price, serves, image, badge, best, tags, sort in MENU:
            MenuItem.objects.get_or_create(
                name=name,
                defaults={
                    "category": Category.objects.get(id=cat),
                    "description": desc,
                    "price": Decimal(price),
                    "serves": serves,
                    "image": image,
                    "badge": badge,
                    "best_seller": best,
                    "tags": tags,
                    "sort": sort,
                },
            )
        self.stdout.write(f"Itens do cardápio: {MenuItem.objects.count()}")

        for title, day, month, weekday, time, artist, desc, image, tag, sort in EVENTS:
            Event.objects.get_or_create(
                title=title,
                defaults={
                    "day": day, "month": month, "weekday": weekday, "time": time,
                    "artist": artist, "description": desc, "image": image,
                    "tag": tag, "sort": sort,
                },
            )
        self.stdout.write(f"Eventos: {Event.objects.count()}")

        for src, alt, span, sort in GALLERY:
            GalleryImage.objects.get_or_create(
                src=src, defaults={"alt": alt, "span": span, "sort": sort}
            )
        self.stdout.write(f"Galeria: {GalleryImage.objects.count()}")

        self.stdout.write(self.style.SUCCESS("Seed concluído."))
