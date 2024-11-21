<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['location:read']],
    denormalizationContext: ['groups' => ['location:write']]
)]
class Location
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['location:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['location:read', 'location:write'])]
    private ?\DateTimeInterface $dateDebut = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['location:read', 'location:write'])]
    private ?\DateTimeInterface $dateFin = null;

    #[ORM\Column]
    #[Groups(['location:read', 'location:write'])]
    private ?bool $retour = null;

    #[ORM\Column]
    #[Groups(['location:read', 'location:write'])]
    private ?int $prixJours = null;

    #[ORM\ManyToOne(targetEntity: Client::class, inversedBy: 'locations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['location:read', 'location:write'])]
    private ?Client $client = null;

    #[ORM\ManyToOne(targetEntity: Voiture::class, inversedBy: 'locations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['location:read', 'location:write'])]
    private ?Voiture $voiture = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;
        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTimeInterface $dateFin): self
    {
        $this->dateFin = $dateFin;
        return $this;
    }

    public function isRetour(): ?bool
    {
        return $this->retour;
    }

    public function setRetour(bool $retour): self
    {
        $this->retour = $retour;
        return $this;
    }

    public function getPrixJours(): ?int
    {
        return $this->prixJours;
    }

    public function setPrixJours(int $prixJours): self
    {
        $this->prixJours = $prixJours;
        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;
        return $this;
    }

    public function getVoiture(): ?Voiture
    {
        return $this->voiture;
    }

    public function setVoiture(?Voiture $voiture): self
    {
        $this->voiture = $voiture;
        return $this;
    }
}