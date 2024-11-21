<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
    normalizationContext: ['groups' => ['marque:read']],
    denormalizationContext: ['groups' => ['marque:write']]
)]
class Marque
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['marque:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['marque:read', 'marque:write'])]
    private ?string $libelle = null;

    #[ORM\OneToMany(mappedBy: 'marque', targetEntity: Voiture::class)]
    #[Groups(['marque:read'])]
    private Collection $voitures;

    public function __construct()
    {
        $this->voitures = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Voiture>
     */
    public function getVoitures(): Collection
    {
        return $this->voitures;
    }

    public function addVoiture(Voiture $voiture): self
    {
        if (!$this->voitures->contains($voiture)) {
            $this->voitures->add($voiture);
            $voiture->setMarque($this);
        }
        return $this;
    }

    public function removeVoiture(Voiture $voiture): self
    {
        if ($this->voitures->removeElement($voiture)) {
            if ($voiture->getMarque() === $this) {
                $voiture->setMarque(null);
            }
        }
        return $this;
    }
}