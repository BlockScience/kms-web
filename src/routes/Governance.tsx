import { Button } from '@mantine/core'
import { CurationProposal } from '@/components/CurationProposal'
import { IconBrandGithub } from '@tabler/icons-react'
import { Layout } from '@/components/Layout'

export default function Governance() {
  return (
    <Layout.Simple
      title='Governance'
      rightSection={
        <Button
          variant='outline'
          component='a'
          href='https://github.com/blockScience/kms-lib'
          target='_blank'
          leftIcon={<IconBrandGithub />}
        >
          Proposals library on GitHub
        </Button>
      }
    >
      <CurationProposal
        title="Rename 'cats' to 'CATs'"
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        author='orion@block.science'
        operations={5}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title='Do another thing'
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={81}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title="Rename 'cats' to 'CATs'"
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={129}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title='Do another thing'
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={3}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title="Rename 'cats' to 'CATs'"
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={5}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title='Do another thing'
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={5}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title="Rename 'cats' to 'CATs'"
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={14}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title='Do another thing'
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={25}
        status='pending'
        resolvedBy={null}
      />
      <CurationProposal
        title="Rename 'cats' to 'CATs'"
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={31}
        status='approved'
        resolvedBy='steve@block.science'
      />
      <CurationProposal
        title='Do another thing'
        description='lorum ipsum dolor sit amet dolor sit amet dolor sit amet'
        author='orion@block.science'
        operations={32}
        status='rejected'
        resolvedBy='steve@block.science'
      />
    </Layout.Simple>
  )
}
