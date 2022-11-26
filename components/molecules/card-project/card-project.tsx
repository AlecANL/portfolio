import Image from 'next/image'
import { Heading } from '@atoms/heading'
import { Paragraph } from '@atoms/paragraph'
import { CustomLink } from '@atoms/link'

import { CardProjectButtons, CardProjectDescription, CardProjectStyled, CardTagContent, PatternImage } from './card-project.styled'

import { useLanguage } from '@hooks/useLanguage'

import en from '@i18n/common/common-en.json'
import es from '@i18n/common/common-es.json'

import { ICardProjectProps } from '@models/project.interface'
import { TechTag } from '@atoms/tech-tag'

import patternImage from '/public/assets/images/circle-pattern.png'

export function CardProject(props: ICardProjectProps) {
  const { cover, repository, demo, title, description, tagStack, id, pattern } = props?.project ?? {}
  const { isShowCount } = props ?? {}
  const { currentLanguage } = useLanguage(en, es)

  function getPositionProject(id: string) {
    return `${('0' + id).slice(-2)}.`
  }

  return (
    <>
      <CardProjectStyled>
        {pattern && <PatternImage src={patternImage.src} alt='pattern circles' />}
        <Image
          src={cover.url}
          alt={`${currentLanguage[title]} cover for project`}
          width={cover?.width ?? 254}
          height={cover?.height ?? 254}
        />
        <CardProjectDescription>
          <Heading type='h3'>
            {isShowCount && getPositionProject(id)} {currentLanguage[title]}
          </Heading>
          {description && <Paragraph>{currentLanguage[description]}</Paragraph>}
          <CardTagContent>
            {tagStack.map(tag => (
              <TechTag key={tag.id} name={tag.name} icon={tag.icon} id={tag.id} />
            ))}
          </CardTagContent>
          <CardProjectButtons>
            <CustomLink className='primary' url={repository}>
              {currentLanguage['link:code']}
            </CustomLink>
            <CustomLink className='secondary' url={demo}>
              {currentLanguage['link:live-demo']}
            </CustomLink>
          </CardProjectButtons>
        </CardProjectDescription>
      </CardProjectStyled>
    </>
  )
}
