param(
    [Parameter(Mandatory = $true)]
    [string]$Target
)

$branchName = "restore/" + $Target.Replace("/", "-").Replace(":", "-")

git rev-parse --verify $Target *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Unknown commit, tag, or branch: $Target"
    exit 1
}

git switch -c $branchName $Target

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Host "Switched to recovery branch: $branchName"
Write-Host "You are now on the code from: $Target"
Write-Host "If this is the version you want to ship, test it and then merge it or deploy from this branch."
