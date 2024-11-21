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
    normalizationContext: ['groups' => ['assurance:read']],
    denormalizationContext: ['groups' => ['assurance:write']]
)]
class Assurance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['assurance:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['assurance:read', 'assurance:write'])]
    private ?string $libelle = null;

    #[ORM\Column(length: 255)]
    #[Groups(['assurance:read', 'assurance:write'])]
    private ?string $name = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['assurance:read', 'assurance:write'])]
    private ?\DateTimeInterface $dateDebut = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['assurance:read', 'assurance:write'])]
    private ?\DateTimeInterface $dateFin = null;

    #[ORM\Column]
    #[Groups(['assurance:read', 'assurance:write'])]
    private ?int $prix = null;

    #[ORM\ManyToOne(targetEntity: Voiture::class, inversedBy: 'assurances')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['assurance:read', 'assurance:write'])]
    private ?Voiture $voiture = null;

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
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

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): self
    {
        $this->prix = $prix;
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