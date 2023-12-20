<h1 align="center">Master - Docker</h1>

# Partie 1 : Fondamentaux des conteneurs et Docker

## 1. Concepts conteneur

La conteneurisation est une manière de regrouper une application et toutes ses dépendances au sein de ce qu'on appelle "un conteneur". Les conteneurs permettent d'utiliser moins de ressources sur une infrastructure qu'une machine virtuel, puisqu'ils sont plus légers et bien plus efficaces.

Voici les 4 principes des conteneurs :

### Isolation

Les conteneurs sont isolés les uns des autres au niveau du système d'exploitation, ce qui signifie qu'ils ne peuvent pas interagir entre eux. Cela permet d'éviter les conflits entre applications et d'améliorer la sécurité et la fiabilité.

### Portabilité

Les conteneurs peuvent être exécutés sur n'importe quelle infrastructure compatible avec la plateforme de conteneurisation utilisée. Cela permet aux développeurs de créer des applications qui peuvent être déployées sur une variété de systèmes, y compris les clouds publics, les clouds privés et les infrastructures locales.

### Efficacité

Les conteneurs sont plus efficaces que les machines virtuelles. Ils utilisent moins de ressources, ce qui permet de réduire les coûts d'infrastructure. Une machine virtuelle a besoin d'un système d'exploitation, alors qu'un conteneur n'a besoin que du code, des bibliothèques et des dépendances nécessaires à l'exécution de l'application. Cela signifie qu'un conteneur utilise moins de mémoire, de CPU et d'espace disque qu'une machine virtuelle.

### Scalabilité

Les conteneurs sont faciles à mettre à l'échelle. Les applications conteneurisées peuvent être facilement déployées et retirées en masse. Cela permet aux entreprises d'adapter leur infrastructure à la demande.

Les différences entre Machines Virtuelles et Conteneurs :

<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/containers.png" />
</p>

Les machines virtuelles sont des environnements d'exécution complexe qui incluent un système d'exploitation, des applications, etc. Elles sont plus lourdes que les conteneurs et nécessitent plus de ressources.

Les conteneurs eux sont des unités d'exécution plus légères. Ils sont plus efficaces que les machines virtuelles et utilisent moins de ressources puisqu'ils n'embarquent pas la couche concernant un OS.

## 3. Commandes de base

Parmi les principales commandes on peut retrouver : 

```bash
# Gestion des images

## Pour télécharger / publier une image Docker sur un registre Docker 
$ docker pull / push <nom_image>
## Pour construire une image à partir d'un Dockerfile
$ docker build -t <nom_image> <chemin_du_Dockerfile>

# Gestion des conteneurs

## Pour lancer un conteneur à partir d'une image
$ docker run <options> <nom_image>
## Pour lister les conteneurs en cours d'exécution
$ docker ps
## Pour arrêter un conteneur en cours d'exécution
$ docker stop <id_ou_nom_conteneur>
## Pour redémarrer un conteneur arrêté
$ docker start <id_ou_nom_conteneur>
## Pour supprimer un conteneur
$ docker rm <id_ou_nom_conteneur>

# Gestion des réseaux

## Pour afficher la liste des volumes Docker
$ docker network ls
## Pour créer un nouveau volume Docker
$ docker network create <nom_reseau>

# Gestion des volumes

## Pour afficher la liste des volumes Docker
$ docker volume ls
## Pour créer un nouveau volume Docker
$ docker volume create <nom_volume>

# Autres commandes utiles

## Pour afficher les journaux d'un conteneur en cours d'exécution
$ docker logs <id_ou_nom_conteneur>
## Pour lister les images Docker disponibles
$ docker images
```
Screen prouvant que mon application fonctionne :
<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/nginx.png" />
</p>

Les commandes utilisées :
```bash
# Pour récupérer l'image de nginx
$ docker pull nginx

# Pour voir si l'image s'est ajouté
$ docker images

# Pour lancer le serveur
$ docker run -d -p 8080:80 nginx
```

## 4. Volumes Docker

Nous devions installer mariadb puis créer des données au sein de la base.
```bash
# Pour récupérer l'image de mariadb
$ docker pull mariadb 

# Pour voir si l'image s'est ajouté
$ docker images

# Pour lancer le serveur de base
$ docker run --name mariadb -e MYSQL_ROOT_PASSWORD=mypass -p 3306:3306 -d docker.io/library/mariadb
```

Nous nous sommes rendu compte que les données n'étaient pas persistante à la suppression du container. Pour régler ce problème, nous sommes passés par la création d'un volume.
```bash
# Pour créer un volume de la base
$ docker volume create mariadb_volume

# Pour lancer le serveur de base avec la persistance des données
$ docker run --name mariadb -v mariadb_volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mypass -p 3306:3306 -d docker.io/library/mariadb
```

Screen prouvant que la persistance des données :
<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/mariadb.png" />
</p>
<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/persistance.png" />
</p>

Les volumes Dockers sont des espaces de stockage qui sont rendus disponibles pour les conteneurs. Cela permet de stocker des données persistantes qui ne seront pas perdues lorsque le conteneur est arrêté ou supprimé. L'utilité des volumes est donc de permettre le stockage de données persistantes, comme des bases de données, des fichiers de configuration ou des logs.

Les applications stateless ne stockent pas d'informations entre les requêtes, favorisant la simplicité et la scalabilité. A l'inverse, les applications stateful conservent des informations sur l'état, ce qui peut compliquer la mise à l'échelle. En Docker, la plupart des conteneurs sont conçus comme stateless, ils externalisent l'état via des bases de données externes. Pour des applications stateful dans Docker, la gestion de l'état nécessite souvent l'utilisation de volumes.

## 5. Reseaux Docker

Docker propose plusieurs modes de réseau pour faciliter la communication entre conteneurs et avec le réseau hôte. Parmi les modes de réseau courants, il y a :

- Bridge Network : Mode par défaut, permet la communication entre conteneurs sur le même hôte avec des adresses IP internes.

- Host Network : Donne au conteneur un accès direct au réseau de l'hôte, améliorant les performances mais exposant directement les ports du conteneur.

- Overlay Network : Facilite la communication entre conteneurs sur différents hôtes, créant un réseau virtuel superposé pour les déploiements distribués.

- Macvlan Network : Donne au conteneur des adresses MAC et IP réelles sur le réseau sous-jacent, utile pour intégrer des conteneurs dans un réseau existant.

- None Network : Désactive l'accès au réseau pour le conteneur, approprié lorsque la communication réseau n'est pas nécessaire.

Le choix du mode de réseau dépend des exigences spécifiques de l'application, de la facilité de gestion, de la sécurité et de la nature du déploiement (local, externe, etc.). En général, Bridge Network et Overlay Network sont parmi les plus couramment utilisés dans une variété de scénarios, Bridge Network puisque c'est celui par défaut et Overlay Network puisqu'il permet de farie de gros déploiement. 

Listes de commandes :
```bash
# Pour lister les réseaux docker
$ docker network ls

# Pour voir quel réseau appartient un conteneur
$ docker inspect --format '{{.HostConfig.NetworkMode}}' mariadb
```

# Partie 2 : Approfondissement des Connaissances

## 1. Écrire son Image Docker

Mon application fonctionnelle :

<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/app.png" />
</p>

Voici l'url du dockerfile : [Dockerfile](https://github.com/thomaspsl/MASTER_Docker/blob/master/projets/devops-training-nodejs/Dockerfile)

## 2. Optimisation de l’image Docker

Lignes de développement :
```bash
# Créer une image sous registry avec l'utilisation de Dockerfile
$ docker build -t thomaspsl/node_vue:1.0.0 .

# Créer le conteneur à l'aide du docker-compose
$ docker-compose --project-name uglydockerfile up -d
```

Application avec l'image docker allégée :

<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/image.png" />
</p>

<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/conteneur.png" />
</p>

## 3. Stack Multi-Service

...

## 4. La Docker Registry

Dans une entreprise interne, un registry est une solution pour avoir une base organisée pour stocker les ressources. 

Cela peut faciliter la collaboration entre les équipes, améliore la transparence et garantit la conformité aux normes internes. Il contribue également à renforcer la sécurité des informations gérant les contrôles d'accès et en facilitant son administration.

Image de mon Docker Hub : [thomaspsl/node:1.0.0](https://hub.docker.com/repository/docker/thomaspsl/node/general)

<p align="center">
    <img
    width="550"
    style="padding: 1rem"
    src="images/node.png" />
</p>

# Partie 3 : Orchestration de conteneurs

##