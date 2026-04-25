param(
    [string]$Name
)

$dirty = git status --porcelain
if ($dirty) {
    Write-Error "Working tree is not clean. Commit or stash changes before creating a production snapshot."
    exit 1
}

if (-not $Name) {
    $Name = "production-safe-" + (Get-Date -Format "yyyy-MM-dd-HHmmss")
}

git tag -a $Name -m "Production-safe snapshot created on $(Get-Date -Format o)"

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Host "Created snapshot tag: $Name"
Write-Host "Inspect it with: git show $Name"
Write-Host "Restore from it with: npm run git:restore -- $Name"
