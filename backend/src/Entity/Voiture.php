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
    normalizationContext: ['groups' => ['voiture:read']],
    denormalizationContext: ['groups' => ['voiture:write']]
)]
class Voiture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['voiture:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Marque::class, inversedBy: 'voitures')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['voiture:read', 'voiture:write'])]
    private ?Marque $marque = null;

    #[ORM\OneToMany(mappedBy: 'voiture', targetEntity: Location::class)]
    #[Groups(['voiture:read'])]
    private Collection $locations;

    #[ORM\OneToMany(mappedBy: 'voiture', targetEntity: Assurance::class)]
    #[Groups(['voiture:read'])]
    private Collection $assurances;

    public function __construct()
    {
        $this->locations = new ArrayCollection();
        $this->assurances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMarque(): ?Marque
    {
        return $this->marque;
    }

    public function setMarque(?Marque $marque): self
    {
        $this->marque = $marque;
        return $this;
    }

    /**
     * @return Collection<int, Location>
     */
    public function getLocations(): Collection
    {
        return $this->locations;
    }

    public function addLocation(Location $location): self
    {
        if (!$this->locations->contains($location)) {
            $this->locations->add($location);
            $location->setVoiture($this);
        }
        return $this;
    }

    public function removeLocation(Location $location): self
    {
        if ($this->locations->removeElement($location)) {
            if ($location->getVoiture() === $this) {
                $location->setVoiture(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, Assurance>
     */
    public function getAssurances(): Collection
    {
        return $this->assurances;
    }

    public function addAssurance(Assurance $assurance): self
    {
        if (!$this->assurances->contains($assurance)) {
            $this->assurances->add($assurance);
            $assurance->setVoiture($this);
        }
        return $this;
    }

    public function removeAssurance(Assurance $assurance): self
    {
        if ($this->assurances->removeElement($assurance)) {
            if ($assurance->getVoiture() === $this) {
                $assurance->setVoiture(null);
            }
        }
        return $this;
    }
}