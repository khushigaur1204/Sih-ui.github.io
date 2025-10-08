import React from 'react';
import styled from 'styled-components';

const TrustedBrands = () => {
  const brands = [
    { id: 1, name: 'EcoCorp', logo: '🌱', description: 'Sustainable Solutions' },
    { id: 2, name: 'GreenTech', logo: '♻️', description: 'Clean Technology' },
    { id: 3, name: 'Solaris', logo: '☀️', description: 'Renewable Energy' },
    { id: 4, name: 'AquaPure', logo: '💧', description: 'Water Conservation' },
    { id: 5, name: 'TerraForm', logo: '🌍', description: 'Eco Innovation' },
  ];

  return (
    <BrandsSection>
      <Container>
        <SectionTitle>Trusted By Industry Leaders</SectionTitle>
        <SectionSubtitle>Partnering with organizations committed to sustainability</SectionSubtitle>
        
        <BrandsGrid>
          {brands.map((brand) => (
            <BrandCard key={brand.id}>
              <BrandLogo>{brand.logo}</BrandLogo>
              <BrandName>{brand.name}</BrandName>
              <BrandDescription>{brand.description}</BrandDescription>
            </BrandCard>
          ))}
        </BrandsGrid>
      </Container>
    </BrandsSection>
  );
};

const BrandsSection = styled.section`
  padding: 5rem 0;
  background-color: #ffffff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #0a0a0a;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #00ff87, #60efff);
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const BrandCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
`;

const BrandLogo = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BrandName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #0a0a0a;
`;

const BrandDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

export default TrustedBrands;
